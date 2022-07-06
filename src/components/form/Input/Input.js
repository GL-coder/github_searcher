import styles from './Input.module.scss';
import Spinner from "./Spinner/Spinner";

const Input = ({loading, value, placeholder, onChange}) => (
    <div className={styles.Input}>
        <input
            autoFocus
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            spellCheck="false"
        />

        {loading && <span className={styles.spinner}><Spinner/></span>}
    </div>
)

export default Input;