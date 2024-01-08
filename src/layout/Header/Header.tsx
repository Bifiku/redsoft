import Navigation from "../../components/Navigation/Navigation.tsx";
import Button from "../../components/Button/Button.tsx";
import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../../Context/MyContext.tsx";

const Header = () => {
    const {isAuthenticated, logout} = useContext(MyContext)!
    return (
        <header className={styles['header']}>
            <Navigation></Navigation>
            {!isAuthenticated && <Link to={'/login'}><Button>Войти</Button></Link>}
            {isAuthenticated && <Button onClick={() => logout()}>Выйти</Button>}
        </header>
    );
};

export default Header;