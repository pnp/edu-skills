---
name: create-school-calendar
description: Create an editable school calendar in Excel from educator- or administrator-provided dates. Use when asked to build a school calendar, academic calendar, class calendar, testing calendar, grading-period calendar, school events calendar, monthly school calendar, or yearly school calendar with holidays, professional development, conferences, deadlines, testing, and events.
---

# Create School Calendar

Create a clear, editable school calendar from supplied dates. Keep one structured source table for all events and build calendar views from that table so dates can be corrected or extended without reconstructing the workbook.

## When to Use

- The user wants a monthly or academic-year school calendar.
- The user provides dates for holidays, grading periods, testing, professional development, conferences, school events, or deadlines.
- The user wants an existing school-date list organized into a calendar.

## When Not to Use

- Do not use this skill for student schedules, room scheduling, staff coverage, or bell schedules.
- Do not use it for a plain chronological list when the user does not want a calendar view.

## Gather the Inputs

Identify:

- School, class, program, or calendar title
- Calendar month, year, school year, or date range
- Week start: Sunday or Monday
- Event dates and names
- Optional end dates, categories, and notes
- Requested view: monthly or academic year

Use the dates in the prompt, selected range, workbook, or attached source. Never invent district holidays, closures, testing windows, grading dates, conference dates, or deadlines. If a date is missing or ambiguous, preserve the event in the source table with a clear `Needs date` note and exclude it from the calendar grid until confirmed.

Defaults:

- Create a monthly view for the current month when no range is supplied.
- Use Sunday as the first day of the week unless the workbook, locale, or user indicates Monday.
- Use the workbook's existing date display convention when it is clear; otherwise use an unambiguous format such as `mmm d, yyyy` in the source table.

## Create the School Dates Table

Create or update a worksheet named `School Dates` with an Excel table named `SchoolDates`. Use these columns:

1. `Start Date`
2. `End Date`
3. `Event`
4. `Category`
5. `Notes`

Rules:

- Store real Excel date values, not text that merely looks like a date.
- Use the same date in `Start Date` and `End Date` for a one-day event.
- Preserve multi-day events as one table row with both dates.
- Keep event names concise and retain supplied wording when it carries official meaning.
- Leave optional fields blank rather than fabricating details.
- Do not include student names, attendance records, disability information, grades, or other personal data.
- Sort by `Start Date`, then `Event`, unless the user requests another order.
- Apply table filters, freeze the header row, use readable column widths, and enable a consistent table style.

Suggested categories are `Holiday / No School`, `Professional Development`, `Testing`, `Grading Period`, `Conference`, `School Event`, and `Deadline`. Use only categories supported by the supplied events. Preserve the user's category names when provided.

## Build the Monthly Calendar

Create or update a worksheet named `School Calendar`.

1. Add the calendar title and visible month and year.
2. Add seven weekday headers in the requested order.
3. Create a six-week by seven-day grid so every month fits without changing the layout.
4. Place each date on the correct weekday. Leave cells outside the month visually subdued and free of event text.
5. Show event names on their applicable dates. For a multi-day event, show it on each included date or use a concise continuation label when space is limited.
6. If several events share a date, list each on a separate line. Do not silently omit events.
7. Keep the full event record in `SchoolDates` when the grid needs an abbreviated display label.
8. Shade weekends subtly and highlight today's date only when the displayed month includes today.
9. Add a small category legend only for categories present in the displayed view.

Use formulas linked to `SchoolDates` when the Excel host supports the required functions reliably. Otherwise write the current calendar values and state in the completion report that the view must be refreshed after source-table edits.

## Make the Monthly Calendar Print on One Page

The default monthly calendar must print cleanly on exactly one physical page.

