import React, {ReactComponentElement} from 'react';
import './MessageBox.css';
import {submitLike} from "../actyx/like-submit";
import {userData} from "../user-identifier";

function MessageBox(props: MessageBoxData) {
    const isOwnMessage = props.name === userData.userName;
    const likeCount = props.likedFrom.length;
    const hasLike = likeCount > 0;
    return (
        <div className={`message-box ${isOwnMessage ? "own-message" : ""}`}>
            <div>
                <span className="name">{props.name} - {props.dateString} </span>

                <span className={`like-icon ${hasLike ? "liked" : ""}`}
                      onClick={() => isOwnMessage || submitLike(props.id)}>
                   {hasLike ? '🧡 ' + likeCount : '🤍'}
                </span>
            </div>
            <span className="message">{props.message}</span>
        </div>
    );
}

export default MessageBox;

export type MessageBoxData = {
    id: string,
    message: string,
    name: string,
    dateString: string,
    likedFrom: string[]
}
