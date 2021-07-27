import * as github from '@actions/github'
import {Context} from '@actions/github/lib/context'
import * as core from '@actions/core'
type GitHub = ReturnType<typeof github.getOctokit>

export interface GitHubContext {
  octokit: GitHub
  context: Context
}

export const assignProjectToPr = async (
  actionContext: GitHubContext,
  projectColumnId: number
): Promise<void> => {
  const {
    context: {
      payload: {pull_request}
    }
  } = actionContext
  if (!pull_request) {
    return
  }
  const pullRequestId = pull_request.id
  try {
    await actionContext.octokit.projects.createCard({
      column_id: projectColumnId,
      note: null,
      content_id: pullRequestId,
      content_type: 'PullRequest'
    })
  } catch (error) {
    core.info(error.message)
  }
}
