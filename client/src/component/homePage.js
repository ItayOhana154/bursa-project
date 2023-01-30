import React from "react";
import { Link } from 'react-router-dom'


function HomePage(params) {
    return (
        <div>
            <h1 className='welcome'>home page</h1>
            <Link className='btn' to="/login">login</Link>
        </div>
    )
}

export default HomePage;