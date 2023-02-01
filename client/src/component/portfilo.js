import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";


function Portfolio(params) {
    const userInfo = useContext(UserInfoContext);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/users/myStokes/${userInfo.myInfo.user_name}/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            console.log("userInfo.myInfo.user_name:", userInfo.myInfo);
        fetch(`http://localhost:8080/users/myStokes/portfilo/${userInfo.myInfo.user_name}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }


    return (
        <div id="usersStukes">
            <h1 className='welcome'> my stokes </h1>
            <ol>
                {data.map((item, index) => (
                    <li key={index}>
                        <div className="myStukes" >
                            <p>
                                {item.stoke_name} <br />
                                Quantity purchased: {item.Quantity_purchased} <br />
                            </p>
                        </div>
                    </li>
                ))
                }
            </ol >
        </div >
    )

}

export default Portfolio;