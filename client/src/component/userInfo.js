import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";
import MassagesToUser from "./massagesToUser";

function UserInfo() {
    const userInfo = useContext(UserInfoContext);
    const [myBool, setBool] = useState(false)
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/users/myInfo/${userInfo.myInfo.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, [])

    // console.log('data: ', data);
    if (!data) {
        return <h1>Loading...</h1>
    }

    const showBuy = () => {
        let bool = myBool
        bool ? bool = false : bool = true;
        setBool(bool);
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
            <button onClick={() => (showBuy())}>personal massage</button>
            {myBool ? <MassagesToUser personId={userInfo.myInfo.id} /> : <p></p>}
        </div>
    )

}

export default UserInfo;