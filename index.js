const { Toolkit } = require('actions-toolkit')

// Run your GitHub Action!
Toolkit.run(async tools => {
  tools.exit.success('We did it!')
  // Create the new issue
  try {
    // const issue = await tools.github.issues.create({
    //   assignees: listToArray(attributes.assignees),
    //   labels: listToArray(attributes.labels),
    //   milestone: attributes.milestone
    // })

    tools.log.success(`Labeled issue foo: ${issue.data}`)
    // tools.log.success(`Labeled issue ${issue.data.title}#${issue.data.number}: ${issue.data.html_url}`)
  } catch (err) {
    // Log the error message
    tools.log.error(`An error occurred while pinning the issue. This might be caused by a malformed issue title, or a typo in the labels`)
    tools.log.error(err)

    // The error might have more details
    if (err.errors) tools.log.error(err.errors)

    // Exit with a failing status
    // tools.exit.failure()
  }
}, {
  secrets: ['GITHUB_TOKEN'],
  event: ['label']
})
