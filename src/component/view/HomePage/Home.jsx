import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../data/fbase';
import Post from './Post';
import style from '../css/HomeStyle.module.css';
import Footer from '../Footer';
import TitleInput from './TitleInput';

export default function Home({ userObj }) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "wiki"),
                orderBy("createdAt", "desc")),
            (snapshot) => {
                const wikiArray = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));
                setPost(wikiArray);
            }
        );
    }, []);

    return (
        <>
            <section className={style.main}>
                <div className={style.inner}>
                    <h1 className={style.title}>Home</h1>
                    <section>
                        <TitleInput userObj={userObj} />
                    </section>
                    <section className={style.container}>
                        {post.map((title) => (
                            <Post key={title.id} postObj={title} isOwner={title.creatorId === userObj.uid} userObj={userObj} />
                        ))}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
}
