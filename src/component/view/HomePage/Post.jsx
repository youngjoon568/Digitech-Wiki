import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { useState } from "react";
import { db, storageService } from "../../../data/fbase";
import style from '../css/HomeStyle.module.css';
import delete_btn from '../../../image/delete_btn.svg';
import pencil_btn from '../../../image/pencil_btn.svg';

export default function Post({ postObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newPost, setNewPost] = useState(postObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(db, "wiki", postObj.id));
            if (postObj.attachmentUrl !== "") {
                await deleteObject(ref(storageService, postObj.attachmentUrl));
            }
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewPost(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, `wiki/${postObj.id}`), { text: newPost });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <div className={style.view_change}>
                    <form onSubmit={onSubmit} className={style.change_from}>
                        <input type="text" value={newPost} className={style.change_input} onChange={onChange} required />
                        <input type="submit" value="Update" className={style.change_none} id="change_input" />
                    </form>
                    <div className={style.change_div}>
                        <label htmlFor="change_input" className={style.change_btn}>변경</label>
                        <button className={style.delete_btn} onClick={toggleEditing}>취소</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={style.home_post}>
                        <div className={style.view_top}>
                            <div className={style.name_div}>
                                <p>
                                    {
                                        postObj?.creatorId?.length ? `${postObj.creatorId}` : "user"
                                    }
                                </p>
                            </div>
                            {isOwner && (
                                <div className={style.view_btn}>
                                    <div className={style.btn_div}>
                                        <button onClick={onDeleteClick}><img src={delete_btn} alt="삭제" /></button>
                                        <button onClick={toggleEditing}><img src={pencil_btn} alt="수정" /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={style.view_time}>
                            <p>{
                                postObj?.createdAt?.length ? `${postObj.createdAt}` : "time"
                            }</p>
                        </div>
                        <div className={style.view_txt}>
                            <p>{postObj.text}</p>
                        </div>
                        <div className={style.view_image}>
                            {postObj.attachmentUrl && (
                                <img src={postObj.attachmentUrl} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};