import axios from 'axios'

const path = 'https://jsonplaceholder.typicode.com/posts'

export async function getPosts() {
  try {
    const res = await axios.get(path)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getComments(index) {
  try {
    const res = await axios.get(`${path}/${index}/comments`)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function updatePost(post) {
  try {
    await axios.put(`${path}/${post.id}`, post)
    return true
  } catch (err) {
    return false
  }
}

export async function deletePost(id) {
  try {
    await axios.delete(`${path}/${id}`)
    return true
  } catch (err) {
    return false
  }
}
