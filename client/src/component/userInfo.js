import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'


function UserInfo() {
    const [infoArr, setInfoArr] = useState([])
    // useEffect(() => {
    //     fetch(`http://localhost:8080/users//myInfo/${userName}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setStokesArr(data)
    //         })
    // }, [])
    return (
        <div>
            <h1 className='welcome'>User Info</h1>
        </div>
    )
}

export default UserInfo;