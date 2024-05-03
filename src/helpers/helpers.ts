export const parseGithubUrl = (url: string) => {
  const path = url.slice('https://github.com/'.length)
  const parts = path.split('/')
  return { owner: parts[0], repo: parts[1] }
}

export const calcCreatedAt = (date: string) => {
  const createdAt = new Date(date)
  const currentDate = new Date()
  const diff = Math.abs(
    Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
      Date.UTC(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate())
  )
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return days === 0 ? 'today' : days === 1 ? 'day ago' : `${days} days ago`
}

export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k' + ' ' + 'Stars';
  } else {
    return num.toString();
  }
};