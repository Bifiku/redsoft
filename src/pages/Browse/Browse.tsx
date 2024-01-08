import {useContext, useEffect} from "react";
import {MyContext} from "../../Context/MyContext.tsx";
import {useNavigate} from "react-router-dom";
// import styles from './Browse.module.css'
import TreeNode from "../../components/TreeNode/TreeNode.tsx";
import {data} from "../../data/data.ts";

const Browse = () => {
    const {isAuthenticated} = useContext(MyContext)!
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [navigate, isAuthenticated])

    return (
        <>
            <TreeNode data={data}/>
        </>
    );
};

export default Browse;