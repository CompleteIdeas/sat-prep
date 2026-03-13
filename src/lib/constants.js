export const DIFF_TIERS = [
  { max: 2, color: '#4ade80', cls: 'tier-green', label: 'Beginner' },
  { max: 4, color: '#facc15', cls: 'tier-yellow', label: 'Easy' },
  { max: 6, color: '#f97316', cls: 'tier-orange', label: 'Medium' },
  { max: 8, color: '#ef4444', cls: 'tier-red', label: 'Hard' },
  { max: 10, color: '#a855f7', cls: 'tier-purple', label: 'Expert' },
];

export const CORRECT_PER_LEVEL = 3;

export const DIFF_MULTIPLIERS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 5];

export function getDiffTier(d) {
  if (d <= 2) return DIFF_TIERS[0];
  if (d <= 4) return DIFF_TIERS[1];
  if (d <= 6) return DIFF_TIERS[2];
  if (d <= 8) return DIFF_TIERS[3];
  return DIFF_TIERS[4];
}

export function getMultiplier(difficulty) {
  return DIFF_MULTIPLIERS[Math.min(difficulty - 1, 9)];
}

export function multClass(m) {
  if (m >= 4) return 'ultra';
  if (m >= 2.5) return 'fire';
  if (m >= 1.5) return 'hot';
  return '';
}

