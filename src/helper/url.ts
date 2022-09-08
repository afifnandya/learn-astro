import { ASSET_BASE_URL } from "@/constants";

export function isContainHttp(link: string) {
  if (typeof link !== "string") {
    return false;
  }
  if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    return true;
  }
  return false;
}

export function isContainQueryString(link: string) {
  return link.includes("?") ? true : false;
}

export function rebuildAssetURL(link: string) {
  if (typeof link !== "string") {
    return "";
  }
  if (!isContainHttp(link)) {
    const leadingSlash = link.charAt(0) === "/";
    if (leadingSlash) {
      return `${ASSET_BASE_URL}${link}`;
    }
    return `${ASSET_BASE_URL}/${link}`;
  }
  return link;
}
