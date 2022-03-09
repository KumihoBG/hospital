import React from 'react';
import '../Icons/Icons.css';
import youtube from '../../images/youtube.png';
import facebook from '../../images/facebook.png';
import twitter from '../../images/twitter.png';

function Icons() {
    return (
        <div className='icons-container'>
            <ul className='icons'>
                <li><a rel="noreferrer" target="_blank" href='='>
                    <img src={youtube} alt="Youtube" />
                </a></li>
                <li>
                    <a rel="noreferrer" target="_blank" href='='>
                        <img src={twitter} alt="Twitter" />
                    </a></li>
                <li>
                    <a rel="noreferrer" target="_blank" href='='>
                        <img src={facebook} alt="Facebook" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Icons;
