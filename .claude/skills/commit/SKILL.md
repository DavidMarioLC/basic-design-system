---
name: commit
description: Create git commits following Conventional Commits conventions. Use whenever the user asks to commit, "haz un commit", "commitea esto", or similar — for this project or any other.
---

# Commit conventions

Delegate every commit to the `Agent` tool with `model: "haiku"` (`subagent_type: "general-purpose"`), run in the foreground (`run_in_background: false`) since the result — the commit outcome — is needed before responding to the user. Committing is mechanical enough not to need a larger model.

Build the agent prompt from the template below, filling in the working directory. Do not run `git` commands directly for this task; let the subagent do it.

## Agent prompt template

```
Create a git commit in <cwd> following Conventional Commits (https://www.conventionalcommits.org/):

<type>(<scope opcional>): <descripción corta en imperativo, minúscula, sin punto final>

<cuerpo opcional: explica el "por qué", no el "qué">

Types: feat (new user-facing feature/component), fix (bug fix), style (visual/CSS-only
change with no behavior change — common in this design-system repo), docs (DESIGN.md,
CLAUDE.md, README, comments), refactor, chore (tooling/config), test.

Rules:
- Subject line <= 72 chars, imperative mood ("add", not "added"/"adds"), no trailing period.
- Body only when the "why" isn't obvious from the diff; wrap at ~72 chars.
- One logical change per commit; don't bundle unrelated edits — if the diff mixes
  unrelated changes, ask before splitting into multiple commits.
- Only stage what belongs to this change, by filename — never `git add -A` / `git add .`.
- Never force-push, never --no-verify, never --amend unless explicitly told to.
- End the commit message with:
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

Workflow:
1. Run `git status`, `git diff` (staged + unstaged), and `git log --oneline -10` in
   parallel to gather context.
2. If the directory is not a git repository, stop and report that back — do not run
   `git init` yourself.
3. Pick the right `type` from what actually changed.
4. Stage only the relevant files by name.
5. Commit via heredoc with the message above.
6. Run `git status` after to confirm success, then report the commit hash and subject line back.
```

## After the agent returns

Relay the agent's result to the user: the commit hash, subject line, and any files it flagged as needing a separate commit or as blocked (e.g. not a git repo yet). If it reports the directory isn't a git repository, offer to run `git init` before retrying — don't do it silently.
