export default (data) => {
  let req = ''
  for (let item in data) {
    req += `${req.length ? '&' : ''}${item}=${encodeURIComponent(data[item])}`
  }
  return req
}