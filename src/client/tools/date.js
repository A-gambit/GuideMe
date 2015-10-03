export default (date) => {
  date = new Date(date)

  let isCurMonth = date.getUTCFullYear() == (new Date()).getUTCFullYear() && date.getUTCMonth() == (new Date()).getUTCMonth(),
    isCurDay = date.getDate() == (new Date).getDate(),
    isYesterday = date.getDate() == (new Date).getDate() - 1

  if (!isCurMonth) return date.toLocaleDateString()
  if (isCurDay) return `Today ${date.toLocaleTimeString()}`
  if (isYesterday) return `Yesterday ${date.toLocaleTimeString()}`
  return date.toLocaleDateString()
}
