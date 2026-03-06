# @saurabhdaware/agent-toolkit (WIP 🚧 🏗️)

Working on open-sourcing my personal AI workflow as an agent-toolkit / plugin

## Setup

I would recommend installing these as global skills rather than project skills (unless everyone in your team prefers this workflow). The following command will prompt you to choose where you want to install the skills before installing

To install all skills --

```sh
npx skills add saurabhdaware/agent-toolkit --skill '*'
```

To select and install skills (few skills depend on other skills so they might not work as expected here) --

```sh
npx skills adds saurabhdaware/agent-toolkit
```

## Workflow

All skills in this repo (except `plan-and-execute` skill) have `disable-model-invocation: true` which means they can only be invoked with slash commands. This ensures your normal AI chat context is not polluted and skills don't randomly trigger when you don't need them.

| Skill name         | What it does                                                                                                                  | Invocation (when it is invoked)                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `plan-and-execute` | Enforces a plan-then-execute workflow for coding changes.<br>Requires explicit user approval on a proposed plan before edits. | Auto-applied for coding-related requests that require codebase changes. |
| `/yolo`            | Bypasses `plan-and-execute` for a single request.<br>Executes directly with minimal questions.                                | Invoked with `/yolo` slash command.                                     |
| `/review-ci`       | Reviews CI status of a GitHub Pull Request using `gh`.<br>Explains which checks are passing or failing and why.               | Invoked with `/review-ci` slash command.                                |
| `/review-ui`       | Reviews a web UI flow on a given URL.<br>Runs scenarios and reports whether flows work as expected.                           | Invoked with `/review-ui` slash command.                                |
| `/brainstorm`      | Facilitates open-ended idea generation and structured brainstorming.<br>Keeps discussion concise and focused on options.      | Invoked with `/brainstorm` slash command.                               |
| `/review-pr`       | Orchestrates an end-to-end PR review (code, CI, and UI when available).<br>Combines outputs from `review-ci` and `review-ui`. | Invoked with `/review-pr` slash command.                                |
| `/get-pr-comments` | Retrieves comments for a pull request in a clear, readable format.                                                            | Invoked with `/get-pr-comments` slash command.                          |

## Core Principles of My AI Workflow

P.S. I am using "Cursor" here but same thing applies to any AI agent tool you use - claude code, gemini-cli, etc

- **"Plan" as a default way responding** (even when you're not in the plan mode).
  - I am aware of the plan mode in Cursor which I continue to use to plan out larger features, although I also prefer cursor just letting me know what it is going to do before making any edits so that I can reiterate over the plan rather than reiterating over the applied changes. I don't want cursor to create large plan for every small change. This is a good balance.
  - So instead of "Prompt -> Cursor Executes -> Review the applied changes and reiterate over that", I prefer "Prompt -> Cursor plans and informs what it is going to execute -> Reiterate over the plan itself -> Apply changes in code"
- **/yolo for execeptions**
  - While the "plan-as-default" works nicely, sometimes I just want cursor to go and do changes (variables renames, simple prop additions, etc where I am certain cursor will do a good job)

These two skills are my core workflow. Other skills are mostly nice utilities for reviewing things, brainstorming on ideas, etc

## Release Checklist

### Skills

- [x] plan-and-execute
- [x] /yolo
- [x] /review-ci
- [x] /review-ui
- [x] /brainstorm
- [x] /review-pr
- [x] /get-pr-comments
- [ ] ~/feature~

### Hooks

- [ ] A cursor hook that makes your agent respond back?

### Plugin

- [ ] Expose this as a plugin?

### Testing

- [ ] Try these out for few days before releasing
