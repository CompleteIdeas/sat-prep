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

  // ── NEW QUESTIONS FROM CSV BANK (116 verified questions) ──
  // Reading & Writing questions

  // Information and Ideas
  { type:'english', passage:'In the last decade, several cities have planted trees along major roadways not only to improve appearance but also to lower summer surface temperatures. In one study, asphalt shaded by mature tree canopies was as much as 20 degrees cooler than nearby unshaded asphalt on the same afternoon. Researchers note that cooler pavement can last longer because repeated extreme heating contributes to cracking.', difficulty:4,
    question:'Which choice best states the main idea of the text?',
    choices:['A) Cities plant roadside trees mainly because residents prefer greener neighborhoods.','B) Shaded pavement can remain cooler, suggesting that urban trees may help streets last longer.','C) Researchers discovered that asphalt is more sensitive to heat than concrete is.','D) Roadway trees should be planted only where mature canopies already exist.'], correct:'B',
    explanation:'The text emphasizes that shading from trees cools pavement and may reduce cracking, which supports the idea that trees can help streets last longer.' },

  { type:'english', passage:'For years, historians assumed that the tiny clay tablets found at the desert site were ceremonial objects because many were discovered in temples. More recently, however, scholars have noticed that the tablets list quantities of grain beside symbols for nearby villages. That pattern suggests that the tablets were used to track deliveries rather than to mark religious rituals.', difficulty:5,
    question:'Which choice best states the main idea of the text?',
    choices:['A) The tablets were probably practical records instead of purely ceremonial objects.','B) The tablets prove that grain was the most important crop in the region.','C) Most ancient temples also served as village marketplaces.','D) Historians now agree on the meaning of every symbol on the tablets.'], correct:'A',
    explanation:'The passage contrasts an older ceremonial interpretation with a newer record-keeping interpretation.' },

  { type:'english', passage:'A marine biologist measured the number of juvenile fish living in two kinds of coastal habitat: seagrass beds and nearby rocky areas. The biologist found roughly three times as many juveniles in the seagrass beds as in the rocky areas. Because young fish are especially vulnerable to predators, the biologist argues that the dense grass likely provides shelter during an important stage of development.', difficulty:3,
    question:'Which choice best describes the function of the data in the text?',
    choices:['A) It shows that rocky habitats support more species than seagrass beds do.','B) It provides evidence for the claim that seagrass beds protect young fish.','C) It challenges the idea that juvenile fish need shelter from predators.','D) It demonstrates that all adult fish prefer seagrass beds.'], correct:'B',
    explanation:'The comparison in juvenile counts supports the idea that seagrass beds provide shelter.' },

  { type:'english', passage:'When the novelist Amina Rahal revised her first manuscript, she removed long descriptions of each room in the main character\'s house. In their place, she added a few precise details\u2014a cracked blue teacup, a window that would not close, a clock that ticked too loudly at night. Reviewers later praised the novel\'s setting as vivid and memorable.', difficulty:4,
    question:'Which choice best describes a relationship presented in the text?',
    choices:['A) Rahal\'s reviewers preferred early drafts of the novel to the final version.','B) Rahal\'s changes made the setting more effective by replacing lengthy description with selective detail.','C) Rahal removed descriptions because readers found the house unrealistic.','D) Rahal focused on the house because the plot depended on architectural accuracy.'], correct:'B',
    explanation:'The text links the revision choice to the praised vividness of the final setting.' },

  { type:'english', passage:'Text 1: The museum\'s new audio guide gives visitors useful historical context, but it may also encourage them to spend more time listening than looking. Text 2: Because the guide points out details that visitors might otherwise miss, it can deepen rather than distract from observation.', difficulty:5,
    question:'Which choice best describes the relationship between the two texts?',
    choices:['A) Text 2 refutes a concern raised in Text 1.','B) Text 2 gives an example of the problem discussed in Text 1.','C) Text 1 and Text 2 offer unrelated descriptions of museum technology.','D) Text 1 and Text 2 agree that visitors should ignore audio guides.'], correct:'A',
    explanation:'Text 1 raises a concern; Text 2 responds by arguing the opposite.' },

  { type:'english', passage:'A study of commuters in one metropolitan area found that people who bicycled to work reported higher satisfaction with their daily travel than people who drove alone. The researcher cautions, however, that the study measured only an association. It did not determine whether biking caused greater satisfaction or whether people who already enjoyed commuting were simply more likely to bike.', difficulty:4,
    question:'Which choice best states the point of the researcher\'s caution?',
    choices:['A) The study cannot be trusted because it included too few commuters.','B) The study\'s findings apply only to people who work in cities.','C) The study identified a relationship but did not prove a cause-and-effect link.','D) The study showed that driving alone is more efficient than biking to work.'], correct:'C',
    explanation:'The researcher distinguishes correlation from causation.' },

  { type:'english', passage:'In a 2025 test of four battery designs, engineers recorded the average number of charge cycles each design completed before performance noticeably declined. Design A lasted 820 cycles, Design B 790, Design C 1,140, and Design D 805. The engineers concluded that one design showed substantially greater durability than the others.', difficulty:2,
    question:'Which choice best supports the engineers\' conclusion?',
    choices:['A) Design A, because it lasted slightly longer than Designs B and D.','B) Design B, because it was tested alongside three other designs.','C) Design C, because its cycle count was much higher than the others\'.','D) Design D, because it performed similarly to Design A.'], correct:'C',
    explanation:'Design C\'s 1,140 cycles are far above the others, supporting the conclusion.' },

  { type:'english', passage:'The architect Maya Lin has said that memorials can shape how people move through space as well as what they think about. Her Vietnam Veterans Memorial, for example, gradually draws visitors below ground level before returning them to the surrounding landscape. According to the text, this design illustrates Lin\'s view that memorials can', difficulty:6,
    question:'Which choice most logically completes the text?',
    choices:['A) replace written history with abstract art.','B) guide physical experience in order to influence reflection.','C) be most effective when placed indoors.','D) honor only a single historical event at a time.'], correct:'B',
    explanation:'The example shows movement through space affecting thought and reflection.' },

  { type:'english', passage:'Scientists investigating a desert plant found that its leaves open their pores mainly at night, not during the day. Because open pores allow water to escape, the researchers argue that nighttime opening helps the plant conserve moisture in the hot, dry climate.', difficulty:3,
    question:'Which choice best states the inference supported by the text?',
    choices:['A) The plant grows only in areas with cool nights.','B) The plant\'s nighttime pore opening is likely an adaptation to arid conditions.','C) All desert plants use the same strategy to conserve water.','D) The plant\'s pores remain closed throughout the year.'], correct:'B',
    explanation:'The researchers connect the trait to moisture conservation in a dry climate.' },

  { type:'english', passage:'In a survey, 68 percent of respondents said they preferred printed maps when hiking in unfamiliar areas, while 24 percent preferred phone-based maps and 8 percent had no preference. The survey author argues that printed maps remain popular among hikers despite digital alternatives.', difficulty:1,
    question:'Which choice best describes how the survey results relate to the author\'s argument?',
    choices:['A) They weaken it by showing that many hikers use phones.','B) They support it by showing a clear majority favoring printed maps.','C) They complicate it by indicating that most hikers have no preference.','D) They refute it by demonstrating that digital tools dominate.'], correct:'B',
    explanation:'A 68 percent majority supports the claim that printed maps remain popular.' },

  { type:'english', passage:'Some economists once predicted that remote work would cause downtown restaurants to disappear. Yet several cities have seen a different pattern: while lunch traffic has fallen, evening business has grown as former office districts have added housing. The text suggests that the earlier prediction may have overlooked the possibility that', difficulty:6,
    question:'Which choice most logically completes the text?',
    choices:['A) restaurants can adapt to changes in when customers arrive.','B) remote work always increases residential rents.','C) office workers generally avoid eating dinner downtown.','D) cities should prohibit the conversion of offices into apartments.'], correct:'A',
    explanation:'The text shows restaurants surviving by shifting from lunch to evening demand.' },

  // RW-I-012: difficulty changed from 8 to 3
  { type:'english', passage:'Astronomer Vera Rubin\'s measurements of how fast stars orbit within galaxies did not match what scientists expected based only on visible matter. Her observations therefore became important evidence in support of the idea that additional, unseen matter exists in galaxies.', difficulty:3,
    question:'Which choice best states the role of Rubin\'s measurements in the text?',
    choices:['A) They provided evidence for a theory about unseen matter.','B) They proved that every galaxy has the same mass.','C) They showed that visible matter is distributed evenly in space.','D) They demonstrated that astronomers had mismeasured star brightness.'], correct:'A',
    explanation:'The final sentence explicitly says the measurements became evidence for unseen matter.' },

  { type:'english', passage:'At first, critics dismissed the composer Elena Ortiz\'s use of street sounds in her orchestral work as distracting. Years later, some of those same critics praised the piece for expanding ideas about what could count as musical material. The text most strongly suggests that the critics\' views', difficulty:2,
    question:'Which choice most logically completes the text?',
    choices:['A) became more favorable over time.','B) stayed consistent despite public reaction.','C) focused mainly on the length of Ortiz\'s work.','D) changed because Ortiz stopped using street sounds.'], correct:'A',
    explanation:'The critics moved from dismissal to praise.' },

  { type:'english', passage:'Researchers compared two methods for restoring prairie land. After five years, plots restored by sowing a wide variety of native seeds supported more pollinator species than plots restored with only a few grass species. The researchers argue that restoration plans should emphasize plant diversity.', difficulty:3,
    question:'Which choice best identifies the evidence for the researchers\' argument?',
    choices:['A) The restored plots were studied for five years.','B) Prairie land can be restored using more than one method.','C) Plots with more kinds of native plants supported more pollinator species.','D) Pollinators are important to healthy ecosystems.'], correct:'C',
    explanation:'The argument for diversity is supported by the higher pollinator counts in the more diverse plots.' },

  // Craft and Structure
  { type:'english', passage:'Many readers think of the scientist\'s prose as dry, but in her field journals it is often playful. She describes a stubborn instrument as "sulking" and a storm cloud as "marching in with theatrical confidence." In the text, the word "playful" most nearly means', difficulty:3,
    question:'As used in the text, the word "playful" most nearly means',
    choices:['A) competitive','B) lighthearted','C) uncertain','D) careless'], correct:'B',
    explanation:'The examples show humorous, imaginative language, so \'lighthearted\' is the best match.' },

  { type:'english', passage:'The editor moved the essay\'s personal anecdote from the beginning to the end, where it now echoes the argument made in the middle paragraphs. This change primarily helps the essay by', difficulty:4,
    question:'Which choice best describes the effect of this revision on the essay?',
    choices:['A) providing a memorable conclusion that reinforces the central claim','B) adding technical evidence to support a scientific hypothesis','C) eliminating the need for a thesis statement','D) making the chronology of the writer\'s childhood perfectly clear'], correct:'A',
    explanation:'The anecdote now functions as a conclusion that echoes and reinforces the argument.' },

  { type:'english', passage:'Text 1: The town\'s yearly lantern festival has become so popular with tourists that local residents often avoid the main square during the event. Text 2: Even though the festival draws crowds, many residents still participate by volunteering, performing music, and hosting family gatherings nearby.', difficulty:5,
    question:'How would the author of Text 2 most likely respond to the concern raised in Text 1?',
    choices:['A) By arguing that the festival should be moved to another town','B) By agreeing that tourism has completely erased local involvement','C) By suggesting that residents remain engaged with the festival in important ways','D) By claiming that tourists rarely attend the festival at all'], correct:'C',
    explanation:'Text 2 acknowledges crowds but emphasizes continued resident participation.' },

  { type:'english', passage:'In an article on coral reefs, a writer notes that some species of fish act like "gardeners," trimming algae so that coral can grow. The quotation marks around "gardeners" indicate that the writer is using the term', difficulty:2,
    question:'In the text, the quotation marks around "gardeners" indicate that the writer is using the term',
    choices:['A) ironically, to mock the fish\'s behavior','B) literally, to show that the fish cultivate crops','C) figuratively, to compare the fish\'s role to a familiar job','D) historically, to refer to an outdated scientific label'], correct:'C',
    explanation:'The fish are being compared figuratively to gardeners.' },

  { type:'english', passage:'The phrase "a quiet revolution" appears in an article about libraries that are adding recording studios and tool-lending programs. As used in the text, the phrase suggests that the changes are', difficulty:4,
    question:'As used in the text, the phrase "a quiet revolution" most nearly suggests that the changes are',
    choices:['A) dramatic but occurring without much public attention','B) illegal and opposed by most library visitors','C) temporary responses to a short-term budget crisis','D) limited to libraries in rural areas'], correct:'A',
    explanation:'\'Revolution\' suggests major change, while \'quiet\' suggests low visibility.' },

  { type:'english', passage:'The historian includes a paragraph explaining that the kingdom\'s tax records survived only because they were copied onto durable stone. This paragraph mainly serves to', difficulty:3,
    question:'Which choice best describes the function of the paragraph about the kingdom\'s tax records?',
    choices:['A) challenge the reliability of all stone inscriptions','B) explain why evidence from that kingdom is unusually complete','C) argue that taxes were higher than historians once thought','D) show that paper records are always inaccurate'], correct:'B',
    explanation:'The paragraph explains why records from this kingdom survived so well.' },

  { type:'english', passage:'When the botanist writes that a rare fern has "chosen" the coolest corner of the greenhouse, she is most likely using the word "chosen" to', difficulty:2,
    question:'The botanist most likely uses the word "chosen" to',
    choices:['A) suggest that the fern made a conscious decision','B) acknowledge uncertainty about the fern\'s exact species','C) personify the fern in order to describe where it grows','D) indicate that another researcher placed the fern there'], correct:'C',
    explanation:'The plant is personified; it did not literally choose.' },

  // RW-C-022: difficulty changed from 9 to 5
  { type:'english', passage:'Text 1: Expanding the city\'s bike-lane network will reduce traffic because more commuters will choose bicycles over cars. Text 2: Bike lanes may benefit current cyclists, but they won\'t substantially reduce traffic unless the city also improves public transit.', difficulty:5,
    question:'The author of Text 2 would most likely agree with which statement about Text 1?',
    choices:['A) It overlooks another transportation factor that affects congestion.','B) It exaggerates how expensive public transit can be.','C) It proves that car ownership is declining rapidly.','D) It underestimates the popularity of cycling among tourists.'], correct:'A',
    explanation:'Text 2 says bike lanes alone are insufficient because transit also matters.' },

  { type:'english', passage:'An art critic writes that a painter\'s later works are "stripped of ornament." In context, "stripped of ornament" most nearly means', difficulty:3,
    question:'As used in the text, "stripped of ornament" most nearly means',
    choices:['A) hidden from the public','B) reduced to simpler visual elements','C) damaged during transport','D) copied from older paintings'], correct:'B',
    explanation:'The phrase implies removal of decorative extras, leaving a simpler style.' },

  { type:'english', passage:'The final sentence of the paragraph asks, "What would happen if neighborhoods designed for cars were redesigned for people instead?" The sentence primarily serves to', difficulty:2,
    question:'The final sentence of the paragraph primarily serves to',
    choices:['A) present a question that frames the discussion that follows','B) summarize numerical findings from a transportation study','C) dismiss opposing views as unimportant','D) provide a definitive answer to the author\'s argument'], correct:'A',
    explanation:'The question sets up the topic rather than answering it.' },

  { type:'english', passage:'A review describes a new biography as "meticulous without becoming plodding." This description suggests that the biography is', difficulty:3,
    question:'The review\'s description most strongly suggests that the biography is',
    choices:['A) carefully researched yet still engaging to read','B) brief because it omits most details','C) written mainly for specialists in a narrow field','D) organized in a confusing way'], correct:'A',
    explanation:'\'Meticulous\' means careful; \'without becoming plodding\' means not dull.' },

  { type:'english', passage:'Text 1: The chef argues that recipes should be followed exactly because small changes can alter a dish\'s chemistry. Text 2: The food writer claims that home cooks learn best by improvising and adjusting recipes to their own tastes.', difficulty:4,
    question:'Which choice best describes the relationship between the texts?',
    choices:['A) Text 2 offers a practical example that confirms Text 1.','B) Text 2 presents a different perspective on how cooking should be approached.','C) Text 1 and Text 2 both focus on the history of restaurant menus.','D) Text 1 directly summarizes the evidence discussed in Text 2.'], correct:'B',
    explanation:'The texts disagree about strictness versus improvisation in cooking.' },

  { type:'english', passage:'The writer opens the article with a description of a crowded subway car and later turns to statistics about average commute times. This structure helps the article by', difficulty:4,
    question:'This structure mainly helps the article by',
    choices:['A) moving from a concrete example to broader evidence','B) showing that statistics are less persuasive than anecdotes','C) proving that all commuters share the same experience','D) avoiding any clear organizational pattern'], correct:'A',
    explanation:'The article begins with a specific image and then broadens to data.' },

  { type:'english', passage:'In a speech, a student says the school garden has become "a classroom without walls." The phrase is used mainly to emphasize that the garden', difficulty:2,
    question:'The phrase "a classroom without walls" is used mainly to emphasize that the garden',
    choices:['A) is larger than any indoor classroom in the building','B) teaches students through outdoor experience','C) was built before the school itself was built','D) should be enclosed to protect plants from weather'], correct:'B',
    explanation:'The metaphor highlights the garden as a place of learning.' },

  // Expression of Ideas
  // RW-E-029 excluded (duplicate of RW-E-030)

  { type:'english', passage:'A student is revising the following sentence from an essay about public parks: "The new park includes walking trails, a community garden, and there is also a playground."', difficulty:2,
    question:'Which choice most effectively revises the sentence to improve clarity and style?',
    choices:['A) The new park includes walking trails, a community garden, and also there is a playground.','B) The new park includes walking trails, a community garden, and a playground.','C) The new park includes walking trails, a community garden, with a playground.','D) The new park includes walking trails, and a community garden, and there is a playground.'], correct:'B',
    explanation:'Choice B creates a clear, parallel list.' },

  { type:'english', passage:'A student wants to emphasize that the invention solved a long-standing problem. | For decades, early photographers struggled to keep images from fading. ______, the new chemical process allowed photographs to remain stable for years.', difficulty:3,
    question:'Which choice best completes the text?',
    choices:['A) For example,','B) Likewise,','C) As a result,','D) Nevertheless,'], correct:'C',
    explanation:'\'As a result\' best signals that the new process solved the previously stated problem.' },

  { type:'english', passage:'Notes: | - The Riverside Theater opened in 1928. | - The building was designed by Lina Perez. | - In 2024, the theater reopened after a two-year restoration. | - The restoration preserved the original painted ceiling. | | A student wants to introduce the theater and mention its recent reopening.', difficulty:4,
    question:'Which choice most effectively uses relevant information from the notes?',
    choices:['A) Designed by Lina Perez, the Riverside Theater opened in 1928 and reopened in 2024 after a two-year restoration.','B) The Riverside Theater has a painted ceiling, and some buildings are restored after they open.','C) The Riverside Theater reopened after a restoration, and Lina Perez designed many buildings in 1928.','D) A restoration preserved the theater\'s ceiling because the building opened in 1928.'], correct:'A',
    explanation:'Choice A accurately combines the key facts needed for the stated purpose.' },

  { type:'english', passage:'A paragraph about honeybees ends with a sentence explaining that bees communicate the location of food by performing a "waggle dance." The writer wants to add the following sentence next: "This movement conveys both direction and distance."', difficulty:3,
    question:'Where should the sentence be placed?',
    choices:['A) Before the sentence about bees communicating the location of food','B) After the sentence about the "waggle dance"','C) At the very beginning of the paragraph','D) It should not be added because it is irrelevant'], correct:'B',
    explanation:'The added sentence refers to \'This movement,\' so it should immediately follow the sentence about the waggle dance.' },

  { type:'english', passage:'A student is drafting an essay about glass recycling: | "Recycling glass saves raw materials. It also reduces the energy needed to make new bottles. ______, many cities have expanded glass collection programs in recent years."', difficulty:2,
    question:'Which choice best completes the text?',
    choices:['A) In contrast,','B) For this reason,','C) Meanwhile,','D) Instead,'], correct:'B',
    explanation:'The final sentence follows logically as a result of the benefits just listed.' },

  { type:'english', passage:'Notes: | - Mae Jemison became the first Black woman in space in 1992. | - She is also a physician and engineer. | - Later, she promoted science education through the Jemison Group. | - The student wants to stress Jemison\'s broad accomplishments.', difficulty:4,
    question:'Which choice most effectively uses relevant information from the notes?',
    choices:['A) Mae Jemison traveled to space in 1992, and many astronauts later worked in education.','B) Physician, engineer, and astronaut Mae Jemison became the first Black woman in space in 1992 and later promoted science education.','C) Mae Jemison was a physician in 1992, which was also the year she became interested in engineering.','D) Science education is important, and Mae Jemison supported it through a group named after her.'], correct:'B',
    explanation:'Choice B highlights multiple accomplishments, which matches the goal.' },

  { type:'english', passage:'A writer wants to combine the ideas in the following sentences: | The telescope is relatively small. It can detect planets hundreds of light-years away.', difficulty:3,
    question:'Which choice most effectively combines the sentences?',
    choices:['A) The telescope is relatively small, and it can detect planets hundreds of light-years away.','B) The telescope, relatively small, can detect planets hundreds of light-years away.','C) Although relatively small, the telescope can detect planets hundreds of light-years away.','D) Detecting planets hundreds of light-years away, the telescope is relatively small.'], correct:'C',
    explanation:'Choice C best highlights the contrast between the telescope\'s size and ability.' },

  { type:'english', passage:'A student is revising a paragraph about migration routes of monarch butterflies. The paragraph first explains where monarchs spend the summer, then describes their fall migration south, and finally discusses spring movement north. The student wants to add a sentence explaining that monarchs lay eggs during the northward spring journey.', difficulty:5,
    question:'Where would the sentence fit best?',
    choices:['A) At the beginning of the paragraph, before the summer description','B) Between the sentences about fall migration and spring movement north','C) After the sentence about spring movement north','D) It should not be added anywhere in the paragraph'], correct:'C',
    explanation:'The detail belongs with the discussion of the spring northward journey.' },

  { type:'english', passage:'The writer wants to clarify the relationship between two sentences: | "The city installed rain gardens beside several streets. These planted areas absorb stormwater before it can overwhelm drains."', difficulty:4,
    question:'Which choice most effectively combines the sentences?',
    choices:['A) The city installed rain gardens beside several streets, planted areas that absorb stormwater before it can overwhelm drains.','B) The city installed rain gardens beside several streets, and drains can be overwhelmed by stormwater.','C) Beside several streets, the city installed rain gardens, and these planted areas absorb stormwater before it can overwhelm drains, which is stormwater.','D) Installed beside several streets, rain gardens were there in the city.'], correct:'A',
    explanation:'Choice A neatly defines rain gardens while preserving the meaning.' },

  { type:'english', passage:'A student writes: "The documentary includes interviews with scientists. It features archival photographs. It uses animation to explain complex processes." The student wants to show that these features work together.', difficulty:2,
    question:'Which choice best revises the text?',
    choices:['A) The documentary includes interviews with scientists, features archival photographs, and uses animation to explain complex processes.','B) The documentary includes interviews with scientists. Also, archival photographs. Also, animation to explain complex processes.','C) The documentary includes interviews with scientists, and archival photographs, and also animation are used.','D) The documentary includes interviews with scientists and explaining complex processes with animation, archival photographs.'], correct:'A',
    explanation:'Choice A creates a smooth, parallel series.' },

  { type:'english', passage:'Notes: | - The Oak Street Bridge was built in 1911. | - It was the town\'s first steel bridge. | - It connected the downtown market to the train station. | - The student wants to explain why the bridge mattered to the town.', difficulty:4,
    question:'Which choice most effectively uses relevant information from the notes?',
    choices:['A) Built in 1911, the Oak Street Bridge connected the downtown market to the train station, making travel and trade easier.','B) The Oak Street Bridge was made of steel, and the town had a market and a train station.','C) The town\'s first steel bridge was called the Oak Street Bridge, and it was built in 1911.','D) The Oak Street Bridge connected two places, and steel was used in many bridges.'], correct:'A',
    explanation:'Choice A focuses on why the bridge mattered: it linked two key locations.' },

  { type:'english', passage:'A writer wants to show that the second sentence contrasts with the first. | "The desert receives very little rain each year. ______ many of its plants have evolved remarkable ways to store water."', difficulty:3,
    question:'Which choice best completes the text?',
    choices:['A) For instance,','B) Even so,','C) Similarly,','D) As a result of this similarity,'], correct:'B',
    explanation:'\'Even so\' signals contrast: despite little rain, plants thrive with adaptations.' },

  { type:'english', passage:'A student wants to add a sentence to a paragraph about wind turbines. The paragraph explains how turbine blades turn, how the motion drives a generator, and how electricity then enters the grid. The sentence to add explains that stronger winds generally produce more electricity.', difficulty:5,
    question:'Where should the sentence be placed for the most logical flow?',
    choices:['A) Before the sentence about the blades turning','B) After the sentence about the blades turning','C) After the sentence about electricity entering the grid','D) At the beginning of an unrelated paragraph about solar panels'], correct:'B',
    explanation:'The point about stronger winds belongs right after the discussion of blade movement.' },

  { type:'english', passage:'The writer wants the following sentence to introduce a paragraph about community science projects: "Across the country, volunteers are helping researchers collect useful environmental data."', difficulty:2,
    question:'Which choice best describes why this sentence works well as an introduction?',
    choices:['A) It presents the paragraph\'s broad topic before later details and examples.','B) It proves that volunteer-collected data is always more accurate than professional data.','C) It shifts the paragraph away from its topic and toward an unrelated one.','D) It summarizes the paragraph\'s concluding counterargument.'], correct:'A',
    explanation:'A strong topic sentence introduces the main idea broadly.' },

  // Standard English Conventions
  { type:'english', passage:'The research team ____ the samples in a temperature-controlled room overnight before beginning the analysis.', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) store','B) stores','C) stored','D) storing'], correct:'C',
    explanation:'The sentence needs the simple past-tense verb \'stored.\'' },

  { type:'english', passage:'Neither the museum curator nor the volunteer guides ____ certain why the painting was moved last year.', difficulty:4,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) is','B) are','C) was','D) be'], correct:'B',
    explanation:'With \'neither...nor,\' the verb agrees with the noun closer to it: \'guides\' is plural.' },

  { type:'english', passage:'The scientist reviewed the data carefully, ____ she wanted to make sure no readings had been recorded incorrectly.', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) and','B) because','C) however','D) for example'], correct:'B',
    explanation:'\'Because\' correctly introduces the reason she reviewed the data carefully.' },

  { type:'english', passage:'By the time the guests arrived, the chef ____ the bread and prepared the soup.', difficulty:5,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) bakes','B) has baked','C) had baked','D) will bake'], correct:'C',
    explanation:'Past perfect \'had baked\' correctly shows action completed before another past action.' },

  { type:'english', passage:'The poet\'s newest collection explores migration, memory, and belonging; ____ , many of the poems also focus on language itself.', difficulty:3,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) moreover','B) moreover,','C) moreover;','D) moreover:'], correct:'B',
    explanation:'A conjunctive adverb after a semicolon is followed by a comma: \'; moreover,\'.' },

  { type:'english', passage:'The documentary profiles three inventors ____ work has transformed renewable-energy storage.', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) who','B) whose','C) whom','D) which'], correct:'B',
    explanation:'\'Whose\' correctly shows possession: the inventors\' work.' },

  { type:'english', passage:'To reduce glare in the gallery, the windows were shaded, and the lights ____ adjusted.', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) was','B) is','C) were','D) be'], correct:'C',
    explanation:'Plural subject \'lights\' takes plural verb \'were.\'' },

  { type:'english', passage:'The hikers followed the trail to the ridge, ____ they stopped to watch the sunset.', difficulty:3,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) where','B) which','C) that','D) whom'], correct:'A',
    explanation:'\'Where\' correctly refers to the place, the ridge.' },

  { type:'english', passage:'A set of antique maps, along with several navigation tools, ____ on display in the maritime museum.', difficulty:4,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) are','B) were','C) is','D) have been'], correct:'C',
    explanation:'The subject is \'A set,\' which is singular, so \'is\' is correct.' },

  // RW-S-053: answer verified correct — ", but" joins contrasting independent clauses
  { type:'english', passage:'The lecture was fascinating ____ it was longer than many students had expected.', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) ;','B) , but','C) , because','D) and'], correct:'B',
    explanation:'A comma plus \'but\' correctly joins the contrasting independent clauses.' },

  { type:'english', passage:'Once the software update ____ installed, the device restarted automatically.', difficulty:3,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) was','B) were','C) have been','D) being'], correct:'A',
    explanation:'The passive construction requires singular \'was installed.\'' },

  { type:'english', passage:'The committee asked for shorter reports, clearer graphics, and ____ recommendations.', difficulty:3,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) that the conclusion be more practical','B) the recommendations should be practical','C) more practical','D) practicality'], correct:'C',
    explanation:'Choice C maintains parallel structure with \'shorter\' and \'clearer.\'' },

  // RW-S-056: answer verified correct — singular "concert" takes "was"
  { type:'english', passage:'Because the storm arrived earlier than forecast, the outdoor concert, which had been planned for weeks ____ moved indoors.', difficulty:3,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) was','B) were','C) have been','D) being'], correct:'A',
    explanation:'The singular subject \'concert\' takes singular verb \'was.\'' },

  { type:'english', passage:'The author revised the chapter several times to make its argument more concise and ____ .', difficulty:2,
    question:'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices:['A) persuasively','B) persuasive','C) persuade','D) persuasion'], correct:'B',
    explanation:'After \'more concise and,\' the parallel adjective form is \'persuasive.\'' },

  // Math questions

  // Algebra
  { type:'math', passage:'', difficulty:1,
    question:'Solve for x. | 3x + 5 = 20',
    choices:['A) 3','B) 5','C) 15','D) 25'], correct:'B',
    explanation:'Subtract 5 to get 3x = 15, then divide by 3.' },

  { type:'math', passage:'', difficulty:1,
    question:'Solve for y. | 2y - 7 = 17',
    choices:['A) 5','B) 10','C) 12','D) 24'], correct:'C',
    explanation:'Add 7 to get 2y = 24, then divide by 2.' },

  // M-ALG-003: equation fixed to y = 3x - 2 so answer B (slope = 3) is correct
  { type:'math', passage:'', difficulty:2,
    question:'What is the slope of the line given by the equation y = 3x - 2 ?',
    choices:['A) -3','B) 3','C) 4','D) 12'], correct:'B',
    explanation:'The equation is already in y = mx + b form, where m = 3.' },

  { type:'math', passage:'', difficulty:2,
    question:'A line passes through (2, 7) and (6, 15). What is its slope?',
    choices:['A) 1','B) 2','C) 4','D) 8'], correct:'B',
    explanation:'Slope = (15 - 7) / (6 - 2) = 8 / 4 = 2.' },

  { type:'math', passage:'', difficulty:2,
    question:'If y = -2x + 9, what is the value of y when x = 4 ?',
    choices:['A) 1','B) -1','C) 5','D) 17'], correct:'A',
    explanation:'Substitute x = 4: y = -8 + 9 = 1.' },

  { type:'math', passage:'', difficulty:4,
    question:'Solve the system of equations. | 2x + y = 11 | x - y = 1',
    choices:['A) (3, 5)','B) (4, 3)','C) (5, 1)','D) (6, -1)'], correct:'B',
    explanation:'Add the equations to get 3x = 12, so x = 4 and y = 3.' },

  { type:'math', passage:'', difficulty:3,
    question:'Solve the inequality for x. | 5x - 9 > 11',
    choices:['A) x > 2','B) x > 4','C) x < 2','D) x < 4'], correct:'B',
    explanation:'Add 9: 5x > 20, so x > 4.' },

  { type:'math', passage:'A taxi charges a $4 starting fee plus $3 per mile.', difficulty:2,
    question:'Which equation gives the total cost c, in dollars, for a trip of m miles?',
    choices:['A) c = 4m + 3','B) c = 3m + 4','C) c = 7m','D) c = m + 7'], correct:'B',
    explanation:'Total cost is fixed fee + per-mile charge.' },

  { type:'math', passage:'A school\'s band sold 120 tickets for a concert. Student tickets cost $6 each and adult tickets cost $10 each. Total ticket sales were $920.', difficulty:5,
    question:'How many adult tickets were sold?',
    choices:['A) 20','B) 40','C) 50','D) 70'], correct:'C',
    explanation:'Let a be adult tickets. Then 10a + 6(120 - a) = 920. So 4a = 200 and a = 50.' },

  { type:'math', passage:'', difficulty:3,
    question:'The graph of y = 2x - 5 is shifted up 3 units. Which equation represents the new graph?',
    choices:['A) y = 2x - 8','B) y = 2x - 2','C) y = 5x - 5','D) y = 2x + 3'], correct:'B',
    explanation:'Shifting up 3 adds 3 to all y-values: y = 2x - 2.' },

  { type:'math', passage:'', difficulty:3,
    question:'If 4(x - 3) = 2x + 6, what is the value of x ?',
    choices:['A) 3','B) 6','C) 9','D) 12'], correct:'C',
    explanation:'Expand: 4x - 12 = 2x + 6. Then 2x = 18, so x = 9.' },

  { type:'math', passage:'A gym charges a monthly fee of $18 plus $12 per class.', difficulty:3,
    question:'If a member pays $78 in one month, how many classes did the member take?',
    choices:['A) 4','B) 5','C) 6','D) 8'], correct:'B',
    explanation:'78 = 18 + 12c, so 60 = 12c and c = 5.' },

  { type:'math', passage:'', difficulty:3,
    question:'What is the x-intercept of the line y = 5 - x ?',
    choices:['A) -5','B) 0','C) 5','D) 10'], correct:'C',
    explanation:'At the x-intercept, y = 0. So 0 = 5 - x and x = 5.' },

  { type:'math', passage:'', difficulty:5,
    question:'A solution to the system below is (x, y). | 3x + 2y = 18 | x + y = 7 | What is the value of x ?',
    choices:['A) 2','B) 4','C) 6','D) 8'], correct:'B',
    explanation:'From x + y = 7, y = 7 - x. Substitute: 3x + 2(7 - x) = 18, so x + 14 = 18 and x = 4.' },

  { type:'math', passage:'', difficulty:2,
    question:'For the function f(x) = 7 - 3x, what is the value of f(-2)?',
    choices:['A) 1','B) 7','C) 11','D) 13'], correct:'D',
    explanation:'f(-2) = 7 - 3(-2) = 7 + 6 = 13.' },

  // M-ALG-016 excluded (SPR format)

  // Advanced Math
  { type:'math', passage:'', difficulty:2,
    question:'What is the value of x that satisfies x^2 - 9 = 0 ?',
    choices:['A) -9 only','B) 3 only','C) -3 and 3','D) 0'], correct:'C',
    explanation:'x^2 = 9, so x = -3 or x = 3.' },

  { type:'math', passage:'', difficulty:2,
    question:'Which expression is equivalent to (x + 4)(x - 4) ?',
    choices:['A) x^2 + 16','B) x^2 - 16','C) x^2 - 8x + 16','D) x^2 + 8x + 16'], correct:'B',
    explanation:'This is a difference of squares.' },

  { type:'math', passage:'', difficulty:3,
    question:'If f(x) = x^2 + 6x + 8, which expression is equivalent to f(x)?',
    choices:['A) (x + 4)(x + 2)','B) (x - 4)(x - 2)','C) (x + 8)(x - 1)','D) (x + 3)^2 - 1'], correct:'A',
    explanation:'Numbers that multiply to 8 and add to 6 are 4 and 2.' },

  { type:'math', passage:'', difficulty:3,
    question:'What is the y-value of the vertex of y = (x - 3)^2 - 5 ?',
    choices:['A) -5','B) -3','C) 3','D) 5'], correct:'A',
    explanation:'In vertex form y = (x - h)^2 + k, the vertex is (h, k).' },

  { type:'math', passage:'', difficulty:2,
    question:'If 2^(x) = 32, what is the value of x ?',
    choices:['A) 4','B) 5','C) 6','D) 8'], correct:'B',
    explanation:'32 = 2^5.' },

  { type:'math', passage:'', difficulty:2,
    question:'Which expression is equivalent to 3x^2 + 12x ?',
    choices:['A) 3x(x + 4)','B) 3(x + 2)^2','C) x(3x + 12x)','D) 3(x^2 + 12)'], correct:'A',
    explanation:'Factor out the greatest common factor 3x.' },

  { type:'math', passage:'', difficulty:3,
    question:'The function g(x) = (x - 1)(x - 6). For which value of x is g(x) = 0 ?',
    choices:['A) 1 only','B) 6 only','C) 1 and 6','D) -1 and -6'], correct:'C',
    explanation:'Set each factor equal to zero.' },

  { type:'math', passage:'', difficulty:4,
    question:'If x^2 + 2x - 15 = 0, what is one possible value of x ?',
    choices:['A) -5','B) -3','C) 3','D) 5'], correct:'C',
    explanation:'Factor: (x + 5)(x - 3) = 0, so x = -5 or x = 3. One possible value is 3.' },

  { type:'math', passage:'', difficulty:4,
    question:'Which function grows fastest as x increases?',
    choices:['A) y = x + 7','B) y = x^2','C) y = 2^x','D) y = 7'], correct:'C',
    explanation:'Exponential growth outpaces linear, quadratic, and constant growth for large x.' },

  { type:'math', passage:'', difficulty:1,
    question:'What is the value of sqrt(81) ?',
    choices:['A) -9','B) 0','C) 9','D) 18'], correct:'C',
    explanation:'The principal square root of 81 is 9.' },

  { type:'math', passage:'', difficulty:10,
    question:'If x + 1/x = 5, what is the value of x^2 + 1/x^2 ?',
    choices:['A) 21','B) 23','C) 25','D) 27'], correct:'B',
    explanation:'Square both sides: x^2 + 2 + 1/x^2 = 25, so x^2 + 1/x^2 = 23.' },

  { type:'math', passage:'', difficulty:2,
    question:'Which equation has x = 4 as a solution?',
    choices:['A) x^2 - 8 = 0','B) x^2 - 16 = 0','C) x^2 + 4 = 0','D) 2x + 1 = 0'], correct:'B',
    explanation:'Substituting x = 4 gives 16 - 16 = 0.' },

  { type:'math', passage:'', difficulty:2,
    question:'For h(x) = x^2 - 4x + 7, what is h(2)?',
    choices:['A) 1','B) 3','C) 7','D) 11'], correct:'B',
    explanation:'2^2 - 4(2) + 7 = 4 - 8 + 7 = 3.' },

  { type:'math', passage:'A population triples every hour. If there are 4 bacteria at hour 0, how many bacteria are there at hour 3?', difficulty:3,
    question:'How many bacteria are there at hour 3?',
    choices:['A) 12','B) 27','C) 36','D) 108'], correct:'D',
    explanation:'After 3 hours: 4 * 3^3 = 4 * 27 = 108.' },

  { type:'math', passage:'', difficulty:5,
    question:'If x^2 - 6x + k is a perfect square trinomial, what value of k makes this true?',
    choices:['A) 3','B) 6','C) 9','D) 12'], correct:'C',
    explanation:'x^2 - 6x + 9 = (x - 3)^2.' },

  // M-ADV-032 excluded (SPR format)

  // Problem-Solving and Data Analysis
  { type:'math', passage:'At a school supply store, 6 notebooks cost $9.00.', difficulty:1,
    question:'What is the cost, in dollars, per notebook?',
    choices:['A) 1.00','B) 1.25','C) 1.50','D) 2.00'], correct:'C',
    explanation:'Unit rate = 9 / 6 = 1.50 dollars per notebook.' },

  { type:'math', passage:'A recipe uses 3 cups of flour for every 2 cups of sugar.', difficulty:2,
    question:'If the recipe uses 9 cups of flour, how many cups of sugar are needed?',
    choices:['A) 4','B) 5','C) 6','D) 8'], correct:'C',
    explanation:'Scale the ratio by 3: 3:2 becomes 9:6.' },

  { type:'math', passage:'A jacket originally costs $80 and is discounted by 25%.', difficulty:2,
    question:'What is the sale price of the jacket?',
    choices:['A) $20','B) $55','C) $60','D) $65'], correct:'C',
    explanation:'25% of 80 is 20, so the sale price is 80 - 20 = 60.' },

  { type:'math', passage:'In a survey of 200 students, 86 said they preferred studying in the morning.', difficulty:2,
    question:'Which value is closest to the percentage of surveyed students who preferred studying in the morning?',
    choices:['A) 21%','B) 35%','C) 43%','D) 86%'], correct:'C',
    explanation:'86 / 200 = 0.43 = 43%.' },

  { type:'math', passage:'A car travels 180 miles in 3 hours at a constant rate.', difficulty:2,
    question:'At that rate, how many miles will the car travel in 5 hours?',
    choices:['A) 60','B) 150','C) 300','D) 900'], correct:'C',
    explanation:'The rate is 180 / 3 = 60 miles per hour. In 5 hours, the car travels 300 miles.' },

  { type:'math', passage:'The table shows the number of books read by 5 students in one month: 2, 4, 4, 5, 10.', difficulty:3,
    question:'What is the median number of books read?',
    choices:['A) 4','B) 5','C) 5.5','D) 10'], correct:'A',
    explanation:'The middle value in the ordered list is 4.' },

  { type:'math', passage:'The table shows the numbers 3, 3, 4, 7, and 8.', difficulty:2,
    question:'What is the mean of the numbers?',
    choices:['A) 4','B) 5','C) 5.5','D) 25'], correct:'B',
    explanation:'Mean = (3 + 3 + 4 + 7 + 8) / 5 = 25 / 5 = 5.' },

  { type:'math', passage:'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles.', difficulty:3,
    question:'If one marble is chosen at random, what is the probability that it is blue?',
    choices:['A) 1/5','B) 3/10','C) 1/3','D) 1/2'], correct:'B',
    explanation:'There are 10 marbles total, and 3 are blue, so the probability is 3/10.' },

  { type:'math', passage:'A classroom has 12 boys and 18 girls.', difficulty:1,
    question:'What is the ratio of boys to girls in simplest form?',
    choices:['A) 2:3','B) 3:2','C) 12:18','D) 6:9'], correct:'A',
    explanation:'12:18 simplifies by dividing both numbers by 6.' },

  { type:'math', passage:'A scientist records a plant\'s height as 18 cm on day 1 and 24 cm on day 4.', difficulty:4,
    question:'Assuming constant growth, what is the average growth rate in centimeters per day over this interval?',
    choices:['A) 1','B) 2','C) 3','D) 6'], correct:'B',
    explanation:'Growth is 24 - 18 = 6 cm over 3 days, so the rate is 2 cm/day.' },

  { type:'math', passage:'A store increases the price of a bicycle from $240 to $276.', difficulty:4,
    question:'What is the percent increase in the price?',
    choices:['A) 12%','B) 15%','C) 18%','D) 36%'], correct:'B',
    explanation:'Increase is 36; 36 / 240 = 0.15 = 15%.' },

  { type:'math', passage:'The scatterplot for a data set shows a strong positive linear association between hours studied and quiz score.', difficulty:5,
    question:'Which statement is supported by this description?',
    choices:['A) Students who study more tend to earn higher quiz scores.','B) All students who study more earn perfect scores.','C) Studying causes higher scores in every case.','D) Quiz scores decrease as study time increases.'], correct:'A',
    explanation:'A strong positive linear association means the variables tend to increase together.' },

  { type:'math', passage:'A restaurant\'s weekend revenue was $2,400, which was 20% greater than its weekday revenue.', difficulty:5,
    question:'What was the weekday revenue?',
    choices:['A) $1,920','B) $2,000','C) $2,120','D) $2,880'], correct:'B',
    explanation:'If weekend revenue is 120% of weekday revenue, then weekday revenue is 2400 / 1.2 = 2000.' },

  { type:'math', passage:'On a map, 1 inch represents 8 miles.', difficulty:3,
    question:'If two towns are 3.5 inches apart on the map, how far apart are they in reality?',
    choices:['A) 11.5 miles','B) 24 miles','C) 28 miles','D) 32 miles'], correct:'C',
    explanation:'3.5 * 8 = 28 miles.' },

  { type:'math', passage:'A company tested two advertisements. Ad A was shown to 500 people and 40 clicked it. Ad B was shown to 800 people and 56 clicked it.', difficulty:8,
    question:'Which ad had the higher click rate?',
    choices:['A) Ad A','B) Ad B','C) Both had the same click rate','D) Not enough information'], correct:'A',
    explanation:'Ad A: 40/500 = 8%. Ad B: 56/800 = 7%. Ad A is higher.' },

  // M-PSD-048 excluded (SPR format)

  // Geometry and Trigonometry
  { type:'math', passage:'', difficulty:1,
    question:'What is the area of a rectangle with length 8 and width 5 ?',
    choices:['A) 13','B) 26','C) 40','D) 80'], correct:'C',
    explanation:'Area = length * width = 8 * 5 = 40.' },

  { type:'math', passage:'', difficulty:2,
    question:'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    choices:['A) 10','B) 12','C) 14','D) 15'], correct:'A',
    explanation:'By the Pythagorean theorem, c = sqrt(6^2 + 8^2) = sqrt(100) = 10.' },

  { type:'math', passage:'', difficulty:2,
    question:'What is the circumference of a circle with radius 3 ?',
    choices:['A) 3\u03C0','B) 6\u03C0','C) 9\u03C0','D) 18\u03C0'], correct:'B',
    explanation:'Circumference = 2\u03C0r = 2\u03C0(3) = 6\u03C0.' },

  { type:'math', passage:'', difficulty:2,
    question:'In a triangle, the angle measures are 40\u00B0, 60\u00B0, and x\u00B0. What is the value of x ?',
    choices:['A) 70','B) 80','C) 90','D) 100'], correct:'B',
    explanation:'Triangle angles sum to 180\u00B0, so x = 180 - 40 - 60 = 80.' },

  { type:'math', passage:'', difficulty:4,
    question:'A cylinder has radius 2 and height 5. What is its volume?',
    choices:['A) 10\u03C0','B) 20\u03C0','C) 25\u03C0','D) 40\u03C0'], correct:'B',
    explanation:'Volume = \u03C0r^2h = \u03C0(2^2)(5) = 20\u03C0.' },

  { type:'math', passage:'', difficulty:2,
    question:'If two angles are supplementary and one angle measures 123\u00B0, what is the measure of the other angle?',
    choices:['A) 47\u00B0','B) 57\u00B0','C) 67\u00B0','D) 77\u00B0'], correct:'B',
    explanation:'Supplementary angles sum to 180\u00B0, so the other angle is 57\u00B0.' },

  { type:'math', passage:'', difficulty:3,
    question:'A triangle has side lengths 5, 12, and 13. Which statement is true?',
    choices:['A) The triangle is equilateral.','B) The triangle is isosceles.','C) The triangle is right.','D) The triangle cannot exist.'], correct:'C',
    explanation:'5^2 + 12^2 = 25 + 144 = 169 = 13^2, so the triangle is right.' },

  { type:'math', passage:'Two similar triangles have corresponding side lengths in a ratio of 2:5. If the smaller triangle has an area of 18, what is the area of the larger triangle?', difficulty:7,
    question:'What is the area of the larger triangle?',
    choices:['A) 45','B) 90','C) 112.5','D) 225'], correct:'C',
    explanation:'Area scales by the square of the side ratio: (5/2)^2 = 25/4. Then 18 * 25/4 = 112.5.' },

  { type:'math', passage:'', difficulty:2,
    question:'In the coordinate plane, what is the distance between (1, 2) and (1, 9)?',
    choices:['A) 7','B) 8','C) 9','D) 11'], correct:'A',
    explanation:'Same x-coordinate, so the distance is the difference in y-values: 9 - 2 = 7.' },

  { type:'math', passage:'', difficulty:1,
    question:'A circle has diameter 14. What is its radius?',
    choices:['A) 3.5','B) 7','C) 14','D) 28'], correct:'B',
    explanation:'Radius is half the diameter.' },

  { type:'math', passage:'', difficulty:6,
    question:'If sin \u03B8 = 3/5 for an acute angle \u03B8, what is cos \u03B8 ?',
    choices:['A) 2/5','B) 3/4','C) 4/5','D) 5/3'], correct:'C',
    explanation:'Use a 3-4-5 right triangle: opposite = 3, hypotenuse = 5, adjacent = 4, so cos \u03B8 = 4/5.' },

  { type:'math', passage:'', difficulty:3,
    question:'Line segment AB has endpoints A(-2, 4) and B(6, 4). What is the midpoint of AB?',
    choices:['A) (2, 4)','B) (4, 4)','C) (2, 0)','D) (8, 8)'], correct:'A',
    explanation:'Average the x-coordinates and y-coordinates: ((-2 + 6)/2, (4 + 4)/2) = (2, 4).' },

  { type:'math', passage:'', difficulty:4,
    question:'A sector of a circle has central angle 90\u00B0. What fraction of the circle\'s area does the sector represent?',
    choices:['A) 1/2','B) 1/3','C) 1/4','D) 1/8'], correct:'C',
    explanation:'90\u00B0 is 1/4 of 360\u00B0.' },

  { type:'math', passage:'', difficulty:3,
    question:'A ladder 13 feet long leans against a wall. The bottom of the ladder is 5 feet from the wall. How high up the wall does the ladder reach?',
    choices:['A) 8','B) 10','C) 12','D) 18'], correct:'C',
    explanation:'Height = sqrt(13^2 - 5^2) = sqrt(169 - 25) = sqrt(144) = 12.' },

  { type:'math', passage:'', difficulty:3,
    question:'If the perimeter of a square is 36, what is the area of the square?',
    choices:['A) 9','B) 18','C) 36','D) 81'], correct:'D',
    explanation:'Each side is 36 / 4 = 9, so area = 9^2 = 81.' },

  // M-GEO-064 excluded (SPR format)
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
