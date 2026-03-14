import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:8d968d0f9c1353487b56119a3ce4c884@shortline.proxy.rlwy.net:10360/satprep',
});

const updates = [
  // ── MATH: Advanced Math ──
  ['M-ADV-017', "Factor the equation: x² - 9 = 0 becomes (x - 3)(x + 3) = 0. Setting each factor equal to zero gives x = 3 or x = -3. Both values satisfy the original equation, so the answer is -3 and 3."],
  ['M-ADV-018', "This is a difference of squares pattern: (x + 4)(x - 4) = x² - 4² = x² - 16. The middle terms cancel because (+4x) and (-4x) sum to zero."],
  ['M-ADV-019', "To factor x² + 6x + 8, find two numbers that multiply to 8 and add to 6. Those numbers are 4 and 2, so x² + 6x + 8 = (x + 4)(x + 2)."],
  ['M-ADV-020', "In vertex form y = (x - h)² + k, the vertex is at the point (h, k). Here h = 3 and k = -5, so the vertex is (3, -5). The y-value of the vertex is -5."],
  ['M-ADV-021', "Rewrite 32 as a power of 2: 32 = 2⁵. Since 2^x = 2⁵, the exponents must be equal, so x = 5."],
  ['M-ADV-022', "Find the greatest common factor of 3x² and 12x. Both terms share a factor of 3x. Factoring it out: 3x² + 12x = 3x(x + 4). You can verify by distributing: 3x · x + 3x · 4 = 3x² + 12x."],
  ['M-ADV-023', "A product equals zero when at least one factor equals zero. Set x - 1 = 0 to get x = 1, and set x - 6 = 0 to get x = 6. Both values are zeros of g(x), so the answer is 1 and 6."],
  ['M-ADV-024', "Factor the quadratic: x² + 2x - 15 = 0. Find two numbers that multiply to -15 and add to 2: those are 5 and -3. So (x + 5)(x - 3) = 0, giving x = -5 or x = 3. Both are valid; choice C gives x = 3."],
  ['M-ADV-025', "Compare the growth rates: y = 7 is constant (no growth), y = x + 7 is linear (grows steadily), y = x² is quadratic (grows faster), and y = 2^x is exponential (doubles with each unit increase in x). Exponential functions always outpace polynomial functions for sufficiently large x."],
  ['M-ADV-026', "The square root symbol (√) asks: what positive number, when multiplied by itself, gives the value inside? Since 9 × 9 = 81, the principal square root of 81 is 9."],
  ['M-ADV-027', "Start with x + 1/x = 5 and square both sides: (x + 1/x)² = 25. Expanding the left side: x² + 2(x)(1/x) + 1/x² = x² + 2 + 1/x². So x² + 2 + 1/x² = 25, which means x² + 1/x² = 25 - 2 = 23."],
  ['M-ADV-028', "Test x = 4 in each equation. For choice B: x² - 16 = 4² - 16 = 16 - 16 = 0. This is true, so x = 4 is a solution to x² - 16 = 0. The other equations do not equal zero when x = 4."],
  ['M-ADV-029', "Substitute x = 2 into h(x) = x² - 4x + 7: h(2) = (2)² - 4(2) + 7 = 4 - 8 + 7 = 3."],
  ['M-ADV-030', "The population triples every hour, so after t hours: P = 4 × 3^t. At hour 3: P = 4 × 3³ = 4 × 27 = 108 bacteria."],
  ['M-ADV-031', "A perfect square trinomial has the form (x - a)² = x² - 2ax + a². Comparing x² - 6x + k with x² - 2ax + a²: 2a = 6, so a = 3 and k = a² = 9. Check: (x - 3)² = x² - 6x + 9."],

  // ── MATH: Algebra ──
  ['M-ALG-001', "Solve 3x + 5 = 20 by isolating x. Subtract 5 from both sides: 3x = 15. Divide both sides by 3: x = 5."],
  ['M-ALG-002', "Solve 2y - 7 = 17 by isolating y. Add 7 to both sides: 2y = 24. Divide both sides by 2: y = 12."],
  ['M-ALG-003', "Rewrite the equation in slope-intercept form (y = mx + b) by dividing both sides by 4: y = 3x - 2. The coefficient of x is the slope, so the slope is 3."],
  ['M-ALG-004', "Use the slope formula: m = (y₂ - y₁)/(x₂ - x₁) = (15 - 7)/(6 - 2) = 8/4 = 2."],
  ['M-ALG-005', "Substitute x = 4 into y = -2x + 9: y = -2(4) + 9 = -8 + 9 = 1."],
  ['M-ALG-006', "Add the two equations together: (2x + y) + (x - y) = 11 + 1, which gives 3x = 12, so x = 4. Substitute back: 4 - y = 1, so y = 3. The solution is (4, 3)."],
  ['M-ALG-007', "Solve 5x - 9 > 11. Add 9 to both sides: 5x > 20. Divide both sides by 5: x > 4."],
  ['M-ALG-008', "The total cost has two parts: a fixed starting fee of $4 plus a variable charge of $3 for each mile driven. This gives c = 3m + 4, where m is the number of miles."],
  ['M-ALG-009', "Let a = adult tickets sold. Student tickets sold = 120 - a. Set up the revenue equation: 10a + 6(120 - a) = 920. Distribute: 10a + 720 - 6a = 920. Simplify: 4a + 720 = 920. Subtract 720: 4a = 200. Divide by 4: a = 50 adult tickets."],
  ['M-ALG-010', "Shifting a graph up by 3 units means adding 3 to every y-value. Starting with y = 2x - 5, add 3: y = 2x - 5 + 3 = 2x - 2."],
  ['M-ALG-011', "Distribute the 4: 4(x - 3) = 4x - 12. The equation becomes 4x - 12 = 2x + 6. Subtract 2x from both sides: 2x - 12 = 6. Add 12 to both sides: 2x = 18. Divide by 2: x = 9."],
  ['M-ALG-012', "Set up the equation: total cost = monthly fee + cost per class × number of classes. So 78 = 18 + 12c. Subtract 18: 60 = 12c. Divide by 12: c = 5 classes."],
  ['M-ALG-013', "The x-intercept is the point where the line crosses the x-axis, meaning y = 0. Set y = 0 in y = 5 - x: 0 = 5 - x, so x = 5."],
  ['M-ALG-014', "From x + y = 7, express y = 7 - x. Substitute into the first equation: 3x + 2(7 - x) = 18. Distribute: 3x + 14 - 2x = 18. Simplify: x + 14 = 18, so x = 4."],
  ['M-ALG-015', "Substitute x = -2 into f(x) = 7 - 3x: f(-2) = 7 - 3(-2) = 7 - (-6) = 7 + 6 = 13. Remember that subtracting a negative is the same as adding."],

  // ── MATH: Geometry ──
  ['M-GEO-049', "The area of a rectangle is found by multiplying length × width. Here: Area = 8 × 5 = 40 square units."],
  ['M-GEO-050', "Use the Pythagorean theorem: c² = a² + b², where a and b are the legs and c is the hypotenuse. c² = 6² + 8² = 36 + 64 = 100. Taking the square root: c = √100 = 10."],
  ['M-GEO-051', "The circumference of a circle is C = 2πr, where r is the radius. With r = 3: C = 2π(3) = 6π."],
  ['M-GEO-052', "The three interior angles of any triangle sum to 180°. So 40° + 60° + x° = 180°. Solving: x = 180 - 40 - 60 = 80°."],
  ['M-GEO-053', "The volume of a cylinder is V = πr²h, where r is the radius and h is the height. V = π(2²)(5) = π(4)(5) = 20π cubic units."],
  ['M-GEO-054', "Supplementary angles are two angles that add up to 180°. If one angle is 123°, the other is 180° - 123° = 57°."],
  ['M-GEO-055', "Check if the Pythagorean theorem holds: does a² + b² = c²? Test 5² + 12² = 25 + 144 = 169, and 13² = 169. Since they're equal, the triangle is a right triangle."],
  ['M-GEO-056', "The area of similar figures scales by the square of the linear scale factor. The side ratio is 2:5, so the area ratio is (2/5)² = 4/25. If the smaller area is 18, then 18 = (4/25) × larger area. Larger area = 18 × (25/4) = 112.5."],
  ['M-GEO-057', "When two points share the same x-coordinate (both x = 1), the distance between them is simply the absolute difference of their y-coordinates: |9 - 2| = 7."],
  ['M-GEO-058', "The radius of a circle is exactly half its diameter. With diameter 14: radius = 14 ÷ 2 = 7."],
  ['M-GEO-059', "Use a 3-4-5 right triangle. If sin θ = opposite/hypotenuse = 3/5, then the opposite side is 3 and the hypotenuse is 5. By the Pythagorean theorem, the adjacent side is √(5² - 3²) = √(25 - 9) = √16 = 4. So cos θ = adjacent/hypotenuse = 4/5."],
  ['M-GEO-060', "The midpoint formula is ((x₁ + x₂)/2, (y₁ + y₂)/2). With A(-2, 4) and B(6, 4): midpoint = ((-2 + 6)/2, (4 + 4)/2) = (4/2, 8/2) = (2, 4)."],
  ['M-GEO-061', "A sector's area is proportional to its central angle. A 90° angle is 90/360 = 1/4 of a full circle, so the sector represents 1/4 of the circle's total area."],
  ['M-GEO-062', "The ladder, wall, and ground form a right triangle. The ladder is the hypotenuse (13 ft) and the distance from the wall is one leg (5 ft). Use the Pythagorean theorem: height² + 5² = 13². So height² = 169 - 25 = 144, and height = √144 = 12 feet."],
  ['M-GEO-063', "A square has 4 equal sides, so each side = perimeter ÷ 4 = 36 ÷ 4 = 9. The area of a square is side² = 9² = 81."],

  // ── MATH: Problem-Solving and Data Analysis ──
  ['M-PSD-033', "To find the unit rate (cost per notebook), divide the total cost by the number of notebooks: $9.00 ÷ 6 = $1.50 per notebook."],
  ['M-PSD-034', "Set up a proportion: 3 cups flour / 2 cups sugar = 9 cups flour / x cups sugar. Since 9 is 3 × 3, multiply the sugar by 3 as well: x = 2 × 3 = 6 cups of sugar."],
  ['M-PSD-035', "A 25% discount means the customer pays 75% of the original price. Calculate the discount: 25% of $80 = 0.25 × 80 = $20. Sale price = $80 - $20 = $60."],
  ['M-PSD-036', "Divide the number who preferred morning by the total surveyed: 86 ÷ 200 = 0.43. Convert to a percentage: 0.43 × 100 = 43%."],
  ['M-PSD-037', "First find the rate: 180 miles ÷ 3 hours = 60 miles per hour. Then multiply by the new time: 60 mph × 5 hours = 300 miles."],
  ['M-PSD-038', "To find the median of an odd number of values, arrange them in order and pick the middle one. The ordered list is 2, 4, 4, 5, 10. The middle (3rd) value is 4."],
  ['M-PSD-039', "The mean is the sum of all values divided by the count. Sum = 3 + 3 + 4 + 7 + 8 = 25. Count = 5. Mean = 25 ÷ 5 = 5."],
  ['M-PSD-040', "Probability = favorable outcomes ÷ total outcomes. There are 3 blue marbles out of 5 + 3 + 2 = 10 total marbles. Probability = 3/10."],
  ['M-PSD-041', "The ratio of boys to girls is 12:18. To simplify, find the greatest common factor of 12 and 18, which is 6. Divide both by 6: 12 ÷ 6 = 2 and 18 ÷ 6 = 3. Simplified ratio = 2:3."],
  ['M-PSD-042', "The plant grew from 18 cm to 24 cm, an increase of 6 cm. This growth occurred over 3 days (from day 1 to day 4). Average growth rate = 6 cm ÷ 3 days = 2 cm per day."],
  ['M-PSD-043', "The price increase is $276 - $240 = $36. Percent increase = (increase ÷ original) × 100 = (36 ÷ 240) × 100 = 15%."],
  ['M-PSD-044', "A strong positive linear association means that as one variable increases, the other tends to increase as well. This supports the statement that students who study more tend to earn higher quiz scores. Note: association does not prove causation."],
  ['M-PSD-045', "If weekend revenue ($2,400) is 20% greater than weekday revenue, then $2,400 = 1.20 × weekday revenue. Divide both sides by 1.20: weekday revenue = $2,400 ÷ 1.20 = $2,000."],
  ['M-PSD-046', "Use the map scale: 1 inch = 8 miles. Multiply the map distance by the scale: 3.5 inches × 8 miles/inch = 28 miles."],
  ['M-PSD-047', "Calculate each click rate: Ad A = 40 clicks ÷ 500 views = 0.08 = 8%. Ad B = 56 clicks ÷ 800 views = 0.07 = 7%. Since 8% > 7%, Ad A has the higher click rate."],

  // ── ENGLISH: Craft and Structure ──
  ['RW-C-015', "The examples of a 'sulking' instrument and a storm cloud 'marching in with theatrical confidence' show humorous, imaginative language. This is best described as 'lighthearted' — informal and fun, not competitive, uncertain, or careless."],
  ['RW-C-016', "The anecdote was moved to the end, where it now 'echoes' the argument. This means it serves as a conclusion that reinforces the essay's central claim, making it more memorable and cohesive."],
  ['RW-C-017', "Text 1 says residents 'avoid the main square' due to tourist crowds. Text 2 counters by listing ways residents still engage: volunteering, performing, and hosting gatherings. So the author of Text 2 would argue that residents remain involved in meaningful ways."],
  ['RW-C-018', "The writer compares fish to 'gardeners' by putting the word in quotation marks, signaling figurative rather than literal use. The fish trim algae the way gardeners trim plants — it's an analogy to a familiar job, not a claim that fish actually cultivate crops."],
  ['RW-C-019', "The phrase combines two ideas: 'revolution' implies significant, transformative change, while 'quiet' suggests these changes are happening without much fanfare or public attention. Together, the phrase means dramatic changes occurring under the radar."],
  ['RW-C-020', "The paragraph explains that tax records survived specifically because they were carved on durable stone rather than written on perishable materials. This context helps the reader understand why evidence from this particular kingdom is unusually complete and well-preserved."],
  ['RW-C-021', "Plants cannot literally 'choose' where to grow. The botanist is using personification — attributing a human action (choosing) to the fern — as a vivid way to describe where the plant naturally grows best."],
  ['RW-C-022', "Text 1 claims bike lanes will reduce traffic. Text 2 agrees they help cyclists but argues they won't substantially reduce traffic without also improving public transit. So Text 2 suggests Text 1 overlooks another key transportation factor."],
  ['RW-C-023', "The phrase 'stripped of ornament' is figurative. 'Stripped' means removed, and 'ornament' refers to decorative elements. Together, it means the later works have been reduced to simpler, more essential visual elements — less decoration, more directness."],
  ['RW-C-024', "A question at the end of a paragraph can serve as a transition, setting up the discussion that follows. Here, 'What would happen if...' invites the reader to consider a scenario that the next section will explore."],
  ['RW-C-025', "'Meticulous' means extremely careful and thorough. 'Plodding' means slow and boring. Describing the biography as 'meticulous without becoming plodding' means it is carefully researched yet remains engaging to read — detailed but not tedious."],
  ['RW-C-026', "The chef (Text 1) says follow recipes exactly because of food chemistry. The food writer (Text 2) says home cooks learn by improvising. These are contrasting perspectives on the same topic — whether cooking should be precise or flexible."],
  ['RW-C-027', "The article starts with a vivid, specific image (a crowded subway car) to draw the reader in, then transitions to broader statistical evidence about commute times. This structure moves from concrete example to general data, a common and effective pattern."],
  ['RW-C-028', "Calling the garden 'a classroom without walls' is a metaphor. It compares the garden to a classroom, emphasizing that students learn through hands-on outdoor experience — the garden teaches, just like a classroom does, but in an open-air setting."],

  // ── ENGLISH: Expression of Ideas ──
  ['RW-E-029', "The original sentence breaks parallel structure by switching from nouns ('walking trails, a community garden') to a clause ('there is also a playground'). Choice B fixes this by making all three items parallel nouns: 'walking trails, a community garden, and a playground.'"],
  ['RW-E-030', "The original sentence breaks parallel structure by switching from nouns ('walking trails, a community garden') to a clause ('there is also a playground'). Choice B fixes this by making all three items parallel nouns: 'walking trails, a community garden, and a playground.'"],
  ['RW-E-031', "The first sentence states a problem (decades of fading photographs), and the second describes the solution (a new chemical process). 'As a result' is the best transition because it signals a cause-and-effect relationship between the problem and its solution."],
  ['RW-E-032', "The goal is to introduce the theater and mention its reopening. Choice A efficiently combines key facts: the designer (Lina Perez), opening date (1928), and recent reopening (2024 after restoration). The other choices omit key information or distort the relationships."],
  ['RW-E-034', "The paragraph lists benefits of glass recycling (saving materials, reducing energy), and the final sentence describes cities expanding collection. 'For this reason' correctly signals that the expansion happened because of those benefits — a logical cause-and-effect flow."],
  ['RW-E-035', "The student wants to stress Jemison's breadth of accomplishments. Choice B does this by listing three roles (physician, engineer, astronaut) and two achievements (first Black woman in space, promoting science education), effectively showcasing her range."],
  ['RW-E-036', "The two sentences present a contrast: the telescope is small, yet it has powerful detection capability. 'Although' is the best connecting word because it highlights this unexpected contrast — despite its small size, it can detect distant planets."],
  ['RW-E-037', "The paragraph follows chronological order: summer → fall migration → spring migration. Since the new sentence is about something that happens during the spring northward journey, it belongs after (or as part of) the spring movement discussion."],
  ['RW-E-038', "Choice A uses an appositive phrase ('planted areas that absorb stormwater...') to define rain gardens within the same sentence. This is more concise and clear than the other options, which are awkward, redundant, or incomplete."],
  ['RW-E-039', "The three original sentences all describe features of the documentary. Choice A combines them into a clean, parallel series using the pattern: 'includes X, features Y, and uses Z.' This shows how the features work together as parts of one product."],
  ['RW-E-040', "The goal is to explain why the bridge mattered. Choice A connects the bridge to its practical impact: it linked the market to the train station, making travel and trade easier. This answers the 'why it mattered' question directly."],
  ['RW-E-041', "The first sentence describes little rain (a challenge), and the second describes plants that store water (a response). 'Even so' signals contrast: despite the harsh dry conditions, plants have evolved remarkable adaptations to survive."],
  ['RW-E-042', "The paragraph explains: blades turn → motion drives generator → electricity enters grid. The new sentence about stronger winds producing more electricity relates to blade movement, so it fits best after the sentence about blades turning."],
  ['RW-E-043', "A strong topic sentence introduces the paragraph's main idea broadly before specific examples or details follow. 'Across the country, volunteers are helping researchers collect useful environmental data' does exactly this — it states the topic clearly and sets up the examples that will follow."],

  // ── ENGLISH: Information and Ideas ──
  ['RW-I-005', "Text 1 worries that the audio guide might distract visitors from looking at art. Text 2 directly counters this concern by arguing the guide actually deepens observation by pointing out details visitors would otherwise miss. Text 2 refutes Text 1's concern."],
  ['RW-I-006', "The researcher explicitly states the study found an association, not causation. The correlation between biking and satisfaction could be because biking causes satisfaction, or because satisfied people tend to choose biking. The study can't distinguish between these possibilities."],
  ['RW-I-007', "Design C completed 1,140 charge cycles before declining — far more than A (820), B (790), or D (805). This clear gap in performance is the evidence supporting the engineers' conclusion about one design having substantially greater durability."],
  ['RW-I-008', "Maya Lin's Vietnam Memorial physically draws visitors below ground level and back up again. This architectural experience — using physical movement through space to shape emotional reflection — illustrates her belief that memorials can guide physical experience to influence thought."],
  ['RW-I-009', "The plant opens its pores at night instead of during the hot day, which reduces water loss. Since the plant lives in a desert (hot, dry climate), this nighttime pore-opening behavior is likely an evolutionary adaptation to conserve precious moisture."],
  ['RW-I-010', "The survey found 68% of hikers prefer printed maps — a clear majority compared to 24% for phone maps and 8% with no preference. This strong majority directly supports the author's argument that printed maps remain popular despite digital alternatives."],
  ['RW-I-011', "Economists predicted restaurants would disappear due to remote work, but instead, while lunch traffic fell, evening business grew as office districts added housing. This shows restaurants can adapt to shifts in when customers arrive, which the prediction overlooked."],
  ['RW-I-012', "Vera Rubin found that stars orbited faster than expected based on visible matter alone. This mismatch between observed orbital speeds and predictions from visible matter provided key evidence that additional unseen matter (dark matter) must exist in galaxies."],
  ['RW-I-013', "The text says critics first 'dismissed' Ortiz's use of street sounds, then 'praised' the same piece years later. This shows a clear shift from negative to positive reception — the critics' views became more favorable over time."],
  ['RW-I-014', "Plots with diverse native seeds supported more pollinators than plots with only a few grass species. This direct comparison provides the evidence: greater plant diversity led to greater pollinator diversity, supporting the argument for emphasizing diversity in restoration plans."],

  // ── ENGLISH: Standard English Conventions ──
  ['RW-S-044', "The sentence describes a completed action ('before beginning the analysis'), so the verb must be in past tense. 'Stored' is the simple past-tense form that correctly matches the past-tense context of the sentence."],
  ['RW-S-045', "With 'neither...nor' constructions, the verb agrees with the subject closer to it. The nearer subject is 'volunteer guides' (plural), so the verb must be plural: 'are.' Note: the sentence uses present tense (uncertain why), not past tense."],
  ['RW-S-046', "The second clause explains why the scientist reviewed the data carefully — she wanted to ensure accuracy. 'Because' is the subordinating conjunction that correctly introduces a reason or cause."],
  ['RW-S-047', "The phrase 'By the time the guests arrived' signals that one past action was completed before another past event. This requires the past perfect tense: 'had baked.' The chef completed baking before the guests' arrival."],
  ['RW-S-048', "When a conjunctive adverb (like 'moreover,' 'however,' 'therefore') follows a semicolon joining two independent clauses, it must be followed by a comma: '; moreover, ...' This is a standard punctuation rule for conjunctive adverbs."],
  ['RW-S-049', "The sentence needs a possessive pronoun: the work belongs to the inventors. 'Whose' is the possessive form of 'who.' Compare: 'who' = subject, 'whom' = object, 'whose' = possession."],
  ['RW-S-050', "'Lights' is a plural subject, so it requires a plural verb. 'Were' is the plural past-tense form of 'to be.' The singular 'was' would be incorrect here."],
  ['RW-S-051', "The ridge is a place, so the relative pronoun 'where' is correct. Use 'where' for places, 'when' for times, 'who/whom' for people, and 'which/that' for things."],
  ['RW-S-052', "The subject is 'A set,' which is singular even though 'maps' and 'tools' are plural. The phrase 'along with several navigation tools' is a parenthetical modifier — it does not change the subject's number. Therefore, the singular verb 'is' is correct."],
  ['RW-S-053', "Two independent clauses need proper joining. A comma alone would create a comma splice (error). A comma plus a coordinating conjunction ('but') correctly joins them. 'But' also signals the contrast between 'fascinating' and 'longer than expected.'"],
  ['RW-S-054', "The subject 'software update' is singular, and the sentence describes a completed past event. The passive voice construction requires 'was installed' — singular past tense to match the singular subject and past-tense context."],
  ['RW-S-055', "The sentence uses parallel structure with comparative adjectives: 'shorter reports, clearer graphics, and ___ recommendations.' To maintain parallelism, the blank needs a comparative adjective: 'more practical.' This matches the pattern of adjective + noun."],
  ['RW-S-056', "The subject is 'the outdoor concert' — singular. The intervening clause 'which had been planned for weeks' is a nonessential modifier and doesn't change the subject. The singular subject requires the singular verb 'was.'"],
  ['RW-S-057', "The sentence uses a parallel structure after 'more': 'more concise and ___.' Since 'concise' is an adjective, the parallel word must also be an adjective: 'persuasive.' An adverb ('persuasively') or noun ('persuasion') would break the parallel structure."],
];

async function run() {
  let updated = 0;
  let errors = 0;
  for (const [qid, explanation] of updates) {
    try {
      const r = await pool.query(
        'UPDATE questions SET explanation = $1 WHERE question_id = $2',
        [explanation, qid]
      );
      if (r.rowCount > 0) {
        updated++;
      } else {
        console.error(`[SKIP] ${qid} not found`);
      }
    } catch (err) {
      console.error(`[ERROR] ${qid}: ${err.message}`);
      errors++;
    }
  }
  console.log(`Done: ${updated} updated, ${errors} errors out of ${updates.length} total`);
  await pool.end();
}

run();
