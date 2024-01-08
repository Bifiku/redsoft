import { createContext, useState, ReactNode } from 'react';
export interface fakeDataType {
    username: string,
    password: string
}
interface MyContextProps {
    isAuthenticated: boolean;
    authentication: (username: string, password: string) => Promise<boolean>;
    navData: string[];
    logout: () => Promise<void>;
}

interface MyContextProviderProps {
    children: ReactNode;
}

const fakeData: fakeDataType = {
    username: 'admin',
    password: '123'
}

const fakeLogin = async (username: string, password: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
        const isSuccess = username === fakeData.username && password === fakeData.password;
        resolve(isSuccess)
        localStorage.setItem('isAuthenticated', `${isSuccess}`);
    }, 1000)); // Задержка в 1 секунду
};

const fakeLogout = async (): Promise<void> => {
    // Имитация запроса на сервер для выхода из системы
    return new Promise(resolve => setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'false');
        resolve();
    }, 500)); // Задержка в 0.5 секунды
};

const navData = ['Главная', 'Как это работает', 'Контакты', 'О нас'];

const MyContext = createContext<MyContextProps | undefined>(undefined);



const MyContextProvider = ({ children }: MyContextProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('isAuthenticated') === 'true');

    const authentication = async (username: string, password: string):Promise<boolean> => {
        try {
            // Вход в систему с задержкой в 1 секунду
            const success = await fakeLogin(username, password);
            setIsAuthenticated(success);
            return success
        } catch (error) {
            console.error('Error toggling authentication:', error);
            return false
        }
    };
    const logout = async () => {
        if (localStorage.getItem('isAuthenticated')) {
            await fakeLogout();
            setIsAuthenticated(false);
        }
    };



    return (
        <MyContext.Provider value={{ isAuthenticated, authentication, navData, logout }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
export { MyContext };
