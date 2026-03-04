# @saurabhdaware/agent-toolkit (WIP 🚧 🏗️)

Working on open-sourcing my personal AI workflow as an agent-toolkit / plugin

## Setup

I would recommend installing these as global skills rather than project skills (unless everyone in your team prefers this workflow). The following command will prompt you to choose where you want to install the skills before installing

```sh
npx skills add saurabhdaware/agent-toolkit --skill '*'
```

All skills in this repo (except `plan-and-execute` skill) have `disable-model-invocation: true` which means they can only be invoked with slash commands. This ensures your normal AI chat context is not polluted and skills don't randomly trigger when you don't need them.

## Workflow

| Skill name         | What it does                                                                                                                  | Invocation (when it is invoked)                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `plan-and-execute` | Enforces a plan-then-execute workflow for coding changes.<br>Requires explicit user approval on a proposed plan before edits. | Auto-applied for coding-related requests that require codebase changes. |
| `/yolo`            | Bypasses `plan-and-execute` for a single request.<br>Executes directly with minimal questions.                                | Invoked with `/yolo` slash command.                                     |
| `/review-ci`       | Reviews CI status of a GitHub Pull Request using `gh`.<br>Explains which checks are passing or failing and why.               | Invoked with `/review-ci` slash command.                                |
| `/review-ui`       | Reviews a web UI flow on a given URL.<br>Runs scenarios and reports whether flows work as expected.                           | Invoked with `/review-ui` slash command.                                |
| `/brainstorm`      | Facilitates open-ended idea generation and structured brainstorming.<br>Keeps discussion concise and focused on options.      | Invoked with `/brainstorm` slash command.                               |
| `/review-pr`       | Orchestrates an end-to-end PR review (code, CI, and UI when available).<br>Combines outputs from `review-ci` and `review-ui`. | Invoked with `/review-pr` slash command.                                |

## Release Checklist

### Skills

- [x] plan-and-execute
- [x] /yolo
- [x] /review-ci
- [x] /review-ui
- [x] /brainstorm
- [x] /review-pr
- [ ] ~/feature~

### Hooks

- [ ] A cursor hook that makes your agent respond back?

### Plugin

- [ ] Expose this as a plugin?

### Testing

- [ ] Try these out for few days before releasing
