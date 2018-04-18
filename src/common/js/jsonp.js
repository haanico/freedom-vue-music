import Ojsonp from 'jsonp'

export default function jsonp (url, data, options) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    Ojsonp(url, options, (err, data) => {
      if (!err) {
        //console.log(data)
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let params = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    params += `&${k}=${encodeURIComponent(value)}`
  }
  return params ? params.substring(1) : ''
}
