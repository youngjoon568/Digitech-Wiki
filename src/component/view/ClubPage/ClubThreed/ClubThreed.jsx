import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../../data/fbase';
import style from '../../css/HomeStyle.module.css';
import Footer from '../../Footer';
import ClubThreedInput from './ClubThreedInput';
import ClubThreedPost from './ClubThreedPost';

export default function ClubThreed({ userObj }) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "clubthreed"),
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
                    <h1 className={style.title}>3d 프린팅 동아리</h1>
                    <section>
                        <ClubThreedInput userObj={userObj} />
                    </section>
                    <section className={style.container}>
                        {post.map((title) => (
                            <ClubThreedPost key={title.id} postObj={title} isOwner={title.creatorId === userObj.uid} userObj={userObj} />
                        ))}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
}