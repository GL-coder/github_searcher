import styles from "./Home.module.scss";
import ListUsers from "./ListUsers/ListUsers";
import {setSearchTerm} from "../../features/users/usersSlice";
import {useDispatch} from "react-redux";
import Input from "../form/Input/Input";

const Home = ({searchTerm, loadingUsers}) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.Home}>
            <div className={styles.input}>
                <Input
                    placeholder="Search users on GitHub"
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    loading={loadingUsers}
                />
            </div>

            <ListUsers/>
        </div>
    )
}

export default Home;