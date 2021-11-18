import React from 'react';
import { Link } from 'react-router-dom';
import style from './css/HeaderStyle.module.css';

export default function Navbar({ userObj }) {
    return (
        <nav className={style.navbar}>
            <ul className={style.gnb}>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/profile">프로필</Link></li>
                <li><Link to="/club">동아리</Link></li>
                <li><Link to="/class">학과</Link></li>
                <li><a href="https://l.hiedu.kr/XvR8j" target="_blank" >급식</a></li>
            </ul>
        </nav>
    );
}