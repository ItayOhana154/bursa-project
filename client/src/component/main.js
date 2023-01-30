import React, { useEffect, useState,  useContext} from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {stokeIdContext} from "./stokeNameContext";


function Main() {
    const navigate = useNavigate();
    const [stokesArr, setStokesArr] = useState([])
    const stokeNumId = useContext(stokeIdContext);

    useEffect(() => {
        fetch(`http://localhost:8080/spark/main`)
            .then((response) => response.json())
            .then((data) => {
                setStokesArr(data)
            })
    }, [])

    function moveToStoke(index) {
        // console.log("stokesArr[index]:", stokesArr[index]);
        stokeNumId.changeId(stokesArr[index].id)
        navigate("/bursa/main/stoke");
    }

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
            <div>
                {stokesArr.map((item, index) => {
                    return <ul key={index}>
                        <li onClick={() => moveToStoke(index)}>
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