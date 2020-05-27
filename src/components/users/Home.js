import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_TITLE } from '../utils/PageTitles';

const Home = () => {
    
    useEffect(() => {
        document.title = SITE_TITLE;
    }, []);

    return (
        <div className="ui fluid card">
            <div className="content">
                <div className="description">
                    <p style={{textAlign: 'center'}}>
                        Welcome to Task Manager. Please login or register to start managing your tasks!
                    </p>
                    <br />
                </div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <Link to="/login" className="ui button blue">Login</Link>
                    <Link to="/register" className="ui button teal">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;