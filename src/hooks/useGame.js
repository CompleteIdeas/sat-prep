import { useState, useRef, useCallback, useEffect } from 'react';
import { getBankQuestion, getMultiplier, CORRECT_PER_LEVEL } from '../lib/constants.js';
import { api } from '../lib/api.js';

const QUEUE_TARGET = 5;

export function useGame(user) {
  const [state, setState] = useState({
    streak: 0,
    bestStreak: user?.best_streak || 0,
    totalCorrect: 0,
    totalAnswered: 0,
    difficulty: 1,
    diffProgress: 0,
    diffFloor: 1,
    points: 0,
    mode: 'both',
    questionNum: 0,
    answered: false,
    currentQ: null,
    loading: true,
    sessionHistory: [],
    allTime: {
      answered: user?.total_answered || 0,
      correct: user?.total_correct || 0,
      points: user?.total_points || 0,
      bestStreak: user?.best_streak || 0,
    },
  });

  const queueRef = useRef([]);
  const fillingRef = useRef(false);
  const recentBankIdsRef = useRef([]);
  const [queueCount, setQueueCount] = useState(0);

  // Reset game state when user changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      streak: 0,
      bestStreak: user?.best_streak || 0,
      totalCorrect: 0,
      totalAnswered: 0,
      difficulty: 1,
      diffProgress: 0,
      diffFloor: 1,
      points: 0,
      questionNum: 0,
      answered: false,
      currentQ: null,
      loading: true,
      sessionHistory: [],
      allTime: {
        answered: user?.total_answered || 0,
        correct: user?.total_correct || 0,
        points: user?.total_points || 0,
        bestStreak: user?.best_streak || 0,
      },
    }));
    queueRef.current = [];
    recentBankIdsRef.current = [];
    setQueueCount(0);
  }, [user?.id]);

  const fetchOneQuestion = useCallback(async (mode, difficulty) => {
    // 50% chance: serve from built-in bank
    if (Math.random() < 0.5) {
      const result = getBankQuestion(mode, difficulty, recentBankIdsRef.current);
      if (result) {
        recentBankIdsRef.current = [...recentBankIdsRef.current.slice(-10), result.idx];
        return result.question;
      }
    }
    // AI-generated
    return api.generateQuestion(mode, difficulty);
  }, []);

  const fillQueue = useCallback(async (mode, difficulty) => {
    if (fillingRef.current) return;
    fillingRef.current = true;
    while (queueRef.current.length < QUEUE_TARGET) {
      try {
        const q = await fetchOneQuestion(mode, difficulty);
        queueRef.current.push(q);
        setQueueCount(queueRef.current.length);
      } catch (e) {
        console.warn('Queue fill error:', e.message);
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    fillingRef.current = false;
  }, [fetchOneQuestion]);

  const generateQuestion = useCallback(async () => {
    setState(prev => {
      const newNum = prev.questionNum + 1;
      const newState = { ...prev, answered: false, questionNum: newNum, loading: true, currentQ: null };

      // Fast path: queue has a question
      if (queueRef.current.length > 0) {
        const q = queueRef.current.shift();
        setQueueCount(queueRef.current.length);
        fillQueue(prev.mode, prev.difficulty);
        return { ...newState, currentQ: q, loading: false };
      }
      return newState;
    });

    // If queue was empty, fetch live
    setState(prev => {
      if (prev.currentQ) return prev; // already set from queue
      return prev;
    });

    // Check if we need to fetch
    if (queueRef.current.length === 0) {
      try {
        const q = await fetchOneQuestion(
          // Read current state values
          state.mode,
          state.difficulty
        );
        setState(prev => ({ ...prev, currentQ: q, loading: false }));
      } catch (e) {
        console.error('Question generation error:', e);
        // Retry after delay
        setTimeout(() => generateQuestion(), 3000);
        return;
      }
    }

    fillQueue(state.mode, state.difficulty);
  }, [state.mode, state.difficulty, fetchOneQuestion, fillQueue]);

  const loadNextQuestion = useCallback(async (mode, difficulty) => {
    setState(prev => ({ ...prev, answered: false, questionNum: prev.questionNum + 1, loading: true, currentQ: null }));

    if (queueRef.current.length > 0) {
      const q = queueRef.current.shift();
      setQueueCount(queueRef.current.length);
      setState(prev => ({ ...prev, currentQ: q, loading: false }));
      fillQueue(mode, difficulty);
      return;
    }

    try {
      const q = await fetchOneQuestion(mode, difficulty);
      setState(prev => ({ ...prev, currentQ: q, loading: false }));
    } catch (e) {
      console.error('Question generation error:', e);
      setTimeout(() => loadNextQuestion(mode, difficulty), 3000);
      return;
    }
    fillQueue(mode, difficulty);
  }, [fetchOneQuestion, fillQueue]);

  const answer = useCallback((chosen) => {
    setState(prev => {
      if (prev.answered) return prev;
      const q = prev.currentQ;
      const isRight = chosen === q.correct;

      let newStreak = isRight ? prev.streak + 1 : 0;
      let newBest = Math.max(prev.bestStreak, newStreak);
      let newDiff = prev.difficulty;
      let newProgress = prev.diffProgress;
      let earned = 0;

      if (isRight) {
        const mult = getMultiplier(prev.difficulty);
        earned = Math.round(10 * prev.difficulty * mult);
        newProgress++;
        if (newProgress >= CORRECT_PER_LEVEL && newDiff < 10) {
          newProgress = 0;
          newDiff++;
          // Flush queue for new difficulty
          queueRef.current = [];
          setQueueCount(0);
          fillQueue(prev.mode, newDiff);
        }
      } else {
        newDiff = prev.diffFloor;
        newProgress = 0;
        // Flush queue
        queueRef.current = [];
        setQueueCount(0);
        fillQueue(prev.mode, newDiff);
      }

      const histEntry = {
        question: q.question.slice(0, 90) + (q.question.length > 90 ? '…' : ''),
        correct: isRight,
        correctAnswer: q.choices.find(c => c.startsWith(q.correct + ')')) || q.correct,
        type: q.type,
        diff: prev.difficulty,
        pts: earned,
      };

      // Save stats to server (fire and forget)
      if (user) {
        api.updateStats(isRight, earned, newBest).catch(() => {});
        // Submit streak to leaderboard when streak breaks
        if (!isRight && prev.streak >= 2) {
          api.submitStreak(prev.streak, prev.mode).catch(() => {});
        }
      }

      return {
        ...prev,
        answered: true,
        streak: newStreak,
        bestStreak: newBest,
        totalCorrect: prev.totalCorrect + (isRight ? 1 : 0),
        totalAnswered: prev.totalAnswered + 1,
        difficulty: newDiff,
        diffProgress: newProgress,
        points: prev.points + earned,
        sessionHistory: [...prev.sessionHistory, histEntry],
        allTime: {
          answered: prev.allTime.answered + 1,
          correct: prev.allTime.correct + (isRight ? 1 : 0),
          points: prev.allTime.points + earned,
          bestStreak: Math.max(prev.allTime.bestStreak, newBest),
        },
        _lastAnswer: { isRight, earned, chosen },
      };
    });
  }, [user, fillQueue]);

  const setMode = useCallback((mode) => {
    setState(prev => ({ ...prev, mode }));
    queueRef.current = [];
    setQueueCount(0);
  }, []);

  const adjustFloor = useCallback((delta) => {
    setState(prev => {
      const newFloor = Math.max(1, Math.min(10, prev.diffFloor + delta));
      let newDiff = prev.difficulty;
      let newProgress = prev.diffProgress;
      if (newDiff < newFloor) {
        newDiff = newFloor;
        newProgress = 0;
        queueRef.current = [];
        setQueueCount(0);
        fillQueue(prev.mode, newDiff);
      }
      return { ...prev, diffFloor: newFloor, difficulty: newDiff, diffProgress: newProgress };
    });
  }, [fillQueue]);

  return {
    state,
    queueCount,
    loadNextQuestion,
    answer,
    setMode,
    adjustFloor,
    fillQueue,
  };
}
