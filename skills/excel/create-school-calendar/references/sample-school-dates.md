# Sample School Dates

This is fictional test data for the `@create-school-calendar` Excel skill. It does not represent a real school or district calendar.

| Start Date | End Date | Event | Category | Notes |
|---|---|---|---|---|
| 2026-09-01 | 2026-09-01 | First Day of School | School Event | Welcome schedule |
| 2026-09-04 | 2026-09-04 | Schoolwide Welcome Assembly | School Event | 9:00 AM in the gym |
| 2026-09-07 | 2026-09-07 | School Closed - Labor Day | Holiday / No School | No classes |
| 2026-09-09 | 2026-09-09 | Back-to-School Night | Conference | 6:00 PM to 7:30 PM |
| 2026-09-14 | 2026-09-18 | Fall Benchmark Testing | Testing | Morning testing window |
| 2026-09-18 | 2026-09-18 | Student Activities Fair | School Event | During lunch periods |
| 2026-09-21 | 2026-09-21 | Professional Development Day | Professional Development | No classes for students |
| 2026-09-25 | 2026-09-25 | Progress Report Deadline | Deadline | Grades due by 4:00 PM |
| 2026-09-29 | 2026-09-29 | Family-Teacher Conferences | Conference | 4:00 PM to 7:00 PM |
| 2026-10-02 | 2026-10-02 | Fall Community Night | School Event | 5:30 PM to 7:30 PM |
| 2026-10-12 | 2026-10-12 | School Closed | Holiday / No School | No classes |
| 2026-10-19 | 2026-10-23 | Fall Break | Holiday / No School | School offices closed |
| 2026-10-27 | 2026-10-27 | Picture Retake Day | School Event | During advisory |
| 2026-10-30 | 2026-10-30 | End of First Grading Period | Grading Period | Final day of grading period |
|  |  | Winter Concert Date to Be Confirmed | School Event | Needs date |

## Test Prompt

Copy the table above into an Excel worksheet, select it, and send this prompt:

> @create-school-calendar Create a printable school calendar from the selected dates. Start with September 2026, use Sunday as the first day of the week, and make the monthly calendar print clearly on exactly one landscape page. Keep the full event list in the School Dates table. Do not invent a date for the winter concert.

## What to Check

- September 1 appears on Tuesday.
- Fall Benchmark Testing appears from September 14 through September 18.
- September 18 shows both Fall Benchmark Testing and Student Activities Fair.
- The undated winter concert remains in `SchoolDates` and does not appear on the calendar.
- Print Preview shows one landscape page with no clipped dates, events, or legend.
