import { updateProfile } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService, db } from '../../../data/fbase';
import style from '../css/ProfileStyle.module.css';
import Footer from '../Footer';

export default function Profile({ refreshUser, userObj }) {
    const onLogOutClick = () => authService.signOut();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const getNewPost = async () => {
        const q = query(collection(db, "wiki"), where("creatorId", "==", userObj.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    };


    return (
        <>
            <div className={style.main}>
                <div className={style.inner}>
                    <form onSubmit={onSubmit}>
                        <input type="text" className={style.update_input} onChange={onChange} value={newDisplayName} maxLength={10} required />
                        <input type="submit" value="업데이트" className={style.update_btn} />
                    </form>
                    <div>
                        <button className={style.logout_btn} onClick={onLogOutClick}><Link to="/">로그아웃</Link></button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}