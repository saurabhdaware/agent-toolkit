## Some Pre-requisites for CI Review

We need to make sure that the github cli is installed and authenticated

- `gh --version` to check if github cli is installed
- `gh auth status` to check if github cli is authenticated

### Installing GitHub CLI if not installed

Always ask for user's consent before installing github cli

#### For MacOS

```sh
brew install gh # to install
brew upgrade gh # to update CLI
```

#### For other operating systems

Find the relevant docs from - https://github.com/cli/cli?tab=readme-ov-file#installation

### Authenticating GitHub CLI

Always ask for user's consent before authenticating github CLI. Give user option of you running the command, user wanting to run the command on their own, or not moving forward and terminating the process here

```sh
gh auth login
```
