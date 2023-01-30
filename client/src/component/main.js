import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'


function Main() {
    const [stokesArr, setStokesArr] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/spark/main`)
            .then((response) => response.json())
            .then((data) => {
                setStokesArr(data)
            })
    }, [])
    return (
        <div>
            <header>
            <h1 className='welcome'>Main page</h1>
            </header>
            <nav>
                <ul>
                    <li><Link className='btn' to="/bursa/main/userInfo">Personal info</Link> </li>
                    <li><Link className='btn' to="/bursa/main/portfolio">Personal trading portfolio</Link> </li>
                </ul>
            </nav>
            {console.log(stokesArr)}
            <div>
                {stokesArr.map((item, index) => {
                    return <ul key={index}>
                        <li>
                        {console.log("hhhhhhhhhhhi")}
                        {console.log(item.stoke_name)}
                        {console.log(item.Quantity)}
                        {console.log(item.stoke_available)}
                            {item.stoke_name}
                            Full Quantity - {item.Quantity}
                            Quantity available - {item.stoke_available}
                            price per stoke - {item.stoke_price}
                        </li>
                    </ul>
                })}
            </div>
        </div>
    )
}

export default Main;