import UserCard from "./UserCard/UserCard";
import styles from './ListUsers.module.scss'
import {useSelector} from "react-redux";
import image from '../../../images/4905858-01.png'

const ListUsers = () => {
    const users = useSelector((state) => state.users.users);
    const searchTerm = useSelector((state) => state.users.searchTerm)
    const isEmpty = useSelector((state) => state.users.isEmpty)

    const listOfUsers = users.map((user) => (
        <UserCard key={user.id} user={user}/>
    ))

    return (
        <div className={styles.ListUsers}>
            {listOfUsers}

            {(users.length === 0 && searchTerm === '') &&
                <div className={styles.beforeSearching}>
                    <div className={styles.text}>
                        In this Site you can search users and their repositories on GitHub
                    </div>
                    <img className={styles.image} src={image} width="500px" height="500px"/>
                </div>
            }
            {(isEmpty && searchTerm !== '') &&
                <div className={styles.empty}>
                    No one result
                </div>
            }
        </div>
    )
}

export default ListUsers;