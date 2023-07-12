import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import {ToastContainer, toast} from 'react-toastify';
import './App.css';
import Header from "./components/Header";
import 'react-quill/dist/quill.snow.css';

function App() {

    const toastId = useRef(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [isSaving, setIsSaving] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isSaving) {
            toastId.current = toast("Auto Saving Blog...");
            setTimeout(() => {
                setIsSaving(false);
                setIsSaved(true);
            }, 2000);

        }

    }, [isSaving])

    useEffect(() => {
        if (isSaved) {
            toast.dismiss(toastId.current);
            toast.success("Blog Saved", {autoClose: 3000})
        }
    }, [isSaved])

    const handleTitleChanges = (event) => {
        setBlogTitle(event.target.value)
    }

    return (<div className="App">
        <Header/>
        <div className="msgbox">
            <div className="blog-title" value={blogTitle} onChange={(event) => handleTitleChanges(event)}>
                <input type="text" className="input-box" placeholder="Enter Blog Title"/>
            </div>
            <ReactQuill theme="snow" value={blogContent} onChange={setBlogContent}/>
        </div>
    </div>);
}

export default App;
