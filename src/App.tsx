import React, {useEffect, useState} from 'react';
import './App.css';
import MessagesContainer from "./components/MessagesContainer";
import {MessageBoxData} from "./components/MessageBox";
import {submitMessage} from "./actyx/message-submit";
import {userData} from "./user-identifier";
import {pondPromise} from "./actyx/pond-provider.service";
import {Last20Messages} from "./actyx/messages.fish";
import {lastLikeFrom$} from "./actyx/last-like";
import {KnownUsers} from "./actyx/known-users";
import {MessagesFromUser} from "./actyx/messages-from-user";

function App() {

    const [messages, setMessages] = useState([] as MessageBoxData[]);
    const [chatMessage, setChatMessage] = useState("");
    const [userName, setUserName] = useState("Anonymous");
    const [lastLikeFrom, setLastLikeFrom] = useState("");
    const [knownUsers, setKnownUsers] = useState([] as string[]);
    const [allMessagesFromUser, setAllMessagesFromUser] = useState([] as string[]);

    useEffect(() => {
        userData.userName = window.prompt("Your name please", "Anonymous") ?? "Anonymous";
        setUserName(userData.userName);

        pondPromise.then((pond) => {
            pond.observe(Last20Messages(userData.userName)).subscribe((messages) => {
                setMessages(messages);
            });

            pond.observe(KnownUsers).subscribe((knownUsers) => {
                setKnownUsers(knownUsers);
            });
        });

        lastLikeFrom$().subscribe((lastLikeFrom) => {
            setLastLikeFrom(lastLikeFrom);
        });

    }, []);

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        await submitMessage(userName, chatMessage);
        setChatMessage("");
    }

    const displayAllMessagesFromUser = (userName: string): void => {

        MessagesFromUser(userName).then((message) => {
            setAllMessagesFromUser(message);
        });
    }

    const knownUsersList = knownUsers.map((userName) => {
        return <li onClick={() => displayAllMessagesFromUser(userName)}>{userName}</li>;
    })

    const allMessagesFromUserList = allMessagesFromUser.map((message, index) => {
        return <p>{index}: {message}</p>;
    })

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
                <div>
                    <span>Last like was from user: {lastLikeFrom}</span>
                </div>
                <div>
                    <span>Click on user to list all his messages</span>
                    <ul>
                        {knownUsersList}
                    </ul>
                    <h3>Messages from selected user:</h3>
                    <span>{allMessagesFromUserList}</span>
                </div>
            </div>
        </div>
    );
}

export default App;