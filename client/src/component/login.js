import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "./userInfoContext";



function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const userInfo = useContext(UserInfoContext);

    function checkUser(bool, info) {

        if (bool) {
            userInfo.changeInfo(info[0].id, info[0].user_name);;
            return;
        }
        alert("your username or password is incorrect");
    }

    function createCookie(id) {
        var date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = `id=${id}; expires=${expires}; path=http://localhost:3000;`
        navigate("/bursa/main");
    }

    function handleSubmit() {
        fetch(`http://localhost:8080/sparkLog/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data: ', data.answer[0].id);
                checkUser(data.bool, data.answer);
                createCookie(data.answer[0].id);
            })
    }


    return (
        <div>
            <h1>login</h1>
            <div id='loginFormDiv'>
                <form name="login-form" id="login" className="input-group" >
                    <input onChange={(ev) => setUserName(ev.target.value)} name="user-id" type="text"
                        className="input-field" placeholder="Username" value={userName} required />
                    <input onChange={(ev) => setPassword(ev.target.value)} name="password" type="password"
                        className="input-field" placeholder="Enter Password" value={password} required />
                </form>
            </div>
            <button onClick={handleSubmit} id="submit-login-btn" type="submit" className="submit-btn">
                Log in
            </button>
        </div>
    )
}

export default Login;