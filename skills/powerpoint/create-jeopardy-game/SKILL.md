---
name: create-jeopardy-game
description: "Create an editable Jeopardy-style classroom review game in PowerPoint from educator-provided categories, clues, responses, and values. Build a linked game board, reveal categories and values, click-to-reveal responses, and one randomly placed hidden Daily Double. Use when asked to make a Jeopardy game, quiz board, classroom review game, category-and-value game, or Daily Double activity."
---

# Create Jeopardy-Style Game

Create a classroom quiz game from educator-provided content. Use native PowerPoint shapes, hyperlinks, and trigger animations so the game remains an editable `.pptx` without VBA or macros. Preserve the presentation's Slide Master, layouts, theme colors, and theme fonts.

Do not use the official Jeopardy! logo, theme music, set design, or other branded assets. Label the deck with the educator's lesson or review title and use an original classroom visual treatment.

## Gather Game Input

1. Determine the game title, subject, grade or learner level, and learning objective.
2. Obtain three to six category names and three to five clues per category. For every clue, require:
   - Clue text
   - Correct response
   - Point value
   - Optional accepted variants or educator note
3. Use the educator's supplied value progression. If none is supplied, propose a consistent progression such as `100, 200, 300, 400, 500` and confirm it before building.
4. Keep the educator's wording and factual intent. If asked to draft clues from supplied source material, use only facts supported by that material. Flag ambiguous answers rather than inventing certainty.
5. Ask whether the educator wants categories and values revealed progressively at the start. Default to category headers first, then all value tiles.
6. Ask for any categories, values, or clues that must be eligible or ineligible for the Daily Double. By default, exclude the lowest-value row and select from all remaining complete clues.
7. Use one Daily Double unless the educator explicitly requests a different count.
8. If required clue content is missing, identify the missing cells and stop before building the deck. Do not silently fill factual gaps.

## Plan the Deck

Use this slide structure:

1. Optional title and rules slide
2. Main game-board slide
3. One clue slide for each board tile
4. Optional final challenge slide when requested
5. Optional answer key or facilitator notes slide

Keep the main board as the navigation hub. Every value tile links to exactly one clue slide. Every clue slide has a visible `Return to board` control linked to the main board.

PowerPoint does not provide reliable runtime randomness, persistent nonlinear game state, or automatic score calculation without code. Randomly choose the Daily Double while building the deck, then keep its location hidden from players until they open that clue. Do not claim that its location changes each time the slide show runs.

## Build the Game Board

1. Create a stable grid with one column per category and one row per value. Use equal column widths and equal row heights.
2. Put each category in a concise header that fits without shrinking below a readable classroom size. Wrap long category names to two lines when needed.
3. Put one large point value in every tile. Make each complete tile a generous click target and link it to its matching clue slide.
4. Use descriptive Selection Pane names such as `BOARD - Ecosystems - 300` and `CLUE - Ecosystems - 300`.
5. Keep category headers and value tiles visually distinct. Do not rely on color alone to communicate category, value, used state, or Daily Double status.
6. If progressive board reveal is requested:
   - Hide category headers initially and reveal them together or one at a time with `Appear` or a short `Fade`.
   - Reveal value tiles after the category headers.
   - Keep the sequence brief and avoid decorative motion.
7. Do not mark the Daily Double tile on the board or expose it in visible labels, speaker notes shown to students, alt text, or Selection Pane names.
8. Add a small, visible game title and optional round label without crowding the board.

## Build Standard Clue Slides

For each non-Daily-Double clue:

1. Show the category and point value in a consistent header.
2. Place the clue text prominently with enough space for classroom viewing. Keep it hidden until the educator clicks a visible `Reveal clue` control when a staged reveal is requested; otherwise show it on slide entry.
3. Add a visible `Reveal response` control.
4. Keep the correct response hidden initially. Reveal it with an `Appear` or short `Fade` triggered only by the `Reveal response` control.
5. Include accepted variants or educator notes in a smaller facilitator area or speaker notes, not in the student-facing response unless requested.
6. Add a visible `Return to board` control. Make navigation controls consistent in position, wording, and size across all clue slides.
7. Do not advance automatically. The educator controls clue reveal, response reveal, and return navigation.

