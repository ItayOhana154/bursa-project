import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { stokeIdContext } from "./stokeNameContext";
import Search from "./search";


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
        <div id="mainPageDiv">
            <div id="navDiv">
                <nav>
                    <Search />
                    <ul>
                        <li><Link className='btn' to="/bursa/main/userInfo">Personal info</Link> </li>
                        <li><Link className='btn' to="/bursa/main/portfolio">Personal trading portfolio</Link> </li>
                    </ul>
                </nav>
            </div>
            <div id="headerAndStokesDiv">
                <div id="mainHeaderAndNav">
                    <header>
                        <h1 className='welcome'>Main page</h1>
                    </header>
                </div>
                <div id="mainPageStokesDiv" >
                    {stokesArr.map((item, index) => {
                        return <ul key={index}>
                            <li onClick={() => moveToStoke(index)}>
                                <h4> {item.stoke_name} </h4> <br />
                                <p>
                                    Full Quantity - {item.Quantity} <br />
                                    Quantity available - {item.stoke_available} <br />
                                    price per stoke - {item.stoke_price}
                                </p>
                            </li>
                        </ul>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Main;