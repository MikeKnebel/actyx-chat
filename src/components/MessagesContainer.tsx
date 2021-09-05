import React, {useEffect, useRef} from 'react';
import './MessagesContainer.css';
import MessageBox, {MessageBoxData} from "./MessageBox";

function MessagesContainer(props: { messages: MessageBoxData[] }) {

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current!.scrollIntoView({behavior: "smooth"})
    }
    useEffect(scrollToBottom, [props.messages]);

    const messages = props.messages.map((messageBoxData) =>
        <MessageBox key={messageBoxData.id} {...messageBoxData}/>
    )

    return (
        <div className="MessagesContainer">
            {messages}
            <div ref={messagesEndRef}/>
        </div>
    );
}

export default MessagesContainer;