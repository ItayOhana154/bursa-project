import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from "./userInfoContext";


function HomePage(params) {
    const { myInfo } = useContext(UserInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (myInfo && myInfo.id) {
            navigate('/bursa/main')
        }

    }, [myInfo]);

    return (
        <div>
            <h1 className='welcome'>home page</h1>
            <Link className='btn' to="/login">login</Link>
            <br />
            <Link className='btn' to="/register">register</Link>
        </div>
    )
}

export default HomePage;