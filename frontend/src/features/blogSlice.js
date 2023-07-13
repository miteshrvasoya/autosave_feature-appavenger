import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import blogService from "./blogService";


const initialState = {
    blogs: [],
    draftBlog: undefined,
    updateInfo: "",
    isSaving: false,
    isSaved: false,
    isFetching: false,
    isFetched: false,
    isError: false,
};

export const fetchDraftBlog = createAsyncThunk("blog/fetch/draft", async (userId, thunkAPI) => {
    try {
        return await blogService.fetchDraftBlog(userId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const createNewBlog = createAsyncThunk("blog/create/new", async (userId, thunkAPI) => {
    try {
        return await blogService.createNewBlog(userId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const saveBlog = createAsyncThunk("blog/save/auto", async (blogData, thunkAPI) => {
    try {
        return await blogService.saveBlog(blogData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

const blogSlice = createSlice({
    name: 'blog', initialState, reducers: {
        reset: (state) => initialState,
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchDraftBlog.pending, (state) => {
                state.isFetching = true;
                state.isFetched = false;
                state.isError = false;
            })
            .addCase(fetchDraftBlog.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isFetched = true;
                state.isError = false;
                state.draftBlog = action.payload?.blogData;
                state.updateInfo = action.payload?.updateInfo;
                console.log("Draft Blog : ", action.payload)
            })
            .addCase(fetchDraftBlog.rejected, (state, action) => {
                state.isFetching = false;
                state.isFetched = false;
                state.isError = true;
            })
            .addCase(createNewBlog.pending, (state) => {
                state.isSaving = true;
                state.isSaved = false;
                state.isError = false;
            })
            .addCase(createNewBlog.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isSaved = true;
                state.isError = false;
                state.updateInfo = action.payload.updateInfo;
                state.savedBlog = action.payload.blogData;
                console.log("updateInfo : ", action.payload);
            })
            .addCase(createNewBlog.rejected, (state, action) => {
                state.isSaving = false;
                state.isSaved = false;
                state.isError = true;
            })
            .addCase(saveBlog.pending, (state) => {
                state.isSaving = true;
                state.isSaved = false;
                state.isError = false;
            })
            .addCase(saveBlog.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isSaved = true;
                state.isError = false;
                state.updateInfo = action.payload.updateInfo;
                state.savedBlog = action.payload.blogData;
                console.log("updateInfo : ", action.payload);
            })
            .addCase(saveBlog.rejected, (state, action) => {
                state.isSaving = false;
                state.isSaved = false;
                state.isError = true;
            });
    }
});

export const {reset} = blogSlice.actions;
export default blogSlice.reducer;