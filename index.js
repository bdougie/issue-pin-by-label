const { Toolkit } = require('actions-toolkit')

const query = `query {
  repository (owner: "github", name: "developer-relations") {
    pinnedIssues (first: 3) {
      totalCount
      nodes {
        issue {
          title
          number
          labels (first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}`

// const query = `query ($owner: String!, $repo: String!) {
//   repository (owner: $owner, name: $repo) {
//     pinnedIssues (first: 3) {
//       totalCount
//       nodes {
//         issue {
//           title
//           number
//           labels (first: 100) {
//             nodes {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// }`

const vairables = ""

// Run your GitHub Action!
Toolkit.run(async tools => {
  // Create the new issue

  // return results.repository.pinnedIssues.nodes
  const headers = {"Accept": "application/vnd.github.elektra-preview+json"}
  // const results = await tools.github.graphql(query("github", "developer-relations"), {headers})
  const results = await tools.github.graphql(query, {headers})

  tools.log.success(results)

  try {
     // const issue = await tools.github.issues.create({
     //   assignees: listToArray(attributes.assignees),
     //   labels: listToArray(attributes.labels),
     //   milestone: attributes.milestone
     // })

    tools.log.success(tools.context)
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
  // tools.exit.success('We did it!')
}, {
  secrets: ['GITHUB_TOKEN']
})
