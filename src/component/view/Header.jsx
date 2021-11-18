import { Link } from 'react-router-dom';
import style from './css/HeaderStyle.module.css';
import Navbar from './Navbar';


export default function Header({ userObj }) {

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <div className={style.left}>
                    <div className={style.logo}>
                        <h1><Link to="/">Dwk</Link></h1>
                    </div>
                    <Navbar userObj={userObj} />
                </div>
                <div className={style.right}>
                    <div className={style.user}>
                        <p>
                            {
                                userObj?.displayName?.length
                                    ? `${userObj.displayName}` : "user"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}