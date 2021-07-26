import * as core from '@actions/core'
import * as github from '@actions/github'
import {assignProjectToPr} from './assignProject'

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('GITHUB_TOKEN', {required: true})
    const projectColumnId = core.getInput('PROJECT_COLUMN_ID', {required: true})

    core.info(`GITHUB_EVENT_NAME=${process.env.GITHUB_EVENT_NAME}`)
    core.info(`GITHUB context action=${github.context.payload.action}`)

    const octokit = github.getOctokit(githubToken)
    const gitHubContext = {
      octokit,
      context: github.context
    }
    await assignProjectToPr(gitHubContext, parseInt(projectColumnId))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
