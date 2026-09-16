---
name: create-countdown-timer
description: "Create a native animated countdown timer in PowerPoint using shapes, a motion path, and Animation Pane duration to show time progressing from a specified duration to zero. Use when asked to add a timer, countdown, classroom timer, activity timer, quiz timer, discussion timer, or timed break to the current slide."
---

# Create Countdown Timer

Add a clear classroom countdown timer to the current PowerPoint slide. Preserve the presentation theme and build the countdown entirely with native shapes and the Animation Pane timeline. Never use VBA, macros, embedded video, animated GIFs, add-ins, or external web timers.

## Gather Timer Settings

1. Work on the current slide unless the educator asks for a dedicated timer slide.
2. Determine the requested duration. Accept formats such as `30 seconds`, `2 minutes`, `5:00`, or `01:30`.
3. If no duration is supplied, ask for it before building the timer. Do not guess.
4. Confirm or infer these optional settings from the request:
   - Start automatically when the slide opens or click to start
   - Compact corner timer or large full-slide timer
   - Linear progress timer or circular timer
   - Silent finish or a brief educator-approved sound
   - Final message, defaulting to `Time's up`
5. Normalize durations under one hour to `MM:SS`. Use `HH:MM:SS` only when explicitly requested.

## Plan the Animation Timeline

PowerPoint does not have a native live countdown field, and a motion path cannot rewrite numeric text as it moves. Use a motion-path visual countdown by default so the timer needs only a few editable shapes rather than one shape per second.

- Use a linear progress timer by default: one marker travels from the labeled start time to `00:00` along a straight motion path.
- Use a circular timer when requested: one marker travels around a circular Shapes motion path and a visible `00:00` state appears at completion.
- Set the motion-path animation Duration to the requested countdown length. Use a constant speed with Smooth start and Smooth end disabled.
- If the current PowerPoint version will not accept the full duration in one effect, split the same route into consecutive motion-path segments whose lengths are proportional to their durations. Keep the segment endpoints touching so the marker does not jump.
- Use an exact changing `MM:SS` display only when the educator explicitly requests changing digits. Explain that native PowerPoint then requires one timestamp shape and Animation Pane entry per second.
- Never substitute media, VBA, or an external timer.

## Build the Motion-Path Countdown

1. Preserve the current Slide Master, assigned layout, theme colors, theme fonts, margins, and existing content.
2. Place the timer in unused space. Use a compact top corner by default, or a centered large display on a dedicated timer slide.
3. Create a simple timer container with sufficient contrast and fixed dimensions.
4. For a linear timer, add a track with the normalized starting duration at one end and `00:00` at the other. Add intermediate tick marks only when they help learners estimate remaining time.
5. Add one high-contrast marker shape at the starting end. Apply a straight motion path that ends precisely at the zero end of the track.
6. For a circular timer, add a simple ring, put the normalized starting duration in the center, and place one high-contrast marker at the top. Apply a circular Shapes motion path aligned precisely to the ring.
7. In the Animation Pane, set the marker motion to the requested total duration, constant speed, no auto-reverse, no repeat, and no rewind at end.
8. For automatic start, set the motion path to `With Previous`. For click-to-start behavior, add a visible Start control and trigger the motion path from that control.
9. Add a static `00:00` text shape and final message. Keep them hidden initially, then reveal both with `Appear` or a short `Fade` immediately after the final motion-path segment.
10. If a finish sound is requested, use one brief, non-startling sound at zero. Always pair it with the visible final message.
11. Keep the track, labels, ring, and controls editable. Group static elements when practical, but keep the moving marker separate so its path remains reliable.

## Optional Exact-Digits Mode

Use this mode only when the educator explicitly requires a number that changes every second.

1. Create one editable text shape for every whole-second value, including zero.
2. Align and stack all timestamp shapes in the same fixed container, with the starting value on top and `00:00` at the bottom.
3. Add a `Disappear` exit animation to every value except `00:00`, ordered from the starting value to `00:01`.
4. Set every exit to a one-second interval in the Animation Pane so each disappearance exposes the next value.
5. Warn before building long exact-digits timers: a five-minute timer requires 301 timestamp shapes and 300 exit animations. Recommend motion-path mode unless changing digits are essential.

## Optional Controls

- Add a visible Restart control only when a reliable self-link to the current slide can restart the animation in Slide Show mode. Test it before reporting success.
- Pause and Resume controls are unsupported and must not be added.
- Never use VBA.
- Never use macros.
- Never use add-ins.
- Never use embedded video.
- Never use animated GIFs.
- Never use external web timers.
- Do not imply that clicking elsewhere on the slide pauses the timer.

## Visual and Teaching Quality

- Make the visual progress and the start-to-zero direction immediately understandable.
- Use tabular or monospaced numerals when available in the existing theme so digits do not shift horizontally.
- Keep the timer readable from the back of a classroom. Use at least 24 pt for a corner timer and substantially larger text for a dedicated timer slide.
- Use restrained color. A final-ten-seconds emphasis may change the border, background, or label, but must not rely on color alone.
- Do not flash the timer or change colors every second.
- Avoid gradients, 3D effects, decorative motion, and unnecessary icons.
- Do not cover instructions, answer choices, captions, or other lesson content.

## Accessibility

- Add alt text to the timer container stating the configured duration and finish behavior, for example: `Two-minute countdown timer ending with a visible Time's up message.`
- Keep the start value, zero label, and track or ring visible in edit view and static exports so the configured duration is understandable without animation.
- Use sufficient text and background contrast.
- Pair any finish sound with visible text. Never use sound as the only completion signal.
- Keep Start and Restart controls in a logical reading order and give them descriptive accessible names.
- Respect reduced-motion needs by offering a static duration label or milestone progress timer when requested.

## Validation

Test the timer in Slide Show mode from the beginning of the slide.

1. Confirm the displayed start value matches the requested duration.
2. Confirm the timer starts using the requested automatic or selected behavior.
3. Confirm the marker follows the intended path smoothly at constant speed, with no jump between segmented paths.
4. Confirm the marker reaches the zero endpoint and the zero state appears after the requested duration, allowing no more than one second of playback variance.
5. Confirm `00:00` and the final message remain visible after completion.
6. Confirm the timer does not loop.
7. Confirm any Start or Restart control works in Slide Show mode and does not trigger unrelated slide animations.
8. Confirm existing slide content remains readable and interactive.
9. Confirm the timer remains understandable in edit view and when exported to PDF.
10. For exact-digits mode, sample the sequence and confirm values decrease by one second with no duplicates, skipped values, overlap, or ghosted digits.
11. Report the duration, linear or circular layout, motion-path segments, start behavior, finish behavior, object count, exact-digits mode if used, and any PowerPoint limitations.
