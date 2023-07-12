import axios from "axios";

const API_URL = "http://localhost:7777/blog/autosave";

const saveBlog = async (blogData) => {
    console.log("In Goal Service \n", "Goal : ", blogData);

    // const response = await axios.post(API_URL, blogData);

    // console.log("In Goal Service \n", "Response : ", response);
    return response.data;
}

const blogService = {
    saveBlog,
}

export default blogService;