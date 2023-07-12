import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import {ToastContainer, toast} from 'react-toastify';
import './App.css';
import Header from "./components/Header";
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchDraftBlog, saveBlog} from "./features/blogSlice";
import generateUniqueId from "./utils/generateUserId";

function App() {

    const dispatch = useDispatch();

    const toastId = useRef(null);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [userId, setUserId] = useState(null)
    // const [blogId, setBlogId] = useState()

    const {blogs, draftBlog, isSaving, isSaved, isFetching, isFetched, isError} = useSelector((state) => state.blog);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (userID === null) {
            const newUserId = generateUniqueId();
            localStorage.setItem("userID", newUserId);
            setUserId(newUserId);
        } else {
            dispatch(fetchDraftBlog(userID));
            setUserId(userID);
        }
    }, []);

    useEffect(() => {
        setBlogTitle(draftBlog?.title);
        setBlogContent(draftBlog?.content);
    }, [draftBlog]);

    useEffect(() => {
        if (isSaving) {
            toastId.current = toast.success("Saving The Blog");
        }

        if (isSaved) {
            toast.dismiss(toastId.current);
            toast.success("Blog Saved Successfully", {autoClose: 4000});
        }
    }, [isSaved, isSaving]);

    const handleTitleChanges = (event) => {
        setBlogTitle(event.target.value)
    };

    const handleSaveBlogBtn = () => {
        const blogId = draftBlog?._id || "";
        const status = "draft";

        const blogData = {
            blogId, blogTitle, blogContent, userId, status
        }

        dispatch(saveBlog(blogData))
    }

    return (<div className="App">
        <Header/>
        <div className="msgbox">
            <div className="blog-title">
                <input type="text" className="input-box" value={blogTitle}
                       onChange={(event) => handleTitleChanges(event)} placeholder="Enter Blog Title"/>
            </div>
            <ReactQuill theme="snow" value={blogContent} onChange={setBlogContent}/>
            <div className="btns">
                <input type="button" value="Save" id="saveBtn" onClick={handleSaveBlogBtn}/>
            </div>
        </div>

    </div>);
}

export default App;
