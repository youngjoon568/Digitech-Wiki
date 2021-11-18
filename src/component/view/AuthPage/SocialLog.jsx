import style from '../css/AuthStyle.module.css';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { authService } from '../../../data/fbase';

export default function SocialLog() {

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
            } else if (name === "github") {
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GithubAuthProvider.credentialFromResult(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={style.social_btn}>
                <button onClick={onSocialClick} name="google"><i className="fab fa-google"></i> Google 로그인</button>
                <button onClick={onSocialClick} name="github"><i className="fab fa-github"></i> Github 로그인</button>
            </div>
        </>
    );
}