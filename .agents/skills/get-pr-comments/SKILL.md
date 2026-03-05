---
name: get-pr-comments
description: Retrieve comments for a pull request in a clear, readable format
disable-model-invocation: true
metadata:
  author: Saurabh Daware (https://srbh.dev)
  version: 0.0.1
---

## Arguments

- **PR_URL**: GitHub Pull Request URL (preferred)

Use AskQuestion to get PR URL / PR Number / Repository if not provided in prompt.

## Variables

Extract following variables from {{PR_URL}}. We'll use them ahead

- **REPO**: '{{owner}}/{{reponame}}'
- **PR_NUMBER**: {{number}}

E.g. in PR_URL: https://github.com/saurabhdaware/agent-toolkit/pull/123, REPO=saurabhdaware/agent-toolkit and PR_NUMBER=123

## Fetch Comments

You can use this command to fetch details of comments

```sh
# to get review comments
gh api repos/{{REPO}}/pulls/{{PR_NUMBER}}/comments --template '
[{{range $i, $c := .}}{{if $i}},{{end}}
  {
    "diff": "{{$c.diff_hunk}}",
    "user": "{{$c.user.login}}",
    "comment": "{{$c.body}}",
    "link": "{{$c.html_url}}"
  }
{{end}}]'

# to get general comments from the PR
gh api repos/{{REPO}}/issues/{{PR_NUMBER}}/comments --template '
[{{range $i, $c := .}}{{if $i}},{{end}}
  {
    "user": "{{$c.user.login}}",
    "comment": "{{$c.body}}",
    "link": "{{$c.html_url}}"
  }
{{end}}]'
```

Show the fetched comments in pretty and readable format to user with clickable link for each comment.

## Example

For `https://github.com/abelljs/abell/pull/190`, the following shell command can be used to fetch comments

```sh
gh api repos/abelljs/abell/pulls/190/comments --template '
[{{range $i, $c := .}}{{if $i}},{{end}}
  {
    "diff": "{{$c.diff_hunk}}",
    "user": "{{$c.user.login}}",
    "comment": "{{$c.body}}"
  }
{{end}}]'

gh api repos/abelljs/abell/issues/190/comments --template '
[{{range $i, $c := .}}{{if $i}},{{end}}
  {
    "user": "{{$c.user.login}}",
    "comment": "{{$c.body}}"
  }
{{end}}]'
```
