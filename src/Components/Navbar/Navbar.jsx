import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext } from 'react';
import { ColorContext } from '../../ColorContext/darkContext';

// import sass file
import './navbar.scss';

// import images

function Navbar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="navbar">
            <div className="search">
                <input type="text" placeholder="Search.." />

                <SearchIcon className="search_icon" />
            </div>

            <div className="item_lists">
                <div className="item">
                    {!darkMode ? (
                        <DarkModeIcon
                            className="item_icon"
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    ) : (
                        <LightModeIcon
                            className="item_icon white"
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    )}
                </div>

                {/* <div className="item">
                    <NotificationsNoneIcon className="item_icon" />
                    <span className="badge">1</span>
                </div>

                <div className="item">
                    <img className="admin_pic" src={admin} alt="admin" />
                </div> */}
            </div>
        </div>
    );
}

export default Navbar;
