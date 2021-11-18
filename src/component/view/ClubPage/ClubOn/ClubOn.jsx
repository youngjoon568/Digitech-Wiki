import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../../data/fbase';
import ClubOnInput from './ClubOnInput';
import ClubOnPost from './ClubOnPost';
import style from '../../css/HomeStyle.module.css';
import Footer from '../../Footer';


export default function ClubOn({ userObj }) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "clubon"),
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
                    <h1 className={style.title}>ON 동아리</h1>
                    <section>
                        <ClubOnInput userObj={userObj} />
                    </section>
                    <section className={style.container}>
                        {post.map((title) => (
                            <ClubOnPost key={title.id} postObj={title} isOwner={title.creatorId === userObj.uid} userObj={userObj} />
                        ))}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
}