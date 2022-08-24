export function isContainHttp(link: string) {
  if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    return true;
  }
  return false;
}

export function isContainQueryString(link: string) {
  return link.includes("?") ? true : false;
}
