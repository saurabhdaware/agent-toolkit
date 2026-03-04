---
name: plan-and-execute
description: Enforces a plan-then-execute workflow for all user queries; first present a "## Plan" section with high-level steps and illustrative code snippets, then request explicit approval via the AskQuestion tool before running tools or making code changes.
---

Always auto-apply this skill for all coding-related requests that require a change in the codebase.

1. First respond with a markdown "## Plan" section outlining the main steps and any key code snippets. Prefer less text and more code snippets, tables, diagrams, emojis, etc.
2. After presenting the plan in chat, use the AskQuestion tool to ask the user to approve, reject, or modify the plan.
3. Only proceed with implementation work and further tool calls after the user explicitly approves the plan.
