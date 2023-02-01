import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";
import { useNavigate } from 'react-router-dom'

function Portfolio(params) {
    const userInfo = useContext(UserInfoContext);
    console.log('userInfo: ', userInfo)
    const [data, setData] = useState();
    const Navigate = useNavigate()

    useEffect(() => {
        console.log(userInfo, 'user info');
        fetch(`http://localhost:8080/users/myStokes/'${userInfo.myInfo.username}'/`)

            .then((response) => response.json())
            .then((data) => {
                setData(data);
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
                <h1 id='userStokeHeader'> my stokes </h1>
                <img className="headerSymbul" src={`http://localhost:8080/users/getsymbul`} alt="company symbul" />
            </header>

            {data.map((item) => (
                <div className="myStukes" key={item.stoke_name}>
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