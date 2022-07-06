import styles from './UserPage.module.scss'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clearUserData, getUser, getUserReposWithTerm, setSearchTerm} from "../../features/user/userSlice";
import Input from "../form/Input/Input";
import ListRepos from "./LIstRepos/ListRepos";

const UserPage = () => {
    const {login} = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user)
    const repos = useSelector((state) => state.user.repos)
    const loadingRepos = useSelector((state) => state.user.loadingRepos)
    const searchTerm = useSelector((state) => state.user.searchTerm)

    const date = new Date(user?.created_at)

    const createdAt = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`

    useEffect(() => {
        dispatch(getUser(login))
    }, [])

    useEffect(() => {
        dispatch(getUserReposWithTerm({login, searchTerm}))
    }, [searchTerm])

    useEffect(() => {
        return function cleanup() {
            dispatch(clearUserData())
        }
    }, [])

    return (
        <div className={styles.UserPage}>
            <Link to={'/'}>
                <div className={styles.back}>ᐸ Back</div>
            </Link>

            <div className={styles.userInfo}>
                <img className={styles.image} src={user.avatar_url} width="200px" height="200px"/>

                <div className={styles.userInfoText}>
                    <div className={styles.login}>{user.login}</div>

                    <table>
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{user.email ? user.email : '-'}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>{user.location ? user.location : '-'}</td>
                        </tr>
                        <tr>
                            <td>Join Date</td>
                            <td>{user.created_at ? createdAt : '-'}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className={styles.follow}>
                        <div>
                            <span className={styles.label}>Followers</span>
                            <span className={styles.value}>{user.followers}</span>
                        </div>
                        <div>
                            <span className={styles.label}>Following</span>
                            <span className={styles.value}>{user.following}</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.title}>
                Repositories
            </div>

            <Input
                placeholder={`Search ${user.login}'s repositories`}
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                loading={loadingRepos}
            />

            <ListRepos repos={repos}/>
        </div>
    )
}

export default UserPage;