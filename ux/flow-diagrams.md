# Flow Diagrams

## App Launch Flow
```
[App loads]
    |
    v
[Auth check: token in localStorage?]
    |           |
   Yes         No
    |           |
    v           v
[GET /auth/me] [Show Login Overlay]
    |               |        |        |
  Success        Sign In  Register  Guest
    |               |        |        |
    v               v        v        v
[Set user state] [POST]   [POST]  [Clear user]
    |               |        |        |
    +-------+-------+--------+--------+
            |
            v
    [Load first question]
    [Fill queue (target: 5)]
            |
            v
    [Practice Tab ready]
```

## Question Answer Flow
```
[Question displayed]
        |
        v
[User taps choice A/B/C/D]
        |
        v
[answer() called]
        |
   +----+----+
   |         |
Correct    Wrong
   |         |
   v         v
streak++   streak=0
diffProg++ diff=floor
pts earned diffProg=0
   |         |
   |    [Flush queue]
   |    [Rebuild for floor]
   |         |
   +----+----+
        |
   [diffProg >= 3?]
    |          |
   Yes        No
    |          |
diff++     (stay)
flush queue    |
    |          |
    +-----+----+
          |
    [Save stats to server]
    [Show feedback + explanation]
    [Show "Next Question" button]
          |
          v
    [User taps "Next"]
          |
    [Queue has items?]
     |          |
    Yes        No
     |          |
  shift()   [fetchOne]
     |          |
     +-----+----+
           |
     [Display next Q]
     [Background: fillQueue]
```

## Difficulty State Machine
```
                    3 correct
    [Lv.1] ──────────────────> [Lv.2] ──> ... ──> [Lv.10]
      ^                          |
      |         wrong answer     |
      +──────────────────────────+
      (drops to diffFloor, not always Lv.1)
```

## Question Source Priority
```
[Roll 0.0 - 1.0]
    |
    |-- 0.00 to 0.70 --> Try DB question (GET /questions/random)
    |                       |-- Found --> Use it
    |                       |-- Not found/error --> Fall through
    |
    |-- 0.70 to 0.85 --> Try built-in question bank
    |                       |-- Found --> Use it
    |                       |-- Not found --> Fall through
    |
    |-- 0.85 to 1.00 --> AI generation (POST /questions/generate)
    |                       (also fallback for above)
```
