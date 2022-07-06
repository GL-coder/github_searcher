import RepoCard from "./RepoCard/RepoCard";
import styles from './ListRepos.module.scss'

const ListRepos = ({repos}) =>
    <div className={styles.ListRepos}>
        {repos?.map((repo) => <RepoCard key={repo.id} repo={repo}/>)}
    </div>;

export default ListRepos;