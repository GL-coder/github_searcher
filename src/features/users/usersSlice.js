import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findUser, findUsers} from "../../utils/GitHubUtil";

const initialState = {
    searchTerm: '',
    users: [],
    loadingUsers: false,
    isEmpty: false,
}

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (term, {rejectWithValue, dispatch}) => {
        const users = await findUsers(term)
        const usersWithMoreInf = await Promise.all(users.map(async (value) => {
            value = await findUser(value.login)
            return value
        }))
        dispatch(setUsers(usersWithMoreInf))
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        clearUsers: (state) => {
            state.users = []
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setIsEmpty: (state, action) => {
            state.isEmpty = action.payload
        },
    },
    extraReducers: {
        [getUsers.fulfilled]: (state) => {
            state.loadingUsers = false
            if (state.users.length === 0) {
                state.isEmpty = true
            } else {
                state.isEmpty = false
            }
        },
        [getUsers.pending]: (state) => {
            state.loadingUsers = true
        },
        [getUsers.rejected]: (state) => {
            state.loadingUsers = false
        },
    }
})

export const {setUsers, clearUsers, setSearchTerm, setIsEmpty} = usersSlice.actions

export default usersSlice.reducer

