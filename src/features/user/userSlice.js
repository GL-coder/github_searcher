import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findUser, findUserRepos, findUserReposWithTerm} from "../../utils/GitHubUtil";

const initialState = {
    searchTerm: '',
    user: {},
    loadingRepos: false,
    repos: [],
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async (login, {rejectWithValue, dispatch}) => {
        const user = await findUser(login)
        dispatch(setUser(user))
    }
)

export const getUserRepos = createAsyncThunk(
    'repos/getUserRepos',
    async (login, {rejectWithValue, dispatch}) => {
        const repos = await findUserRepos(login)
        dispatch(setUserRepos(repos))
    }
)

export const getUserReposWithTerm = createAsyncThunk(
    'repos/getUserReposWithTerm',
    async (data, {rejectedWithValue, dispatch}) => {
        let {
            login,
            searchTerm,
        } = data
        const repos = await findUserReposWithTerm(login, searchTerm)
        dispatch(setUserRepos(repos))
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setUserRepos: (state, action) => {
            state.repos = action.payload
        },
        clearUserData: (state) => {
            state.user = {}
            state.repos = []
            state.searchTerm = ''
            state.loadingUsers = false
        }
    },
    extraReducers: {
        [getUserReposWithTerm.fulfilled]: (state) => {
            state.loadingRepos = false
        },
        [getUserReposWithTerm.pending]: (state) => {
            state.loadingRepos = true
        },
        [getUserReposWithTerm.rejected]: (state) => {
            state.loadingRepos = false
        },
    }
})

export const {setUser, setSearchTerm, setUserRepos, clearUserData} = userSlice.actions

export default userSlice.reducer