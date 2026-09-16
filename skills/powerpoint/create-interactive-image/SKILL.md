---
name: create-interactive-image
description: "Create an interactive image on the current PowerPoint slide using educator-defined hotspots. Add accessible markers and click-triggered text or image callouts, or optional hover ScreenTips for short text. Use when asked to annotate a diagram, make an image interactive, add hotspots, create an image exploration, or explain parts of an image during Slide Show."
---

# Create Interactive Image

Turn an image on the current slide into a guided exploration. Use native PowerPoint shapes, links, and trigger animations so the result remains a portable `.pptx` without macros.

## Interaction Modes

Use Click reveal by default. It supports a title, explanatory text, and an optional supporting image on the current slide.

Use **Hover text** only when the user explicitly requests hover behavior. PowerPoint mouse-over ScreenTips support short text, not a rich text-and-image card, and do not work well for touch, keyboard, or self-paced accessibility.

If trigger animation cannot be created reliably, use **Linked detail slides**: duplicate the current slide for each hotspot, add the callout on the duplicate, link the hotspot to that slide, and add a visible Back button.

## Hotspot Input

1. Work only on the current slide unless the user approves linked detail slides.
2. Identify the main image. If several images exist and none is selected, ask which image to use.
3. Treat selected shapes placed over the image as hotspot regions. The educator can draw rectangles, ovals, or freeform shapes over each region before running the skill.
4. Use each shape's visible text or Selection Pane name as its label. Recommend names such as `HOTSPOT 01 - Aortic valve`.
5. If no hotspot shapes are selected or clearly named, stop and ask the educator to draw and select them. Do not guess medically, historically, geographically, or scientifically meaningful regions from image pixels.
6. For every hotspot, obtain a short title, two to four concise explanatory bullets, and an optional supporting image. Use supplied slide content, speaker notes, or user-provided facts. Never invent instructional content.

## Build: Click Reveal

For each hotspot:

1. Keep the educator's region shape as the hit target. Give it a solid fill with 99% transparency and no outline; a fully transparent or no-fill shape may not capture interaction reliably.
2. Add a small visible numbered marker at the hotspot edge. Use a high-contrast circle, a number, and a minimum practical hit area. Do not rely on an invisible region as the only indication that the slide is interactive.
3. Add a compact callout panel beside the image or in unused slide space. Include the matching number, title, explanatory bullets, and optional supporting image. Do not cover the hotspot being explained.
4. Match the presentation theme and current slide layout. Keep the image dominant, use one consistent callout position when possible, and avoid decorative redesign.
5. Group each panel's background, text, image, and Close control when PowerPoint permits the trigger to target the group reliably.
6. Add an Appear or short Fade entrance effect to the panel, triggered by clicking its hotspot shape. The panel must be hidden when the slide opens.
7. Add a visible Close control inside the panel and an exit effect triggered by that control. Use a familiar X icon with accessible text such as `Close Aortic valve information`.
8. If several panels share the same position, verify that each can be opened and closed independently. Do not leave multiple panels stacked visibly.

## Build: Hover Text

For each hotspot:

1. Keep a visible numbered marker and a 99%-transparent hit target over the region.
2. Add a standard shape hyperlink with a concise ScreenTip containing the hotspot title and no more than one short explanatory sentence. If PowerPoint requires a destination, link to the current slide. Warn that clicking a self-link may restart the slide, so do not combine this mode with an important on-slide animation sequence.
3. Do not add a rich image panel and call it hover behavior. If text plus an image is required, switch to Click reveal or Linked detail slides.
4. Add the same information in speaker notes or a visible legend so touch, keyboard, exported PDF, and non-Slide-Show audiences are not blocked.

## Accessibility and Teaching Quality

- Add descriptive alt text to the main image, every visible marker, each supporting image, and every Close or Back control.
- Keep markers visible and keyboard-orderable. Use numbered markers and a matching legend when the slide has more than three hotspots.
- Do not encode meaning by color alone. Keep marker contrast readable against the image.
- Keep hotspot regions large enough to select without precise pointer control and avoid overlapping hit targets.
- Use plain language appropriate to the stated learner age. Preserve uncertainty and source wording for sensitive or technical topics.
- Put source links or citations in speaker notes when the instructional content or supporting images require attribution.

## Validation

Test the completed slide in Slide Show mode, not only in edit view.

1. Confirm the slide opens with all click-reveal panels hidden.
2. Activate every marker and its surrounding hit target.
3. Confirm each marker opens only its own panel and each Close control hides it.
4. Confirm no panel, image, or control is clipped, overlapped, or outside the slide.
5. Confirm hotspots still align with the image after grouping or resizing.
6. Confirm all visible markers remain readable over the image and the tab order is logical.
7. For Hover text, confirm every ScreenTip appears during Slide Show and that equivalent information remains available without hover.
8. Report the interaction mode used, hotspots created, any fallback detail slides, and any content still needed.
