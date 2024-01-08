import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Auth from "./pages/Auth/Auth.tsx";
import Main from "./layout/Main/Main.tsx";
import Browse from "./pages/Browse/Browse.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />
            },
            {
                path: "/login",
                element: <Auth />,
            },
            {
                path: "/browse",
                element: <Browse />,
            }
        ]
    }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
