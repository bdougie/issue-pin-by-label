const { Toolkit } = require('actions-toolkit')
//
// pinnedIssues is still in developer preview
const headers = {"Accept": "application/vnd.github.elektra-preview"}

const pinMutation = `mutation ($input: PinIssueInput!) {
  pinIssue(input: $input) {
    issue {
      title
    }
  }
}`

const unpinMutation = `mutation ($input: UnpinIssueInput!) {
  unpinIssue(input: $input) {
    issue {
      title
    }
  }
}`

async function pinIssue (tools, id, labeled = true) {
  // use pinned flag to choose pin or unpin mutation
  const input = { issueId: id, clientMutationId: "top5 pinned" }
  const variables = {input: input, headers: headers}
  const mutation = labeled ? pinMutation : unpinMutation

  return tools.github.graphql(mutation, variables)
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action
  const label = tools.context.payload.label.name

  tools.log.success(process.env.LABEL_NAME)

  if (action.indexOf("labeled") === -1) {
    tools.exit.neutral("Just checking for recent labels")
  }

  if (label !== process.env.LABEL_NAME) {
    tools.exit.error("Please set up a LABEL_NAME environment variable in the main.workflow file")
  }

  try {
    const labeled = action === "labeled"

    // pin the issue when labeled, unpin when unlabeled
    const issue = tools.context.payload.issue
    const results = await pinIssue(tools, issue.node_id, labeled)

    tools.log.success(`Issue #${issue.title} ${labeled ? "pinned" : "unpinned"}`)
    tools.exit.success("Action is complete")
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
