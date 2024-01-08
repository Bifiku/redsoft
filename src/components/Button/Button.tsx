import styles from './Button.module.css'
import {ButtonProps} from "./Button.props.ts";

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <button {...props} className={styles['button']}>
            {children}
        </button>
    );
};

export default Button;