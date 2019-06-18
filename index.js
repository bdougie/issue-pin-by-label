const { Toolkit } = require('actions-toolkit')
//
// pinnedIssues is still in developer preview
const headers = {"Accept": "application/vnd.github.elektra-preview"}

const mutation = `mutation ($input: PinIssueInput!) {
  pinIssue(input: $input) {
    issue {
      title
    }
  }
}`

async function pinIssue (tools, id) {
  const input = { issueId: id, clientMutationId: "top5 pinned" } 
  const variables = {input: input, headers: headers}
  return tools.github.graphql(mutation, variables)
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action

  if (action.indexOf("labeled" === -1)) {
    tools.exit.neutral("Just checking for recent labels")
  }

  try {
    const label = tools.context.payload.label.name

    // pin the issue when labeled
    if (action.indexOf("labeled" === 0 && label === "top5")) {
      const issue = tools.context.payload.issue
      const results = await pinIssue(tools, issue.node_id)

      tools.log.success(`Issue #${issue.title} pinned`)
      tools.exit.success("Action is complete")
    }

    tools.exit.success('Issue labeled with non-pinnable label')
  } catch (err) {
    // Log the error message
    tools.log.error(`An error occurred while pinning the issue.`)
    tools.log.error(err)

    // The error might have more details
    if (err.errors) tools.log.error(err.errors)

    // Exit with a failing status
    tools.exit.failure()
  }
}, {
  secrets: ['GITHUB_TOKEN']
})
