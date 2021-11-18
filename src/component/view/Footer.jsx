import style from './css/FooterStyle.module.css';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.inner}>
                <h1>Digitech Wiki</h1>
                <ul className={style.gnb}>
                    <li><i className="fab fa-facebook"></i></li>
                    <li><i className="fab fa-twitter"></i></li>
                    <li><i className="fab fa-google-plus-g"></i></li>
                </ul>
            </div>
            <div className={style.footer_btm}>
                <p>&copy; {new Date().getFullYear()} Digitech Wiki</p>
            </div>
        </footer>
    );
}