1. Set the print area to the calendar title, weekday headers, six-week grid, and category legend only. Do not include the `SchoolDates` source table or unused rows and columns.
2. Use landscape orientation.
3. Use the workbook or locale's standard paper size when available, typically Letter or A4. Do not silently switch to oversized paper.
4. Set scaling to `1 page wide by 1 page tall` for the monthly calendar print area.
5. Use narrow or custom margins that leave enough printable space without placing content inside the printer's non-printable region.
6. Center the calendar horizontally on the printed page. Center vertically only when it improves balance without reducing readability.
7. Size the seven day columns evenly and set stable row heights for the title, weekday headers, and six calendar weeks.
8. Keep all date numbers and event labels readable at the one-page scale. Shorten only calendar display labels when necessary and retain full event text in `SchoolDates`.
9. Remove accidental manual page breaks inside the monthly calendar print area.
10. Check Print Preview. The result must show exactly one page with no clipped title, weekday, date, event, legend, border, or continuation text.

If the supplied event volume cannot fit legibly on one page, do not shrink the text below a readable size. Keep the one-page calendar as a concise overview and add a separate printable `Event Details` sheet sourced from `SchoolDates`. Report that fallback.

## Optional Academic-Year View

Create an academic-year view only when requested or when the supplied range spans several months.

- Use one compact month block per month in chronological order.
- Include the school-year title and covered date range.
- Keep the same week-start rule and category treatment across all month blocks.
- Make month blocks identical in size so the layout remains aligned.
- Use concise event labels; retain complete details in `SchoolDates`.
- Give each month its own one-page print area. Use one worksheet per month when that is the most reliable way to print each month on a separate page.
- Add page breaks so no month block splits across two printed pages.

If the requested range would make labels unreadable, create one worksheet per month instead of shrinking text excessively.

## Formatting

- Preserve an established workbook theme when present.
- Use a restrained school-appropriate palette with strong contrast.
- Pair category colors with text labels. Never communicate event type by color alone.
- Use bold weekday headers, thin grid borders, and enough row height for event labels.
- Wrap event text and align date numbers consistently.
- Avoid merged cells in the working grid. Prefer `Center Across Selection` for a title when available.
- Keep formulas, source data, and labels editable. Do not paste the calendar as an image.
- Keep optional headers and footers inside the printable area and concise enough that they do not force the calendar onto a second page.

## Rerun Safety

1. Inspect the workbook before changing it.
2. Reuse the existing `SchoolDates` table and calendar sheets when they belong to this skill.
3. Preserve user-added event rows and confirmed edits.
4. Before rebuilding a calendar block, clear and unmerge only that owned output range. Do not clear unrelated worksheet content.
5. Do not create duplicate worksheets, duplicate tables, duplicate events, or repeated legends on rerun.
6. Match potential duplicate events using start date, end date, and event name. Ask before replacing records when supplied values conflict.
7. Never overwrite an unrelated sheet named `School Dates` or `School Calendar`; create a clearly numbered alternative and report the conflict.

## Validation

1. Confirm every supplied event appears exactly once in `SchoolDates` with the correct start date, end date, name, category, and notes.
2. Confirm all stored dates are valid Excel dates and that end dates are not earlier than start dates.
3. Confirm every calendar date is placed under the correct weekday for the selected month and week-start convention.
4. Confirm each dated event appears on every applicable calendar day and no unsupported event was added.
5. Confirm events outside the displayed range remain in `SchoolDates` but do not appear in the current calendar view.
6. Confirm no supplied events are hidden because of cell size, clipping, filtering, or overlapping objects.
7. Confirm category labels and colors are consistent and understandable without color.
8. Open Print Preview and confirm each monthly calendar prints on exactly one page in landscape orientation using the intended Letter or A4 paper size.
9. Confirm the print area excludes unused cells and source data, scaling is `1 page wide by 1 page tall`, and no title, weekday, date, event, legend, border, or continuation text is clipped.
10. Confirm the one-page output remains readable. If an `Event Details` fallback was required, confirm it has its own print area and does not alter the calendar's one-page output.
11. Confirm title, month, school-year range, date formats, and print settings match the request or reported defaults.
12. Confirm rerunning the skill does not duplicate sheets, tables, events, formatting, print areas, or page breaks.
13. Report the source used, calendar range, week-start convention, paper size, one-page Print Preview result, event count, categories, view type, formula or static refresh mode, Event Details fallback, assumptions, date conflicts, and events still needing dates.