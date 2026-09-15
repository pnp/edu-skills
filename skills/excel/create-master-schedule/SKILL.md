---
name: create-master-schedule
description: Build, review, and improve an editable school master schedule in Excel from supplied teachers, courses, sections, rooms, periods, availability, and scheduling constraints. Use for K-12 master schedules, teacher schedules, room schedules, section schedules, bell-schedule planning, conflict checks, section balancing, locked placements, and comparing schedule scenarios.
---

# Create Master Schedule

Build an editable school master-scheduling workbook from supplied data. Keep inputs, constraints, placements, conflicts, and summary measures in separate structured tables so an administrator can understand every decision and revise the schedule without starting over.

This skill supports schedule planning and constraint checking in Excel. It does not claim to reproduce a dedicated optimization engine or guarantee that a feasible or globally optimal schedule exists. Report unresolved conflicts and unscheduled sections plainly.

For fictional end-to-end tests, use:

- [references/sample-k8-master-schedule.md](references/sample-k8-master-schedule.md) for a compact mixed K-8 example.
- [references/sample-us-middle-school.md](references/sample-us-middle-school.md) for a complete seven-period Grades 6-8 example.

## When to Use

- The user wants a K-12 master schedule, teacher schedule, room schedule, or section schedule.
- The user needs to place course sections into periods, assign teachers or rooms, or coordinate specialists across grades.
- The user wants to detect double bookings, availability violations, room conflicts, capacity issues, or unplaced sections.
- The user wants to compare or revise schedule scenarios without rebuilding the workbook.

## When Not to Use

- Do not use this skill for a monthly school-events calendar.
- Do not use it for individual student timetable assignment unless student requests and enrollment data are explicitly provided and appropriate to use.
- Do not present the workbook as a substitute for the school's SIS, bargaining rules, legal review, accessibility review, or administrator approval.

## Start With Scope

Determine the scheduling model from the prompt, selection, workbook, or attached source:

- `K-5 Homeroom`: homerooms stay together while specialists, rooms, lunch, recess, and services rotate.
- `6-8 Team / Section`: student sections move among subject teachers, with shared specialists and cross-grade constraints.
- `9-12 Course Request`: sections are driven by course requests, teacher assignments, rooms, prerequisites, and student conflicts.
- `Mixed K-8`: elementary homerooms and middle-school sections share staff, rooms, and common periods.

If the model is unclear, infer the narrowest model supported by the supplied data and record the assumption. Do not invent teachers, courses, rooms, bell times, student requests, staffing assignments, or availability.

Identify:

- School and academic year
- Cycle days and terms: daily, A/B, rotating cycle, quarter, semester, or year
- Bell periods with start and end times
- Teachers and availability
- Courses or activities and required meeting frequency
- Sections, grade or cohort, expected enrollment, and preferred or assigned teacher
- Rooms, room type, and capacity
- Hard constraints that must never be violated
- Soft preferences that should be satisfied when possible
- Existing placements that must remain locked
- Requested outputs and print views

If required information is absent, create the input tables and a `Needs Input` list. Do not manufacture a completed schedule.

## Workbook Structure

Create or update these worksheets and Excel tables:

1. `Setup` with school, year, model, cycle, terms, and scheduling assumptions.
2. `Periods` with table `SchedulePeriods`.
3. `Teachers` with table `ScheduleTeachers`.
4. `Rooms` with table `ScheduleRooms`.
5. `Sections` with table `ScheduleSections`.
6. `Constraints` with table `ScheduleConstraints`.
7. `Master Schedule` with table `MasterSchedule`.
8. `Conflict Report` with table `ScheduleConflicts`.
9. `Schedule Summary` with quality measures and coverage counts.

Add `Student Requests` with table `StudentRequests` only when the user supplies appropriate student-level request data. Add `Build Comparison` with table `ScheduleBuilds` when the user asks to compare scenarios.

Use real Excel tables, dates, times, numbers, and Boolean values. Do not store structured inputs as a collection of decorative ranges.

## Define the Input Tables

### SchedulePeriods

Use these columns:

- `Period ID`
- `Cycle Day`
- `Period Name`
- `Start Time`
- `End Time`
- `Term`
- `Instructional`
- `Notes`

Each schedulable time must have a unique combination of cycle day, period, and term. Store start and end times as Excel time values.

### ScheduleTeachers

Use these columns:

- `Teacher ID`
- `Teacher Name`
- `Department / Team`
- `Max Sections`
- `Max Consecutive Periods`
- `Minimum Prep Periods`
- `Available Periods`
- `Preferred Periods`
- `Unavailable Periods`
- `Qualified Courses`
- `Notes`

Use stable fictional or school-provided identifiers. Keep availability expressions consistent and document their syntax on `Setup`.

