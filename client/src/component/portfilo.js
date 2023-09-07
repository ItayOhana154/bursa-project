import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";
import { useNavigate } from 'react-router-dom'

function Portfolio(params) {
    const userInfo = useContext(UserInfoContext);
    console.log('userInfo: ', userInfo)
    const [data, setData] = useState();
    const Navigate = useNavigate()
    const [TradingPortfolioValue, setTradingPortfolioValue] = useState()

    useEffect(() => {
        fetch(`http://localhost:8081/users/myStokes/${userInfo.myInfo.username}/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            console.log("userInfo.myInfo.user_name:", userInfo.myInfo);
        fetch(`http://localhost:8081/users/myStokes/portfilo/${userInfo.myInfo.username}`)
            .then((response) => response.json())
            .then((data) => {
                setTradingPortfolioValue(data.ans);
                console.log("users/myStokes/portfilo:", data);
            })
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }

    function returnToMainPage() {
        Navigate('/bursa/main ');
    }


    return (
        <div id="usersStukes">
            <header className="appPagesNavigate">
                <button className="appPagesNavigateBtn" onClick={returnToMainPage}> main page </button>
                <h1 id='userStokeHeader'>Portfolio</h1>
                <img className="headerSymbul" src={`http://localhost:8081/users/getsymbul`} alt="company symbul" />
            </header>
            <p>Trading portfolio value: {TradingPortfolioValue}$</p>
            {data.map((item, index) => (
                <div className="myStukes" key={index}>
                    <p>
                        {item.stoke_name} <br />
                        Quantity purchased: {item.Quantity_purchased} <br />
                    </p>
                </div>
            ))
            }
        </div >
    )

}

export default Portfolio;