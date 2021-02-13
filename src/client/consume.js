import request from 'superagent'

export default function consume (endpoint, headers, data = {}) {
  return request.post(endpoint).set(headers).send(data)
}
