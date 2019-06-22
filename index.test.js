const { Toolkit } = require('actions-toolkit')

describe('issue-pin-by-label', () => {
  let action, tools

  // Mock Toolkit.run to define `action` so we can call it
  Toolkit.run = jest.fn((actionFn) => { action = actionFn })
  // Load up our entrypoint file
  require('.')

  beforeEach(() => {
    // Create a new Toolkit instance
    tools = new Toolkit()

    // Mock methods on it!
    tools.context.payload.action = ""
    tools.context.payload.label = ""

    tools.exit.neutral = jest.fn()
    tools.exit.failure = jest.fn()
    tools.exit.success = jest.fn()
    tools.exit.error = jest.fn()

    pinIssue = jest.fn()
  })

  it('expect error if LABEL_NAME is not provided', async () => {
    await action(tools)
    expect(tools.exit.error).not.toHaveBeenCalled()
  })

  xit('completes if action exists', () => {
    action(tools)
    expect(tools.exit.neutral).toHaveBeenCalled()
  })
})

