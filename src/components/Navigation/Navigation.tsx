import {Link} from "react-router-dom";
import styles from './Navigation.module.css'
import {useContext} from "react";
import {MyContext} from "../../Context/MyContext.tsx";

const Navigation = () => {
    const data = useContext(MyContext)
    if(!data?.navData){
        return (
            <nav>
                <ul className={styles['list']}>
                    Главная
                </ul>
            </nav>
        )
    }
    return (
        <nav>
            <ul className={styles['list']}>
                <li><Link to='/'>Главная</Link></li>
                <li><Link to='/browse'>Информация о сервисе</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;