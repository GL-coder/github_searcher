import styles from './Header.module.scss'
import {Link} from "react-router-dom";

const Header = () =>
    <header className={styles.Header}>
        <div className={styles.text}>
            <Link to="/">
                GitHub Searcher
            </Link>
        </div>
    </header>

export default Header;