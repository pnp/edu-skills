# Contributing to EDU Skills

Contributions can begin with a finished skill or a well-defined education workflow. Please do not include student records, customer data, credentials, private tenant details, or copyrighted instructional materials you cannot redistribute.

## Add a skill

1. Create a branch named `skill/<skill-name>`.
2. Copy `skills/_template/skill-template` into the appropriate product category: `skills/excel/`, `skills/powerpoint/`, or `skills/sharepoint/`.
3. Rename the folder using lowercase kebab-case, such as `create-reading-log`.
4. Update `SKILL.md`. Its frontmatter `name` must exactly match the folder name.
5. Add optional supporting files under `references/` or `assets/` only when the skill needs them at runtime.
6. Run `npm run check`.
7. Open a pull request using the repository template.

## Skill standards

Each skill must:

- Solve one focused education workflow.
- State when it should and should not be used.
- Use clear trigger phrases in its frontmatter description.
- Identify required inputs and avoid inventing missing school facts.
- Describe an editable output and how to validate it.
- Include privacy, accessibility, and human-review guidance where relevant.
- Use fictional, de-identified, or contributor-owned sample data.

## Required structure

```text
skills/
|-- excel/
|   `-- <skill-name>/
|       |-- SKILL.md
|       |-- references/   # optional runtime guidance or sample data
|       `-- assets/       # optional images or supporting files
|-- powerpoint/
|   `-- <skill-name>/
|       `-- SKILL.md
`-- sharepoint/
    `-- <skill-name>/
        |-- SKILL.md
        |-- references/   # optional runtime guidance or sample data
        `-- assets/       # optional images or supporting files
```

## Optional gallery metadata

Add `catalog.json` beside `SKILL.md` only when the generated defaults are not enough. The supported fields are:

```json
{
    "title": "Create a reading log",
    "description": "Turn a class reading list into a review-ready tracking workbook.",
    "category": "Teaching & Learning",
    "audiences": ["Educator"],
    "icon": "book",
    "prompt": "@create-reading-log Build a reading log from this list.",
    "updated": "2026-09-16",
    "featured": false,
    "media": {
        "type": "image",
        "src": "assets/preview.png",
        "alt": "Reading log workbook with title, status, and reflection columns",
        "caption": "Example output using fictional class data."
    }
}
```

Use one of these categories: `Teaching & Learning`, `Data & Insights`, `Planning & Operations`, `Communication`, or `Accessibility`. Media may use `image`, `gif`, or `video`. Store local media inside the skill folder; remote media must use HTTPS. Every media item needs meaningful `alt` text. Video also requires a `poster` image. Keep previews brief, readable without audio, free of personal data, and small enough for a web page.

## Review

Maintainers review usefulness, instruction quality, privacy, accessibility, responsible AI, and whether the validation steps are credible. A passing automated check does not replace human review.

By contributing, you confirm that the submitted material can be stored and shared in this repository.