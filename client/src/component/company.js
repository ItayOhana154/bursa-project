import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { stokeIdContext } from "./stokeNameContext";
import { UserInfoContext } from "./userInfoContext";
import Buy from "./buy";
import Sell from "./sell";


function Company() {
    const [stoke, setStoke] = useState("")
    const stokeNumId = useContext(stokeIdContext);
    const userInfo = useContext(UserInfoContext);
    const [boolBuy, setBoolBuy] = useState(false)
    const [boolSell, setBoolSell] = useState(false)



    useEffect(() => {
        fetch(`http://localhost:8080/spark/main/stoke/${stokeNumId.stokeId}`)
            .then((response) => response.json())
            .then((data) => {
                setStoke(data)
            })
    }, [])

    const showBuy = (index) => {
        let bool = boolBuy
        bool ? bool = false : bool = true;
        setBoolBuy(bool);
    }
    const showSell = (index) => {
        let bool = boolSell
        bool ? bool = false : bool = true;
        setBoolSell(bool);
    }

    return (
        <div>
            <div>
                <h1 className='welcome'>Company</h1>
                <p>stoke name - {stoke[0] ? stoke[0].stoke_name : null}</p>
                <p>stoke Quantity - {stoke[0] ? stoke[0].Quantity : null}</p>
                <p>stoke available - {stoke[0] ? stoke[0].stoke_available : null}</p>
                <p>stoke price - {stoke[0] ? stoke[0].stoke_price : null}</p>
            </div>
            <div>
                {boolBuy ? <Buy id={stokeNumId.stokeId}
                 personId={userInfo.myInfo.id} stokeName={stoke[0].stoke_name}
                  personName={userInfo.myInfo.user_name} />
                    : <p></p>}
            </div>
            <div>
                {boolSell ? <Sell id={stokeNumId.stokeId}
                 personId={userInfo.myInfo.id} stokeName={stoke[0].stoke_name}
                 personName={userInfo.myInfo.user_name} />
                    : <p></p>}
            </div>

            <button onClick={() => (showBuy())}>BUY</button>
            <button onClick={() => (showSell())}>SELL</button>
        </div>
    )
}

export default Company;