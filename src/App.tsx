import React, {useEffect, useState} from 'react';
import './App.css';
import MessagesContainer from "./components/MessagesContainer";
import {MessageBoxData} from "./components/MessageBox";

import {userData} from "./user-identifier";

const {v4: uuidv4} = require('uuid');

function App() {

    // TODO Get messages from Actyx
    const [messages, setMessages] = useState([] as MessageBoxData[]);
    const [chatMessage, setChatMessage] = useState("");
    const [userName, setUserName] = useState("Anonymous");

    useEffect(() => {
        userData.userName = window.prompt("Your name please", "Anonymous") ?? "Anonymous";
        setUserName(userData.userName);
    }, []);

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();

        // TODO Send event with message
        const newMessages = messages.concat({
            id: uuidv4(),
            message: chatMessage,
            name: userName,
            dateString: new Date().toLocaleDateString("de-DE"),
            likedFrom: []
        } as MessageBoxData)
        setMessages(newMessages);

        setChatMessage("");
    }

    return (
        <div className="App">
            <MessagesContainer messages={messages}/>
            <div className="input-container">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input type="text" className="message" name="chatMessage" value={chatMessage}
                           onChange={e => setChatMessage(e.target.value)}/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
            <div className="statistics">
                <h2>Statistics</h2>
                <span>TODO</span>
            </div>
        </div>
    );
}

export default App;