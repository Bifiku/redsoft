import styles from './Auth.module.css';
import Button from '../../components/Button/Button.tsx';
import { useContext, useEffect, useState } from 'react';
import {fakeDataType, MyContext} from '../../Context/MyContext.tsx';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [authData, setAuthData] = useState<fakeDataType>({ username: '', password: '' });
    const data = useContext(MyContext)!;
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (data.isAuthenticated) {
            // Редирект на главную, если пользователь уже аутентифицирован
            navigate('/');
        }
    }, [navigate, data.isAuthenticated]);

    const handleLogin = async () => {
        try {
            const success = await data.authentication(authData.username, authData.password);
            if (!success) {
                setError('Неверное имя пользователя или пароль');
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error('Error during login:', e.message);
            }
        }
    };

    return (
        <section className={styles['auth']}>
            <h2>Авторизация</h2>
            <div className={styles['inputs']}>
                <input
                    placeholder='username'
                    type='text'
                    value={authData.username}
                    onChange={e => setAuthData({ ...authData, username: e.target.value })}
                />
                <input
                    placeholder='password'
                    type='password'
                    value={authData.password}
                    onChange={e => setAuthData({ ...authData, password: e.target.value })}
                />
                <Button onClick={() => handleLogin()}>Авторизоваться</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </section>
    );
};

export default Auth;
