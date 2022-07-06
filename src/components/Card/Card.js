import styles from './Card.module.scss';

const Card = ({children}) => (
    <div className={styles.Card}>
        {children}
    </div>
);

export default Card;