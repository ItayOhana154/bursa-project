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
        <div id="homePageDiv">
            <h1 className='welcome'>Tel Aviv Stock Exchange</h1>
            <div id="homePageBtnDiv">
                <button className="homePageBtn"><Link id="LoginBtn" className='btnLink' to="/login">login</Link></button>
                <button className="homePageBtn"><Link className='btnLink' to="/register">register</Link></button>
            </div>
        </div>
    )
}

export default HomePage;