import axios from 'axios'

export async function getAxios(url) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function deleteAxios(url) {
  try {
    await axios.delete(url)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function updateAxios(url, item) {
  try {
    await axios.put(url, item)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
