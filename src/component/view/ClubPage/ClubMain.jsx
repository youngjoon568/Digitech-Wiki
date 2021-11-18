import { Link } from 'react-router-dom';
import style from '../css/ClubStyle.module.css';
import Footer from '../Footer';

export default function ClubMain() {
    return (
        <>
            <div className={style.club_list}>
                <div className={style.title}><h1>동아리 / 기능반</h1></div>
                <div className={style.list_inner}>
                    <div>
                        <h1>게임개발</h1>
                        <ul className={style.gnb}>
                            <li><Link to="/club/game">게임 기능반</Link></li>
                            <li><Link to="/club/agk">AGK 기업반</Link></li>
                            <li><Link to="/club/koi">KOI</Link></li>
                            <li><Link to="/club/on">ON</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1>인공지능융합</h1>
                        <ul className={style.gnb}>
                            <li><Link to="/club/ss">스마트스페이스</Link></li>
                            <li><Link to="/club/web">웹 기능반</Link></li>
                            <li><Link to="/club/mc">MC</Link></li>
                            <li><Link to="/club/mod">MOD</Link></li>
                            <li><Link to="/club/root">ROOT</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1>기타</h1>
                        <ul className={style.gnb}>
                            <li><Link to="/club/threed">3d 프린팅</Link></li>
                            <li><Link to="/club/meeple">Meeple 보드게임</Link></li>
                            <li><Link to="/club/tia">TIA 밴드부</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}