import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import UserPage from "./components/UserPage/UserPage";
import {useDispatch, useSelector} from "react-redux";
import useDebounce from "./hooks/useDebounce";
import {useEffect} from "react";
import {clearUsers, getUsers} from "./features/users/usersSlice";
import Header from "./components/Header/Header";

function App() {
    const dispatch = useDispatch();

    const searchTerm = useSelector((state) => state.users.searchTerm)
    const loadingUsers = useSelector((state) => state.users.loadingUsers)

    const debouncedSearchTerm = useDebounce(searchTerm, 1000)

    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(getUsers(debouncedSearchTerm))
        }
    }, [debouncedSearchTerm, dispatch])

    useEffect(() => {
        if (!searchTerm) {
            dispatch(clearUsers())
        }
    }, [searchTerm, dispatch])

    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} loadingUsers={loadingUsers}/>}/>
                <Route path="/user/:login" element={<UserPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
