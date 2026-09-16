---
name: export-latest-assignment-submissions
description: Prepares the latest submitted version of every student's work for one assignment. Use when an educator asks to export, collect, or download assignment submissions.
---

# Export Latest Assignment Submissions

## Purpose

Prepare one SharePoint folder containing the latest submitted version of each student's work for a selected assignment. The educator can download that prepared folder from SharePoint as a ZIP file.

This skill copies files into an export folder. It never changes the Assignments-managed source folders or creates a ZIP file itself.

## When to Use

Use this skill when an educator asks to:

- Export or download all submissions for an assignment.
- Collect the latest submission from each student.
- Prepare assignment submissions for offline review.
- Create a download folder for submitted student work.

## When Not to Use

- Do not use it to collect files students are still editing in `Working files`.
- Do not use it to export every submission version or submission history.
- Do not use it to grade, score, compare, summarize, or evaluate student work.
- Do not use it to move, rename, delete, or edit files in `Student Work`.
- Do not claim that the skill creates a ZIP archive. SharePoint creates the ZIP when the educator downloads the prepared folder.

## SharePoint Folder Model

Assignments stores submitted work in this structure:

```text
Student Work/
`-- Submitted files/
    `-- <Student Name>/
        `-- <Assignment Name>/
            |-- Version 1/
            |   `-- <submitted files>
            |-- Version 2/
            |   `-- <submitted files>
            `-- ...
```

For each student and assignment, the latest submission is the valid `Version N` folder with the highest numeric value of `N`. Do not use folder modified dates or file modified dates to determine the latest version.

## Required Inputs

- The current SharePoint site containing the Assignments-managed `Student Work` library.
- The assignment to export.
- Optional export destination. Default to a `Submission Exports` folder in the site's `Documents` library when that location exists and the educator can write to it.

If the assignment is not explicit from the request or current folder context, inspect the assignment folder names available under `Submitted files/<Student Name>/`, present a distinct list, and ask the educator which assignment to export. Do not guess based on a partial name.

## Instructions

### 1. Resolve the source and assignment

1. Work only within the current SharePoint site and only with content the educator can already access.
2. Locate `Student Work/Submitted files`.
3. If the source cannot be found, stop and explain what is missing. Do not substitute `Working files` or another library.
4. Resolve one assignment name from the educator's request, current context, or explicit selection.
5. If more than one assignment matches, show the matches and ask the educator to select one.

### 2. Find each student's latest submitted version

1. Inspect every student folder under `Submitted files`.
2. For the selected assignment, inspect folders whose names follow `Version N`, where `N` is a positive integer.
3. Select the folder with the highest numeric `N` for that student.
4. Include all files and subfolders within that selected version while preserving their relative structure.
5. Ignore earlier valid versions.
6. Do not treat a malformed version name as a valid submission. Record it as an exception.
7. Record students who have no folder for the assignment, no valid version folder, an empty latest version, or content that cannot be read.

A failure for one student must not stop inspection of the remaining students.

### 3. Preview the export

Before copying anything, show a concise preview containing:

- Selected assignment.
- Number of student folders inspected.
- Number of students with a latest submission.
- Total files to copy.
- Latest version selected for each included student.
- Students and folders that will be excluded, with the reason.
- Proposed export destination and folder name.

Ask the educator to confirm before creating folders or copying files.

### 4. Prepare the export folder

After confirmation:

1. Resolve the requested export destination. If none was provided, use `Documents/Submission Exports` when available and writable; otherwise ask for a destination.
2. Create a new export folder named `<Assignment Name> - Latest submissions - <YYYY-MM-DD HHmm>`.
3. Never create the export folder inside `Student Work`.
4. Create one subfolder per included student.
5. Copy the contents of that student's selected latest version into the student subfolder.
6. Preserve original filenames and any subfolder structure inside the selected version.
7. Never overwrite an existing file or merge into an earlier export. If the proposed folder already exists, create a uniquely named new folder.
8. Continue with the remaining students if one copy fails. Retry a transient failure once, then record the failure.

The prepared structure must be:

```text
Submission Exports/
`-- <Assignment Name> - Latest submissions - <YYYY-MM-DD HHmm>/
    |-- <Student Name>/
    |   `-- <latest submitted files>
    `-- ...
```

### 5. Verify and report

1. Compare the files successfully copied with the preview inventory.
2. Do not report success for a student unless every intended file for that student was copied.
3. Return the export folder link, students exported, files copied, selected version numbers, and every skipped or failed item.
4. Tell the educator to select the prepared folder in SharePoint and choose **Download**. SharePoint will download the folder as a ZIP file.
5. Remind the educator that the export contains student work and should be stored and shared according to school policy.

## Safety and Review

- Treat student names and submitted work as sensitive education data.
- Do not send content to external systems or create external links.
- Do not expose one student's work to another student.
- Do not alter permissions on source or export content.
- Do not infer whether a missing submission is late, excused, or incomplete.
- Do not inspect or summarize document contents beyond what is required to copy the submitted files.
- Require confirmation immediately before the copy operation.

## Validation

Before finishing, confirm that:

1. Exactly one assignment was selected.
2. Every included student was sourced from `Submitted files`, never `Working files`.
3. Each included student used the highest numeric `Version N` folder.
4. No earlier version was copied.
5. The export folder is outside `Student Work`.
6. The copied file count matches the verified successful copies.
7. Every omission or failure is reported plainly.
8. The response describes SharePoint Download as the ZIP-producing step.