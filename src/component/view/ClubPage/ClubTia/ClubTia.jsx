import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../../data/fbase';
import style from '../../css/HomeStyle.module.css';
import Footer from '../../Footer';
import ClubTiaInput from './ClubTiaInput';
import ClubTiaPost from './ClubTiaPost';

export default function ClubTia({ userObj }) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "clubtia"),
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
                    <h1 className={style.title}>Tia 밴드부 동아리</h1>
                    <section>
                        <ClubTiaInput userObj={userObj} />
                    </section>
                    <section className={style.container}>
                        {post.map((title) => (
                            <ClubTiaPost key={title.id} postObj={title} isOwner={title.creatorId === userObj.uid} userObj={userObj} />
                        ))}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
}