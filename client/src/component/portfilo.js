import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";


function Portfolio(params) {
    const userInfo = useContext(UserInfoContext);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/users/myStokes/'${userInfo.myInfo.id}'/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }


    return (
        <div id="usersStukes">
            <h1 className='welcome'> my stokes </h1>
            <ol>
                {data.map((item) => (
                    <li key={item.stoke_name}>
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