import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import {ToastContainer, toast} from 'react-toastify';
import './App.css';
import Header from "./components/Header";
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {createNewBlog, fetchDraftBlog, saveBlog} from "./features/blogSlice";
import generateUniqueId from "./utils/generateUserId";
import {ClipLoader} from "react-spinners";
import ToggleButton from 'react-toggle-button';

function App() {

    const dispatch = useDispatch();

    const toastId = useRef(null);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [userId, setUserId] = useState(null);
    const [autosave, setAutosave] = useState(true);

    const {
        blogs, draftBlog, savedBlog, updateInfo, isSaving, isSaved, isFetching, isFetched, isError
    } = useSelector((state) => state.blog);

    //Fetch Draft blog when page load or Create new Draft blog
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (userID === null) {
            const newUserId = generateUniqueId();
            localStorage.setItem("userID", newUserId);
            setUserId(newUserId);
            dispatch(createNewBlog(newUserId));
        } else {
            dispatch(fetchDraftBlog(userID));
            setUserId(userID);
        }
    }, []);

    //set blog title and content initially
    useEffect(() => {
        setBlogTitle(draftBlog?.title);
        setBlogContent(draftBlog?.content);
    }, [draftBlog]);


    //Handle title changes and Dispatch Function to call API
    const handleTitleChanges = (event) => {
        setBlogTitle(event.target.value)
        const blogId = savedBlog?._id;
        const status = "draft";

        const blogData = {
            blogId, blogTitle: event.target.value, blogContent, userId, status
        }

        if (autosave) {
            setTimeout(() => {
                dispatch(saveBlog(blogData));
            }, 500);
        }
    };

    //Handle content changes and Dispatch Function to call API
    const handleContentChanges = (value) => {
        setBlogContent(value);
        const blogId = savedBlog?._id || "";
        const status = "draft";

        const blogData = {
            blogId, blogTitle, blogContent: value, userId, status
        }

        if (autosave) {
            setTimeout(() => {
                dispatch(saveBlog(blogData));
            }, 500);
        }
    }

    //Save blog manually
    const handleSaveBlogBtn = () => {
        const blogId = savedBlog?._id || "";
        const status = "draft";

        const blogData = {
            blogId, blogTitle, blogContent, userId, status
        }
        dispatch(saveBlog(blogData))
    }

    //Handle autosave toggle button
    const handleAutosaveToggle = () => {
        setAutosave(!autosave);
    }


    return (<div className="App">
        <Header/>
        <div className="msgbox">
            <div className="blog-title">
                <input type="text" className="input-box" value={blogTitle}
                       onChange={(event) => handleTitleChanges(event)} placeholder="Enter Blog Title"/>
            </div>
            <ReactQuill theme="snow" value={blogContent} onChange={handleContentChanges}/>
            {!autosave ? (<>
                <div className="btns">
                    <input type="button" value="Save" id="saveBtn" onClick={handleSaveBlogBtn}/>
                </div>
            </>) : (<></>)}

            <div className="update-info">
                {updateInfo?.date !== undefined && updateInfo?.time !== undefined ? (<>
                    <p className="title">
                        Last Saved On :
                    </p>
                    <p className="date-time">
                        {" " + updateInfo?.date + "  " + updateInfo?.time}
                    </p>
                </>) : (<></>)}

                <div className="autosave-div">
                    <div className="autosave-btn">
                        <p
                            className="autosave">Auto Save :
                        </p>
                        <ToggleButton
                            value={autosave}
                            onToggle={handleAutosaveToggle}/>
                    </div>

                    {isSaving ? (<>
                        <p className="autosaving">Saving...</p>
                        <div>
                            <ClipLoader
                                color="#36d7b7"
                                size={20}/>
                        </div>
                    </>) : (<></>)}
                </div>
            </div>
        </div>
    </div>);
}

export default App;
