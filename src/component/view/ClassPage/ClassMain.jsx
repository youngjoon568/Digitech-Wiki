import { Link } from 'react-router-dom';
import style from '../css/ClassStyle.module.css';
import Footer from '../Footer';

export default function ClassMain() {
    return (
        <>
            <div className={style.container}>
                <div className={style.inner}>
                    <h1>학과</h1>
                    <ul className={style.gnb}>
                        <li><Link to="/class/game">게임개발계열</Link></li>
                        <li><Link to="/class/ai">인공지능융합계열</Link></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}