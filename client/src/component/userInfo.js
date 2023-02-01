import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";

function UserInfo(params) {
    const userInfo = useContext(UserInfoContext);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/users/myInfo/'${userInfo.myInfo.id}'`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, [])

    console.log('data: ', data);
    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {data.map((item) => (
                <div id="userInfoDiv" key={item.id}>
                    <h1 className='welcome'>hello {item.user_name}! </h1><br />
                    <p>
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