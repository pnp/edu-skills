# EDU Skills

A community library of reusable Copilot skills for teaching, learning, and education operations.

## Skill Library

Skills are organized by the Microsoft 365 product where the workflow runs:

- [Excel](skills/excel/) - 2 skills for scheduling and calendar planning
- [PowerPoint](skills/powerpoint/) - 11 skills for instruction, review, and presentation design
- [SharePoint](skills/sharepoint/) - 3 skills for assignment submission workflows

Each skill has a `SKILL.md` file with its trigger phrases, required inputs, workflow, safety guidance, and validation steps. Some skills also include reusable references or sample data.

## Contribute

You do not need to be a developer to contribute. Start with a recurring education workflow and a clear definition of a useful result.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Copy the template under `skills/_template/` into the appropriate product folder.
3. Use a specific kebab-case folder name matching the `name` in `SKILL.md`.
4. Test with fictional, de-identified, or contributor-owned content.
5. Open a pull request describing the workflow and test result.

## Validate

Requires Node.js 22 or later.

```powershell
npm install
npm run check
```

Automated validation checks package naming and required `SKILL.md` frontmatter. Maintainer review also covers usefulness, privacy, accessibility, responsible AI, and instructional quality.

## Status

EDU Skills is an early community project. Review and test skills before using them with school data or production workflows.
