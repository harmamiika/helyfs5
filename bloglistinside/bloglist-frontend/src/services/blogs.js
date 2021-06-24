import axios from 'axios'
const baseUrl = 'http://localhost:2205/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`).catch(e => console.log(e))
  return response
}

export default { getAll, create, setToken, update, remove }