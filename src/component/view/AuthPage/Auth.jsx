import { useState } from 'react';
import style from '../css/AuthStyle.module.css';
import Footer from '../Footer';
import AuthForm from './AuthForm';
import SocialLog from './SocialLog';

export default function Auth() {
    const [newAccount, setNewAccount] = useState(true);
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <section className={style.container}>
                <div className={style.inner}>
                    <header className={style.header}>
                        <h1>{newAccount ? "Sing up to" : "Sing in to"} Dwk</h1>
                    </header>
                    <main className={style.main_log}>
                        <AuthForm />
                        <div className={style.change_btn}>
                            <span>{newAccount ? "Are you a member?" : "Not a member?"} <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Sign up"}</span></span>
                        </div>
                        <SocialLog />
                    </main>
                </div>
            </section>
            <Footer />
        </>
    );
}