## Place the Hidden Daily Double

1. Build a list of eligible clue cells after applying the educator's exclusions and confirming that each cell has complete content.
2. Randomly select one eligible cell during deck creation. Do not always choose the same category, value, or slide position.
3. Record the selected category and value only in the final build report or a facilitator-only answer key when the educator requests it. Keep the game board itself unmarked.
4. On the selected clue slide, show a `Daily Double` announcement before displaying the clue.
5. Add a clear wager prompt such as `Choose your wager before revealing the clue.` Do not calculate or enforce the wager in PowerPoint.
6. Add a visible `Reveal clue` control that hides the announcement or reveals the clue beneath it.
7. After the clue appears, use the same click-triggered `Reveal response` and `Return to board` controls as other clue slides.
8. Keep the Daily Double announcement accessible through visible text. Sound may accompany it only when requested and must never be the only signal.

## Used Tiles and Scoring

- Native PowerPoint cannot reliably preserve a used-tile state across arbitrary board-to-clue-to-board navigation in every playback environment without VBA.
- Apply the presentation's followed-hyperlink color to linked value text only when it provides a clear, tested used-state cue in the educator's PowerPoint version. Do not depend on it without Slide Show validation.
- If followed-link state is unreliable, include a facilitator checklist or instruct the educator to track used clues separately. Do not create a branching duplicate-board system that grows exponentially.
- Add static team-name and score placeholders only when requested. Explain that score updates are manual; do not imply that PowerPoint will add or subtract points automatically.
- Never use VBA, macros, add-ins, external web apps, or embedded game executables for tile tracking, randomization, or scoring.

## Optional Final Challenge

When requested:

1. Add a category reveal, wager prompt, clue reveal, and response reveal in that order.
2. Use educator-provided final-category, clue, response, and timing content.
3. If a countdown is requested, apply the `create-countdown-timer` skill using native shapes, Motion Path animation, and Animation Pane duration.
4. Keep wagering and score calculation manual.

## Accessibility and Teaching Quality

- Use large, high-contrast text that remains readable from the back of a classroom.
- Keep clues concise enough to read before discussion time begins. Preserve essential qualifiers and source wording.
- Add descriptive alt text to the board, navigation controls, Daily Double announcement, and any instructional images.
- Use consistent reading order and keyboard order: header, clue, reveal control, response, return control.
- Make all interactive controls visible and large enough for touch or imprecise pointer use.
- Do not use color, sound, or animation as the only way to identify a state or outcome.
- Avoid flashing effects, rapid motion, gradients, 3D text, and crowded decorative elements.
- Put citations or source notes in speaker notes or a facilitator answer key when required.

## Validation

Test the complete game in Slide Show mode from the beginning.

1. Confirm every category and value matches the educator's input.
2. Confirm the optional opening sequence reveals categories before values and leaves the complete board visible.
3. Open every value tile and confirm it links to the correct category, clue, response, and point value.
4. Confirm every response is hidden initially and only its own `Reveal response` control reveals it.
5. Confirm every `Return to board` control returns to the main board.
6. Confirm exactly one eligible clue contains the Daily Double unless another count was explicitly requested.
7. Confirm no visible board element exposes the Daily Double location before selection.
8. Confirm the Daily Double sequence requires a wager before clue reveal, then allows response reveal.
9. Confirm used-tile behavior in the target PowerPoint playback environment. If it is not reliable, report the facilitator-checklist fallback.
10. Confirm no text is clipped or too small and no control overlaps another clickable area.
11. Confirm keyboard order, contrast, alt text, and touch-target size.
12. Confirm the deck contains no VBA, macros, add-ins, external game dependencies, official Jeopardy! assets, or unsupported automatic-scoring claims.
13. Report the category count, clue count, value scheme, Daily Double eligibility rules, randomly selected Daily Double location for the educator, reveal mode, used-tile method, and any missing content or PowerPoint limitations.
