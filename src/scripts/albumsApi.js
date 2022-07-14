import axios from 'axios'

const path = 'https://jsonplaceholder.typicode.com/albums'

export async function getAlbums(){
    try {
        const res = await axios.get(path);
        return res.data;
    } catch (err) {
        return null;
    }
}

export async function getPhotos(index){
    try {
        const res = await axios.get(`${path}/${index}/photos`);
        return res.data;
    } catch (err) {
        return null;
    }
}