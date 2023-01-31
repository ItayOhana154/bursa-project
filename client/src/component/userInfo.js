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

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1 className='welcome'> my info </h1>
            {data.map((item) => (
                <div key={item.id}>
                    <p>
                        hello {item.user_name}! <br />
                        phone number: 0{item.phone_num} <br />
                        email: {item.email} <br />
                        <br />
                        <br />
                        payment method: <br />
                        credit card number: {item.creditCard_number} <br />
                        bank number: {item.bank_num} <br />
                    </p>
                </div>
            ))}
        </div>
    )

}

export default UserInfo;