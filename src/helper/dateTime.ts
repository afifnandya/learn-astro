import dayjs from "@/lib/dayjs";

// this function will return something like this
// 15 minutes ago
function relativeTime(date: string | number) {
  if (dayjs(date).isValid()) {
    return dayjs(date).utc().fromNow();
  }
  throw new Error("invalid date format");
}

function isBudhistYear() {
  return dayjs().year() > 2500;
}

export { relativeTime, isBudhistYear };
