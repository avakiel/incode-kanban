import { IssueDTO } from "./DTO/issue.dto"

export const getRepoIssues = async (owner: string, repo: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )
    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Unexpected response from API');
    }

    const simplifiedData = data.map(
      (issue: IssueDTO) => ({
        id: issue.id,
        title: issue.title,
        userLink: issue.user.html_url,
        commentsURL: issue.comments_url,
        commentsCount: issue.comments,
        createdAt: issue.created_at,
        issueNumber: issue.number,
        state: issue.state,
        repoURL: issue.repository_url,
      })
    )
    return simplifiedData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(`Error, check your URL->"https://github.com/${owner}/${repo}"`)
  }
}

export const fetchRepoStars = async (owner: string, repo: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    }
  )
  const data = await response.json()

  return data.stargazers_count;
}
