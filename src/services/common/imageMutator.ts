const baseUrl = "https://imgproxy.hungryhub.com/insecure";

function imageMutator(
  resizingType = "fill",
  width: number | string,
  height: number | string,
  gravity = "ce",
  enlarge = 0,
  url: string,
  format: string
) {
  try {
    const encodedUrl = btoa(url);
    const parsedUrl = `${baseUrl}/${resizingType}/${width}/${height}/${gravity}/${enlarge}/${encodedUrl}`;
    if (format) {
      return `${parsedUrl}.${format}`;
    }
    return parsedUrl;
  } catch (err) {
    // if encode process failed, use plain url (usually file name contain Thai charcter)
    const parsedUrl = `${baseUrl}/${resizingType}/${width}/${height}/${gravity}/${enlarge}/plain/${url}`;
    if (format) {
      return `${parsedUrl}@${format}`;
    }
    return parsedUrl;
  }
}

export default imageMutator;
