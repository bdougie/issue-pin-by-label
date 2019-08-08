<h3 align="center">Pin an issue by label Action</h3>
<p align="center">A GitHub Action that pins an issue using labels.<p>

## Usage

This GitHub Action pins an issue based on a specified label. 


## Setup

Create a environment vairable for storing the `LABEL_NAME`

```
workflow "pin issue based on label" {
  on = "issues"
  resolves = ["pin an issue"]
}

action "pin an issue" {
  uses = "bdougie/issue-pin-by-label@master"
  secrets = [
    "GITHUB_TOKEN"  
  ],
  env = {
    LABEL_NAME  = "top5"
  }
}
```
