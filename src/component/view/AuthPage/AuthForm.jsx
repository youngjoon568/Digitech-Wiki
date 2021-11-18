import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { authService } from '../../../data/fbase';
import style from '../css/AuthStyle.module.css';

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // 회원가입
                data = await createUserWithEmailAndPassword(authService, email, password);
                console.log(data);

            } else {
                // 로그인
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            // console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className={style.txt_input}>
                    <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} autocomplete='off' />
                    <span></span>
                </div>
                <div className={style.txt_input}>
                    <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                    <span></span>
                </div>
                <input type="submit" className={style.log_btn} value={newAccount ? "Sign up" : "Sign in"} />
                <div className={style.err_msg}>
                    <p>{error}</p>
                </div>
            </form>
        </>
    );
}