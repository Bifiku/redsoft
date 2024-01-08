import Button from "../../components/Button/Button.tsx";
import {useContext} from "react";
import {MyContext} from "../../Context/MyContext.tsx";
import styles from './Main.module.css'
import {Link} from "react-router-dom";
const Main = () => {
    const {isAuthenticated} = useContext(MyContext)!
    return (
        <main className={styles['main']}>
            <h1 className={styles['heading']}>{!isAuthenticated ? 'Общий контент для всех пользователей': 'Контент, который видят авторизованные пользователи'}</h1>
            <Link to='/browse'><Button>Посмотреть приватную информацию</Button></Link>
        </main>
    );
};

export default Main;