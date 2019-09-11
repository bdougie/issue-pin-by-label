<h3 align="center">Pin an issue by label Action</h3>
<p align="center">A GitHub Action that pins an issue using labels.<p>

## Usage

This GitHub Action pins an issue based on a specified label. 


## Setup

Create a environment vairable for storing the `LABEL_NAME`

```yml
on: issues
name: pin issue based on label
jobs:
  pinAnIssue:
    name: pin an issue
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: pin an issue
      uses: bdougie/issue-pin-by-label@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        LABEL_NAME: enhancement
```