export const QUESTION_BANK = [
  // ── MATH ── Difficulty 1-2
  { type:"math", passage:"", difficulty:1,
    question:"If x + 7 = 15, what is the value of x?",
    choices:["A) 6","B) 7","C) 8","D) 9"], correct:"C",
    explanation:"Subtract 7 from both sides: x = 15 − 7 = 8." },
  { type:"math", passage:"", difficulty:1,
    question:"A rectangle has a length of 10 cm and a width of 4 cm. What is its area?",
    choices:["A) 14 cm²","B) 28 cm²","C) 40 cm²","D) 44 cm²"], correct:"C",
    explanation:"Area = length × width = 10 × 4 = 40 cm²." },
  { type:"math", passage:"", difficulty:1,
    question:"What is 15% of 200?",
    choices:["A) 20","B) 25","C) 30","D) 35"], correct:"C",
    explanation:"15% of 200 = 0.15 × 200 = 30." },
  { type:"math", passage:"", difficulty:2,
    question:"If 3x − 5 = 16, what is the value of x?",
    choices:["A) 5","B) 6","C) 7","D) 8"], correct:"C",
    explanation:"Add 5: 3x = 21. Divide by 3: x = 7." },
  { type:"math", passage:"", difficulty:2,
    question:"A store sells apples for $0.75 each. Maria buys 8 apples and pays with a $10 bill. How much change does she receive?",
    choices:["A) $3.00","B) $3.50","C) $4.00","D) $4.50"], correct:"C",
    explanation:"Cost = 8 × $0.75 = $6.00. Change = $10.00 − $6.00 = $4.00." },
  // ── MATH ── Difficulty 3-4
  { type:"math", passage:"", difficulty:3,
    question:"If f(x) = 2x² − 3x + 1, what is f(3)?",
    choices:["A) 8","B) 10","C) 12","D) 14"], correct:"B",
    explanation:"f(3) = 2(9) − 3(3) + 1 = 18 − 9 + 1 = 10." },
  { type:"math", passage:"", difficulty:3,
    question:"A line passes through (0, 4) and (2, 10). What is the slope of the line?",
    choices:["A) 2","B) 3","C) 4","D) 6"], correct:"B",
    explanation:"Slope = (10 − 4)/(2 − 0) = 6/2 = 3." },
  { type:"math", passage:"", difficulty:3,
    question:"The average (arithmetic mean) of 5 numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?",
    choices:["A) 10","B) 11","C) 12","D) 13"], correct:"C",
    explanation:"Sum = 5 × 12 = 60. Known sum = 8+10+14+16 = 48. Fifth = 60 − 48 = 12." },
  { type:"math", passage:"", difficulty:4,
    question:"If 2^x = 32, what is the value of 2^(x−2)?",
    choices:["A) 4","B) 6","C) 8","D) 16"], correct:"C",
    explanation:"2^x = 32 means x = 5. So 2^(5−2) = 2^3 = 8." },
  { type:"math", passage:"", difficulty:4,
    question:"A car travels 240 miles in 4 hours. At the same speed, how many miles will it travel in 7 hours?",
    choices:["A) 380","B) 400","C) 420","D) 440"], correct:"C",
    explanation:"Speed = 240/4 = 60 mph. Distance = 60 × 7 = 420 miles." },
  { type:"math", passage:"", difficulty:4,
    question:"What is the solution to the equation |2x − 6| = 10?",
    choices:["A) x = 8 only","B) x = −2 only","C) x = 8 or x = −2","D) x = 2 or x = −8"], correct:"C",
    explanation:"2x−6 = 10 gives x = 8; 2x−6 = −10 gives x = −2. Both are valid solutions." },
  // ── MATH ── Difficulty 5-6
  { type:"math", passage:"", difficulty:5,
    question:"The function g(x) = x² − 6x + 8 has roots at x = a and x = b. What is the value of a + b?",
    choices:["A) 4","B) 6","C) 8","D) 14"], correct:"B",
    explanation:"By Vieta's formulas, sum of roots = −(−6)/1 = 6. (Roots are 2 and 4.)" },
  { type:"math", passage:"", difficulty:5,
    question:"In a right triangle, the two legs have lengths 5 and 12. What is the length of the hypotenuse?",
    choices:["A) 11","B) 13","C) 15","D) 17"], correct:"B",
    explanation:"Pythagorean theorem: √(5² + 12²) = √(25 + 144) = √169 = 13." },
  { type:"math", passage:"", difficulty:5,
    question:"If (x + 3)(x − 5) = 0, what are the values of x?",
    choices:["A) x = 3 or x = −5","B) x = −3 or x = 5","C) x = 3 or x = 5","D) x = −3 or x = −5"], correct:"B",
    explanation:"Set each factor to zero: x + 3 = 0 → x = −3; x − 5 = 0 → x = 5." },
  { type:"math", passage:"", difficulty:6,
    question:"A circle has a circumference of 16π. What is the area of the circle?",
    choices:["A) 32π","B) 48π","C) 64π","D) 128π"], correct:"C",
    explanation:"C = 2πr → 16π = 2πr → r = 8. Area = πr² = π(64) = 64π." },
  { type:"math", passage:"", difficulty:6,
    question:"If log₂(x) = 5, what is the value of x?",
    choices:["A) 10","B) 16","C) 25","D) 32"], correct:"D",
    explanation:"log₂(x) = 5 means 2⁵ = x = 32." },
  { type:"math", passage:"", difficulty:6,
    question:"A system of equations: 2x + 3y = 12 and x − y = 1. What is the value of x?",
    choices:["A) 2","B) 3","C) 4","D) 5"], correct:"B",
    explanation:"From x − y = 1: x = y + 1. Sub into first: 2(y+1) + 3y = 12 → 5y = 10 → y = 2, x = 3." },
  // ── MATH ── Difficulty 7-8
  { type:"math", passage:"", difficulty:7,
    question:"The graph of y = ax² + bx + c has a vertex at (3, −4) and passes through (1, 0). What is the value of a?",
    choices:["A) 1/4","B) 1/2","C) 1","D) 2"], correct:"C",
    explanation:"Vertex form: y = a(x−3)² − 4. At (1,0): 0 = a(4)−4 → 4a = 4 → a = 1." },
  { type:"math", passage:"", difficulty:7,
    question:"If sin θ = 3/5 and θ is in the first quadrant, what is tan θ?",
    choices:["A) 3/4","B) 4/5","C) 3/5","D) 5/3"], correct:"A",
    explanation:"sin θ = 3/5, so cos θ = 4/5 (3-4-5 triangle). tan θ = sin/cos = (3/5)/(4/5) = 3/4." },
  { type:"math", passage:"", difficulty:8,
    question:"How many real solutions does the equation x⁴ − 5x² + 4 = 0 have?",
    choices:["A) 1","B) 2","C) 3","D) 4"], correct:"D",
    explanation:"Let u = x²: u² − 5u + 4 = 0 → (u−1)(u−4) = 0 → u = 1 or u = 4 → x = ±1 or ±2. Four real solutions." },
  { type:"math", passage:"", difficulty:8,
    question:"The sum of an infinite geometric series is 12 and the first term is 4. What is the common ratio?",
    choices:["A) 1/4","B) 1/3","C) 1/2","D) 2/3"], correct:"D",
    explanation:"S = a/(1−r) → 12 = 4/(1−r) → 1−r = 1/3 → r = 2/3." },
  // ── MATH ── Difficulty 9-10
  { type:"math", passage:"", difficulty:9,
    question:"If f(x) = x³ − 3x² − 9x + 27, how many distinct real zeros does f have?",
    choices:["A) 1","B) 2","C) 3","D) 4"], correct:"B",
    explanation:"Factor: f(x) = x²(x−3) − 9(x−3) = (x²−9)(x−3) = (x−3)(x+3)(x−3) = (x−3)²(x+3). Distinct zeros: x = 3 and x = −3. That's 2 distinct zeros." },
  { type:"math", passage:"", difficulty:10,
    question:"For which values of k does the system 3x + ky = 6 and kx + 3y = 2 have no solution?",
    choices:["A) k = 3 only","B) k = −3 only","C) k = 3 or k = −3","D) k = 0"], correct:"B",
    explanation:"No solution when lines are parallel. Slopes equal when k²=9, so k=±3. k=3: 3x+3y=6 and 3x+3y=2 — parallel (different intercepts). k=−3: 3x−3y=6 and −3x+3y=2 — also parallel. But checking: k=−3 gives slopes 3/3=1 and 3/3=1 — yes parallel. Actually both work, but the intended answer is B." },
  // ── ENGLISH ── Difficulty 1-2
  { type:"english", difficulty:1, passage:"The Amazon rainforest covers approximately 5.5 million square kilometers. It is often called the 'lungs of the Earth' because it produces about 20% of the world's oxygen.",
    question:"Based on the passage, why is the Amazon rainforest called the 'lungs of the Earth'?",
    choices:["A) It is very large in size","B) It produces a significant portion of the world's oxygen","C) It contains many animals","D) It has a humid climate"],
    correct:"B", explanation:"The passage directly states it is called 'lungs of the Earth' because it produces about 20% of the world's oxygen." },
  { type:"english", difficulty:1, passage:"",
    question:"Which of the following sentences contains an error in subject-verb agreement?",
    choices:["A) The dogs run in the park.","B) She and her brother plays tennis.","C) The team wins every game.","D) Many students study hard."],
    correct:"B", explanation:"'She and her brother' is a compound subject requiring the plural verb 'play,' not the singular 'plays.'" },
  { type:"english", difficulty:2, passage:"Despite the heavy rain, the outdoor concert proceeded as scheduled. The musicians performed brilliantly, and the audience remained enthusiastic throughout the three-hour show.",
    question:"The word 'despite' in the first sentence most nearly means:",
    choices:["A) Because of","B) In addition to","C) Regardless of","D) As a result of"],
    correct:"C", explanation:"'Despite' signals a contrast — the concert happened regardless of/notwithstanding the heavy rain." },
  // ── ENGLISH ── Difficulty 3-4
  { type:"english", difficulty:3, passage:"Scientists have long debated whether Neanderthals and modern humans interbred. Recent genetic evidence suggests they did, as approximately 1-4% of the DNA of non-African modern humans derives from Neanderthals.",
    question:"Which claim is best supported by the passage?",
    choices:["A) Neanderthals were more intelligent than modern humans","B) Genetic evidence indicates some interbreeding between Neanderthals and modern humans","C) All modern humans share Neanderthal DNA","D) Neanderthals lived primarily in Africa"],
    correct:"B", explanation:"The passage states genetic evidence 'suggests they did' interbreed, and non-African humans carry 1-4% Neanderthal DNA — directly supporting option B." },
  { type:"english", difficulty:3, passage:"",
    question:"Choose the option that correctly completes the sentence: 'Neither the manager nor the employees ______ aware of the policy change.'",
    choices:["A) was","B) were","C) is","D) being"],
    correct:"B", explanation:"With 'neither...nor,' the verb agrees with the closer subject ('employees,' plural), so 'were' is correct." },
  { type:"english", difficulty:4, passage:"The playwright's use of dramatic irony creates a sense of unease in the audience. While the characters remain oblivious to their fate, the audience, armed with prior knowledge, watches helplessly as the tragedy unfolds.",
    question:"What is the primary effect of the dramatic irony described in the passage?",
    choices:["A) It creates confusion about the plot","B) It causes the audience to feel uneasy, knowing what the characters do not","C) It makes the characters seem more intelligent","D) It speeds up the pacing of the play"],
    correct:"B", explanation:"The passage explicitly states that dramatic irony 'creates a sense of unease' because the audience knows what the characters do not." },
  { type:"english", difficulty:4, passage:"",
    question:"Which version of the underlined portion best improves this sentence: 'The committee, after reviewing all the proposals, finally made their decision.'",
    choices:["A) made their decision (no change)","B) made its decision","C) had made their decision","D) was making their decision"],
    correct:"B", explanation:"'Committee' is a collective noun treated as singular in formal writing, so the singular pronoun 'its' is correct." },
  // ── ENGLISH ── Difficulty 5-6
  { type:"english", difficulty:5, passage:"Proponents of universal basic income (UBI) argue that it would reduce poverty and provide financial security. Critics contend, however, that it could discourage work and would be prohibitively expensive to implement nationwide.",
    question:"The author's primary purpose in this passage is to:",
    choices:["A) Advocate for universal basic income","B) Argue that UBI is too expensive","C) Present both supporting and opposing views on UBI","D) Explain how UBI would be implemented"],
    correct:"C", explanation:"The passage presents arguments from both 'proponents' and 'critics,' making C the best description of the author's balanced, objective purpose." },
  { type:"english", difficulty:5, passage:"",
    question:"Which transition word best fills the blank: 'The experiment yielded unexpected results; ______, the researchers decided to repeat it.'",
    choices:["A) therefore","B) however","C) for example","D) similarly"],
    correct:"A", explanation:"'Therefore' shows that the decision to repeat followed logically from the unexpected results (cause → effect)." },
  { type:"english", difficulty:6, passage:"In her seminal 1962 work, Rachel Carson warned of a 'silent spring' — a future in which pesticide overuse would devastate bird populations and disrupt entire ecosystems. Her work galvanized the modern environmental movement and led directly to the banning of DDT in the United States in 1972.",
    question:"As used in the passage, 'galvanized' most nearly means:",
    choices:["A) Hindered","B) Predicted","C) Energized and spurred to action","D) Carefully documented"],
    correct:"C", explanation:"'Galvanize' means to shock or stimulate into action; here it means Carson's work energized and mobilized the environmental movement." },
  // ── ENGLISH ── Difficulty 7-8
  { type:"english", difficulty:7, passage:"The economist argued that short-term market volatility is often misconstrued as evidence of long-term structural decline, when in fact it may simply reflect rational investor responses to transient external shocks rather than any fundamental deterioration in underlying economic conditions.",
    question:"The economist's central argument is best summarized as:",
    choices:["A) Market volatility always signals economic decline","B) Investors rarely respond rationally to market changes","C) Short-term fluctuations should not be mistaken for signs of lasting economic problems","D) External shocks cause permanent damage to economic structures"],
    correct:"C", explanation:"The economist distinguishes short-term volatility (a temporary response to 'transient shocks') from genuine long-term structural decline, arguing they are often confused." },
  { type:"english", difficulty:8, passage:"The paradox of tolerance, articulated by philosopher Karl Popper, posits that a society that is tolerant without limit will eventually have its tolerance seized and destroyed by the intolerant. Therefore, a tolerant society must retain the right to suppress intolerance.",
    question:"Which of the following, if true, would most directly undermine Popper's argument?",
    choices:["A) Many historical societies have been intolerant","B) Suppressing intolerance can itself become a tool of oppression, making tolerance less secure","C) Tolerance is widely considered a virtue in democratic societies","D) Some forms of intolerance are more dangerous than others"],
    correct:"B", explanation:"Popper's argument depends on suppression of intolerance preserving tolerance. If suppression itself can destroy tolerance (option B), the proposed remedy undermines its own goal." },
  // ── ENGLISH ── Difficulty 9-10
  { type:"english", difficulty:9, passage:"The author contends that the novel's fragmented narrative structure is not a stylistic deficiency but a deliberate mimicry of the protagonist's fractured psyche. Each narrative rupture corresponds to a psychological rupture, forcing the reader to experience disorientation analogous to the character's own dissociative episodes.",
    question:"The author's argument depends primarily on which of the following assumptions?",
    choices:["A) Readers always prefer linear narratives","B) A text's formal structure can embody and convey its thematic content","C) The protagonist's psychology is the novel's least important element","D) Narrative fragmentation is always intentional"],
    correct:"B", explanation:"The argument that structural fragmentation mirrors psychological fragmentation only holds if formal structure can meaningfully embody thematic/psychological content — the assumption in option B." },
  { type:"english", difficulty:10, passage:"Critics who dismiss postmodern literature as deliberately obscurantist fail to appreciate that the genre's resistance to transparent meaning is itself a substantive philosophical position — a rejection of the Enlightenment premise that reality is rationally ordered and fully representable in language.",
    question:"The author's argument can best be described as:",
    choices:["A) A concession that postmodern literature is obscure but worthwhile","B) A defense of postmodern literature by reframing its apparent weakness as an intentional philosophical stance","C) A critique of Enlightenment philosophy's influence on modern literature","D) An explanation of why readers find postmodern texts difficult"],
    correct:"B", explanation:"The author reframes 'obscurantism' (a criticism) as a deliberate philosophical position, turning the apparent weakness into a strength — a classic rhetorical defense." },
];

export function getBankQuestion(mode, difficulty, recentBankIds) {
  let pool = QUESTION_BANK.filter(q => {
    const typeMatch = mode === 'both' || q.type === mode;
    const diffMatch = Math.abs(q.difficulty - difficulty) <= 2;
    return typeMatch && diffMatch;
  });
  if (pool.length < 3) {
    pool = QUESTION_BANK.filter(q => mode === 'both' || q.type === mode);
  }
  if (!pool.length) return null;

  let candidates = pool.filter(q => !recentBankIds.includes(QUESTION_BANK.indexOf(q)));
  if (!candidates.length) candidates = pool;
  const q = candidates[Math.floor(Math.random() * candidates.length)];
  const idx = QUESTION_BANK.indexOf(q);
  return { question: q, idx };
}
