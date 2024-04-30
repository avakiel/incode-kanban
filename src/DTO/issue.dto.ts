export interface IssueDTO {
  id: number
  title: string
  user: {html_url: string}
  comments_url: string
  comments: number
  created_at: string
  number: number
  state: string
  repository_url: string
}
