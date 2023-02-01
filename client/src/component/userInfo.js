import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";
import { useNavigate } from 'react-router-dom'


function UserInfo(params) {
    const userInfo = useContext(UserInfoContext);
    const [data, setData] = useState();
    const Navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/users/myInfo/'${userInfo.myInfo.id}'`)
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
        <div>
            {data.map((item) => (
                <div id="userInfoDiv" key={item.id}>
                    <header className="appPagesNavigate">
                        <button className="appPagesNavigateBtn" onClick={returnToMainPage}> main page </button>
                        <h1 className='welcome' id="userInfoH1">hello {item.user_name}! </h1>
                        <img className="headerSymbul" src={`http://localhost:8080/users/getsymbul`} alt="company symbul" />
                    </header>
                    <p id="userInfoP">
                        phone number: 0{item.phone_num} <br />
                        email: {item.email} <br />
                        <br />
                        <br />
                        payment method: Credit Card <br />
                        credit card number: {item.creditCard_num} <br />
                        bank number: {item.bank_num} <br />
                    </p>
                </div>
            ))}
        </div>
    )

}

export default UserInfo;