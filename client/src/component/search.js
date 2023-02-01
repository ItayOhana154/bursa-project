import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { stokeIdContext } from "./stokeNameContext";



function Search(params) {
    const navigate = useNavigate();
    const [stokeName, setStokeName] = useState("");
    const stokeNumId = useContext(stokeIdContext);
    const [boolSearch, setBoolSearch] = useState(false);
    const [stokeId, setStokeId] = useState("");
    const [stokeNameToPress, setStokeNameToPress] = useState("");

    function searchStoke() {
        fetch(`http://localhost:8080/spark//main/stoke/search/${stokeName}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data.lengthhhhh :", data.length);
                setStokeId(data[0].id)
                setStokeNameToPress(data[0].stoke_name)
                let bool = boolSearch;
                if (data.length > 0) {
                    bool ? bool = false : bool = true;
                    setBoolSearch(bool);
                }
            })
    }
    function navigateToStokePage() {
        stokeNumId.changeId(stokeId);
        navigate("/bursa/main/stoke");
    }

    return (
        <div id="searchDiv">
            <div id="searchFormAndPDiv">
                <form name="login-form" id="login" className="input-group" >
                    <input onChange={(ev) => setStokeName(ev.target.value)} name="user-id" type="text"
                        className="input-field" placeholder="Enter stoke name..." value={stokeName} required />
                </form>
                {boolSearch ? <div id="search-place"><p onClick={navigateToStokePage}>{stokeNameToPress}</p></div> : null}
            </div>
            <button onClick={searchStoke} id="submit-login-btn" type="submit" className="submit-btn">
                Search!
            </button>
        </div>

    )
}

export default Search;