### ScheduleRooms

Use these columns:

- `Room ID`
- `Room Name`
- `Room Type`
- `Capacity`
- `Available Periods`
- `Unavailable Periods`
- `Features`
- `Notes`

### ScheduleSections

Use these columns:

- `Section ID`
- `Course / Activity`
- `Grade / Cohort`
- `Term`
- `Meetings per Cycle`
- `Duration in Periods`
- `Expected Enrollment`
- `Minimum Size`
- `Target Size`
- `Maximum Size`
- `Assigned Teacher ID`
- `Preferred Teacher IDs`
- `Required Room Type`
- `Linked Section IDs`
- `Concurrent Section IDs`
- `Priority`
- `Locked`
- `Notes`

Use one row per section or activity to schedule. Represent singleton, doubleton, and multi-section courses through the number of section rows and their course names; do not encode them only in prose.

### ScheduleConstraints

Use these columns:

- `Constraint ID`
- `Constraint Type`
- `Applies To Type`
- `Applies To ID`
- `Related ID`
- `Cycle Day`
- `Period ID`
- `Term`
- `Hard or Soft`
- `Weight`
- `Rule`
- `Source`
- `Active`
- `Notes`

Supported constraint types include:

- Teacher availability or preference
- Room availability, type, feature, or capacity
- Period exclusion or preference
- Required or prohibited concurrency
- Required separation or spacing
- Linked back-to-back sections
- Shared teacher, room, specialist, cohort, or equipment
- Lunch, recess, prep, duty, intervention, or service block
- Maximum consecutive teaching periods
- Minimum teacher prep periods
- Section-size target
- Locked placement
- Course priority

Classify each rule as `Hard` or `Soft`. Hard rules determine feasibility. Soft rules influence schedule quality. Never silently weaken a hard constraint to complete a build.

## Build the Master Schedule Table

Use these columns in `MasterSchedule`:

- `Build ID`
- `Section ID`
- `Course / Activity`
- `Grade / Cohort`
- `Teacher ID`
- `Teacher Name`
- `Room ID`
- `Cycle Day`
- `Period ID`
- `Period Name`
- `Start Time`
- `End Time`
- `Term`
- `Meeting Number`
- `Expected Enrollment`
- `Room Capacity`
- `Locked`
- `Placement Status`
- `Hard Conflict Count`
- `Soft Penalty`
- `Notes`

Create one row per scheduled meeting. A section meeting spanning multiple periods must occupy and validate every included period.

Use data validation lists for teacher, room, cycle-day, period, term, status, and lock fields where practical. Use formulas or refreshable checks to derive names, times, capacities, conflict counts, and penalties from the source tables.

## Schedule in a Controlled Order

When the user asks the skill to produce a candidate schedule:

1. Preserve all valid locked placements.
2. Validate locked placements first. Report any locked hard conflict instead of moving it silently.
3. Place the most constrained sections first, considering fewest available teachers, rooms, or periods; required concurrency; linked blocks; duration; and course priority.
4. Place shared specialists, singleton courses, labs, intervention blocks, lunch, recess, and other scarce resources before flexible sections.
5. For each candidate placement, reject any option that violates a hard constraint.
6. Among feasible options, prefer the lowest soft penalty and better section, teacher-load, and room-use balance.
7. Keep deterministic tie-breaking: priority, section ID, cycle day, then period ID. The same unchanged input should produce the same initial build.
8. Leave a section or meeting `Unscheduled` when no feasible placement exists. Record the blocking constraints and best next actions.
9. Do not change input assignments, capacities, availability, or hard rules merely to make the schedule complete.

When the workbook environment cannot perform reliable iterative placement, create the tables, formulas, conflict audit, and recommended placement order, then label the build `Planning Draft`. Do not imply that an optimization run occurred.

## Detect Conflicts

Populate `ScheduleConflicts` with one row per distinct issue. Use these columns:

- `Build ID`
- `Conflict ID`
- `Severity`
- `Conflict Type`
- `Cycle Day`
- `Period ID`
- `Term`
- `Primary ID`
- `Related ID`
- `Section ID`
- `Description`
- `Source Constraint ID`
- `Suggested Action`
- `Status`

At minimum, test for:

- Teacher double booking
- Room double booking
- Cohort or section double booking
- Teacher unavailable or unqualified
- Room unavailable, wrong type, missing feature, or below capacity
- Period or term exclusion
- Missing required linked or concurrent placement
- Prohibited concurrency
- Incomplete meeting frequency
- Invalid multi-period duration
- Teacher load above maximum
- Teacher prep below minimum
- Consecutive-period limit exceeded
- Section below minimum or above maximum size
- Locked placement violating a hard rule
- Missing teacher, room, period, or required input
- Unscheduled section or meeting

