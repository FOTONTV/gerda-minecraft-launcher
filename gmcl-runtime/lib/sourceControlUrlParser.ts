import { URL } from 'url'

export function parseSourceControlUrl(url: string) {
  if (url.startsWith('https://github.com')) {
    const resolvedUrl = new URL(url)
    const [, org, repo, type, ...rest] = resolvedUrl.pathname.split('/')
    if (type === 'blob') {
      resolvedUrl.host = 'raw.githubusercontent.com'
      resolvedUrl.pathname = `/${org}/${repo}/${rest.join('/')}`
      return resolvedUrl.toString()
    }
    if (type === 'releases') {
      return url
    }
  } else if (url.startsWith('https://gitlab.com')) {
    const resolvedUrl = new URL(url)
    const [, org, repo, , type, ...rest] = resolvedUrl.pathname.split('/')
    if (type === 'blob') {
      return url.replace('blob', 'raw')
    }
    // https://gitlab.com/BlockStack/ArtMap/-/package_files/35768460/download
    if (type === 'package_files') {
      return url
    }
  }
  return url
}
