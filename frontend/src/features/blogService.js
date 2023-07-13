import axios from "axios";

const API_URL = "http://localhost:7777/blog/";

//API request to save blog
const saveBlog = async (blogData) => {
    const response = await axios.post(API_URL + "autosave", blogData);
    return response.data;
}

//API request to fetch draft blog
const fetchDraftBlog = async (userId) => {
    const response = await axios.post(API_URL + "blog/draft", {userId});
    return response.data;
}

//API request to create new blog
const createNewBlog = async (userId) => {
    const response = await axios.post(API_URL + "blog/create", {userId});
    return response.data;
}

const blogService = {
    saveBlog, fetchDraftBlog, createNewBlog
}

export default blogService;