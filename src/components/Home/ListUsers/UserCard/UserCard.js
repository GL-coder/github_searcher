import styles from './UserCard.module.scss';
import {Link} from "react-router-dom";
import Card from '../../../Card/Card';

const UserCard = ({user}) => (
    <Link to={`/user/${user.login}`}>
        <Card>
            <div className={styles.imageLogin}>
                <img className={styles.image} src={user.avatar_url} alt="user avatar" width="60px" height="60px"/>
                <div className={styles.login}>
                    {user.login}
                </div>
            </div>
            <div className={styles.repos}>
                <span className={styles.label}>Repo: </span>
                <span>{user.public_repos}</span>
            </div>
        </Card>

    </Link>
)

export default UserCard;