import { useState } from 'react';
import { db, storageService } from '../../../../data/fbase';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { useRef } from 'react';
import style from '../../css/HomeStyle.module.css';

export default function ClubWebInput({ userObj }) {
    const [title, setTitle] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (title === "") {
            return
        }
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        };

        const titlePosting = {
            text: title,
            createdAt: Date(serverTimestamp()),
            creatorId: userObj.uid,
            attachmentUrl,
        };


        await addDoc(collection(db, "clubweb"), titlePosting);
        setTitle("");
        setAttachment("");
        fileInput.current.value = "";
    };
    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile);
        }
    };
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    }
    const fileInput = useRef();

    return (
        <>
            <div className={style.main_div}>
                <form className={style.txt_form} onSubmit={onSubmit}>
                    <div className={style.top_div}>
                        <input type="text" placeholder="내용을 입력하세요." className={style.txt_input} autoComplete="off" value={title} onChange={e => setTitle(e.target.value)} maxLength={130} required />
                        <input type="file" id="image_input" className={style.image_input} onChange={onFileChange} ref={fileInput} accept="image/*" />
                    </div>
                    <div className={style.btm_div}>
                        <button className={style.post_btn}>게시</button>
                        <label htmlFor="image_input" className={style.image_btn}>이미지</label>
                    </div>
                </form>
            </div>
            {attachment && (
                <div className={style.af_div}>
                    <img className={style.af_image} src={attachment} />
                    <button className={style.af_btn} onClick={onClearAttachment}><i className="fas fa-times"></i></button>
                </div>)}
        </>
    );
}