import axios from 'axios';

const instance= axios.create({
    baseURL: "https://api.themoviedb.org/3" //instead of typing www. everytime in the browser we can add the instance from google so that everytime the request will be made from ggogle.com
})

export default instance;