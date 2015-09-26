import toFormData from './form_data'

export default (url, obj) => {
  return fetch(url, {
    method: 'post',
    body: toFormData(obj),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    contentType:  'application/x-www-form-urlencoded',
  })
  .then(res => {
    if (res.status != 200) {
      throw res
    }
    return res.json()
  })
  .catch(res => res.json().then(res => {throw res}))
}
