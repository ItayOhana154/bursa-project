import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";



function Register() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("noam fride");
    const [password, setPassword] = useState("1342545");
    const [phoneNumber, setPhoneNumber] = useState(4867476);
    const [email, setEmail] = useState("noamfr1@gmail.com");
    const [bankNum, setBankNum] = useState(123523645);
    const [creditCardNum, setCreditCardNum] = useState(145256632);





    function massageToUser(bool) {
        console.log("massageToUser");
        if (bool) {
            navigate("/bursa/main");
            alert("love you hony!!");
            return;
        }
        alert("faild to reg");
    }



    function handleSubmit() {
        console.log("username: userName, password: password:", userName, password);
        // event.preventDefault();
        fetch(`http://localhost:8080/sparkReg/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password,
                phone_num: phoneNumber,
                email: email,
                bank_num: bankNum,
                creditCard_num: creditCardNum
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data:", typeof data);
                massageToUser(data);
            })
    }


    return (
        <div>
            <h1>Register</h1>
            <form name="login-form" id="login" className="input-group" >
                <input onChange={(ev) => setUserName(ev.target.value)} name="user-id" type="text"
                    className="input-field" placeholder="Username" value={userName} required />
                <input onChange={(ev) => setPassword(ev.target.value)} name="password" type="password"
                    className="input-field" placeholder="Enter Password" value={password} required />
                <input onChange={(ev) => setPhoneNumber(ev.target.value)} name="PhoneNumber" type="text"
                    className="input-field" placeholder="PhoneNumber" value={phoneNumber} required />
                <input onChange={(ev) => setEmail(ev.target.value)} name="Email" type="text"
                    className="input-field" placeholder="Email" value={email} required />
                <input onChange={(ev) => setBankNum(ev.target.value)} name="BankNum" type="text"
                    className="input-field" placeholder="BankNum" value={bankNum} required />
                <input onChange={(ev) => setCreditCardNum(ev.target.value)} name="CreditCardNum" type="text"
                    className="input-field" placeholder="CreditCardNum" value={creditCardNum} required />
            </form>
            <button onClick={handleSubmit} id="submit-login-btn" type="submit" className="submit-btn">
                register!
            </button>
        </div>
    )
}

export default Register;