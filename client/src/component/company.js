import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { stokeIdContext } from "./stokeNameContext";
import { UserInfoContext } from "./userInfoContext";
import Buy from "./buy";
import Sell from "./sell";


function Company() {
    const Navigate = useNavigate();
    const [stoke, setStoke] = useState("")
    const stokeNumId = useContext(stokeIdContext);
    const userInfo = useContext(UserInfoContext);
    const [boolBuy, setBoolBuy] = useState(false)
    const [boolSell, setBoolSell] = useState(false)

    const randomNumber = Math.floor(Math.random() * 20) + 1;

    useEffect(() => {
        fetch(`http://localhost:8080/spark/main/stoke/${stokeNumId.stokeId}`)
            .then((response) => response.json())
            .then((data) => {
                setStoke(data)
            })
    }, [])

    const showBuy = (index) => {
        console.log('userInfo.myInfo.user_name: ', userInfo.myInfo);
        let bool = boolBuy
        bool ? bool = false : bool = true;
        setBoolBuy(bool);
    }
    const showSell = (index) => {
        let bool = boolSell
        bool ? bool = false : bool = true;
        setBoolSell(bool);
    }
    
    function returnToMainPage() {
        Navigate('/bursa/main ');
    }

    return (
        <div id="companyInfoDiv">
            <div>
                <header className="appPagesNavigate">
                    <button className="appPagesNavigateBtn" onClick={ returnToMainPage }> main page </button>
                    <div>
                        <h1 className='welcome'>{stoke[0] ? stoke[0].stoke_name : null}</h1>
                    </div>
                    <img className="headerSymbul" src={`http://localhost:8080/users/getsymbul`} alt="company symbul" />
                </header>
                <img src={`http://localhost:8080/spark/getImage?random=${randomNumber}`} alt="stoke chart" />
                <div id="stukeInfoDiv">
                    <p>stoke Quantity - {stoke[0] ? stoke[0].Quantity : null}</p>
                    <p>stoke available - {stoke[0] ? stoke[0].stoke_available : null}</p>
                    <p>stoke price - {stoke[0] ? stoke[0].stoke_price : null}$</p>
                </div>
            </div>
            <div className="buyAndSaleBtnDiv" >
                {boolBuy ? <Buy id={stokeNumId.stokeId}
                    personId={userInfo.myInfo.id} stokeName={stoke[0].stoke_name}
                    personName={userInfo.myInfo.user_name} />
                    : <p></p>}
            </div>
            <div className="buyAndSaleBtnDiv" >
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