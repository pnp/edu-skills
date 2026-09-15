---
name: fill-education-onepager
description: "Use when I ask Copilot in PowerPoint to fill out, draft, or populate an Education OnePager from a Markdown file. Read the provided .md content, map it into the open EDU OnePager template, preserve the template's Slide Master and layouts, and identify any information still needed. Triggers include 'fill this OnePager,' 'create an EDU OnePager from this markdown,' and 'populate the OnePager template.'"
---

# Fill Education OnePager

Populate the open Education OnePager template using a Markdown file supplied or referenced by the user. This is a quick feature overview for investment decisions, not a product specification.

## Workflow

1. Confirm that the open presentation is the Education OnePager template and that a Markdown source is available. If no source is available, ask the user to attach or link one.
2. Read the full Markdown file before editing. Use only facts supported by that file or explicitly provided by the user. Do not infer owners, dates, costs, metrics, classifications, dependencies, or commitments.
3. Map the source into the existing template:
   - Instructions: do not place feature content on this slide. Keep it while drafting and offer to remove it before final sharing.
   - Feature Name: feature title.
   - Description: concise explanation of what the feature is.
   - Why should we do this feature?: business goal and reason to invest.
   - Customer / Partner Needs: customer problem, evidence, or partner need.
   - Illustration (optional): short About text and a supplied screenshot or image.
   - User Stories: concise role-based scenarios, preferably "As a [role], I want [action], so that [outcome]."
   - Success Criteria: measurable business and customer outcomes, including targets only when sourced.
   - Priority Information: engineering cost, CoGS/GPU impact, deployment target, release alignment, release vehicle/event, product owner, GEM, Design, GPM, external/internal dependencies, one best-fit strategy pillar with rationale, and applicable prioritization fields.
   - Extra Context (optional): competitor, partner, and research evidence.
4. Preserve the template's Slide Master, assigned layouts, placeholders, theme colors, theme fonts, spacing, and slide order. Replace instructional examples and placeholder text; do not redesign the deck or create a new theme.
5. Keep text concise enough for its existing placeholder. Prefer short bullets and plain language. Do not shrink text below the template's readable size merely to fit more content.
6. Apply these template rules:
   - Express engineering cost as people over time, such as "2 eng for 3 months," when available.
   - Select only one strategy pillar: Deliver AI Enhanced Learning, Deliver AI Foundation, or Secure our market advantage.
   - Complete only Priority Information fields that apply.
   - Delete Illustration and Extra Context slides when the source has no useful content for them, after confirming with the user.
   - Remove the Instructions slide only when the user confirms the deck is ready for sharing.
7. For missing required information, use `[TBD]` and provide one consolidated list of questions. Never fabricate content.
8. After filling the deck, review every edited slide for overflow, overlap, clipped text, empty placeholders, unsupported claims, and inconsistent formatting. Report slides completed, optional slides removed or retained, `[TBD]` fields, and any manual follow-up needed.

## Priority Information Layout

Treat Priority Information as a fixed-layout form, not a freeform text slide.

- Populate the existing table cells and placeholders individually. Do not add text boxes, recreate the table, merge cells, move dividers, or repeat a field label inside its value cell.
- Put only the value in compact header fields. For example, use `Preview Q3; GA by June` rather than `TARGET RELEASE DATE: Preview Q3; GA by June`.
- Keep names on one line when possible. Separate multiple confirmed owners with commas; do not include role labels in the value.
- Keep Eng Cost, CoGS & GPU, Deployment, Release, and each dependency cell to short phrases or bullets. Move rationale and implementation detail to Extra Context. If a list will not fit, show the most decision-relevant items followed by `See Extra Context`.
- In Strategy Pillar Alignment, place `Yes` on exactly one row and `No` on the other rows. Put one short rationale only in the selected row's Why alignment cell.
- In Prioritization, place only `Yes`, `No`, `N/A`, a sourced value, or `[TBD]` in the answer column. Put a single short sentence in the justification column.
- Preserve the template's font sizes, cell margins, alignment, row heights, and column widths. Shorten wording before considering any font reduction.
- After population, inspect the full slide at fit-to-window. No content may cross a cell boundary, overlap a divider, wrap into an adjacent field, or extend below the slide. If it does, compress the wording or move detail to Extra Context and check again.