Use `Blocking`, `Hard`, `Soft`, and `Information` severities. A build is `Feasible` only when blocking and hard conflict counts are zero and every required meeting is scheduled.

## Score and Compare Builds

On `Schedule Summary`, show at least:

- Required meetings
- Scheduled meetings
- Unscheduled meetings
- Course or activity coverage percentage
- Blocking conflicts
- Hard conflicts
- Soft conflicts
- Teacher double bookings
- Room double bookings
- Capacity violations
- Teacher load range
- Section-size range and variance when enrollment is supplied
- Soft preference satisfaction percentage
- Locked placements retained
- Build status

Use a transparent score, not a black-box claim. Default to:

`Quality Score = 100 - Hard Penalty - Soft Penalty - Unscheduled Penalty`

Set a large fixed penalty for every blocking or hard conflict and every required unscheduled meeting so an infeasible build cannot outrank a feasible one. List all weights on `Setup` and let the user change them. Never call the highest score `optimal`; call it the `Highest-scoring reviewed build`.

For comparisons, preserve each candidate under a unique `Build ID`. Do not overwrite a prior build unless the user explicitly asks. Compare feasibility first, then coverage, hard conflicts, soft score, balance, and administrator notes.

## Create Review Views

Create readable matrix views from `MasterSchedule` when requested:

- `By Teacher`: periods down rows and cycle days across columns, one block per teacher.
- `By Room`: periods down rows and cycle days across columns, one block per room.
- `By Grade / Cohort`: periods down rows and cycle days across columns.
- `By Period`: all assigned sections grouped by cycle day, period, and term.
- `Unscheduled`: every missing meeting with its blocking reasons.

Views must be derived from the canonical tables. Keep full identifiers available even when display labels are shortened.

## Formatting and Printing

- Preserve an established workbook theme when present.
- Freeze table headers and keep filters enabled.
- Use conditional formatting for blocking, hard, soft, locked, and unscheduled states, paired with text labels.
- Avoid merged cells in working tables and matrix bodies.
- Keep input cells visually distinct from formulas without relying on color alone.
- Set print areas only for intentional review views, not raw input sheets.
- Print teacher, room, grade, and conflict views with repeated headers, landscape orientation when needed, sensible page breaks, and readable scaling.
- Do not force a full-school master schedule onto one unreadable page. Fit each review block to one page wide and as many pages tall as necessary.

## Privacy and Data Handling

- Prefer section, cohort, and aggregate enrollment data.
- Do not add student names, disability information, behavior records, grades, or other sensitive student data unless the user explicitly supplies an approved source and the task requires it.
- When student requests are supplied, minimize displayed identifiers and keep request-level data off printable staff schedules unless requested.
- Never infer protected characteristics, special-education status, or services from course names or notes.

## Rerun Safety

1. Inspect the workbook before making changes.
2. Reuse skill-owned sheets and tables when present.
3. Preserve user edits, active constraints, locks, and named builds.
4. Add or update rows by stable IDs; do not duplicate teachers, rooms, periods, sections, constraints, placements, conflicts, or builds.
5. Never clear an unrelated sheet that happens to use a similar name. Create a numbered alternative and report the naming conflict.
6. Recalculate conflicts and summary measures after every placement change.
7. Ask before replacing a prior build. Default to creating a new `Build ID`.

## Validation

1. Confirm every referenced teacher, room, period, section, term, and constraint ID exists in its source table.
2. Confirm period times are valid and end after start.
3. Confirm section meeting counts and multi-period durations match `ScheduleSections`.
4. Confirm locked placements remain unchanged or are clearly reported as invalid.
5. Confirm every hard and soft constraint is either evaluated or listed as unsupported; never silently skip one.
6. Confirm teacher, room, cohort, availability, qualification, capacity, concurrency, spacing, load, prep, and locked-placement checks are complete.
7. Confirm each conflict row identifies the affected resource, time, source rule, and suggested action.
8. Confirm `Feasible` appears only when all required meetings are scheduled and blocking and hard conflicts equal zero.
9. Confirm quality weights and formulas are visible and an infeasible build cannot outrank a feasible build.
10. Confirm review views agree with `MasterSchedule` and do not hide simultaneous assignments.
11. Confirm print areas, repeated headers, orientation, page breaks, and scaling are readable in Print Preview.
12. Confirm rerunning the skill preserves source data, locks, prior builds, and user edits without duplicating records.
13. Report the scheduling model, cycle, term structure, source data used, build ID, required and scheduled meetings, feasibility, unresolved conflicts, unscheduled sections, locked placements, score weights, unsupported rules, assumptions, and recommended next actions.
