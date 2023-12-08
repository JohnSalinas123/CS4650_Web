import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { SocketContext } from '../context/socket';
import axios from 'axios';
import '../styles/homechat.css';

export const HomeChat = () => {

    const { state } = useLocation();
    const bottomRef = useRef(null);
    const { id, username } = ['232',"john"];

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {

        bottomRef.current?.scrollIntoView({behavior: 'smooth'});

    } ,[messages])

    useEffect(() => {

        initialSetup();

        socket.on ('receiving', (message) => {
            setMessages(old => [...old, message])
        });

        return () => socket.disconnect();
    }, [])

    const handleMessage = () => {

        const newMessage = {username:username,text:input, date: Date.now()};

        // user sends a message
        socket.emit("message", newMessage, (response) => {
            // if server creates/accepts new message render new message 
            if (response.status == "ok") {
                console.log(response)
                setMessages(messages => [...messages, response.message]);

            }
        })

    }

    return (
        <div className="chat-container">
            <HomeChatCurUser userName={username} />

            <div className="chatbox">
                {
                    messages.map((msg) => (
                        <HomeChatMsg key={msg.userName} message={msg.text} date={msg.date} owner={username}/> 
                    ))
                }
                <div ref={bottomRef} />
            </div>
            <HomeChatInput setInput={setInput} handleClick={handleMessage}/>
        </div>
    )
}

const HomeChatCurUser = (props) => {

    return (
        <div className="current-user-box">
            <p>Welcome {props.userName}!</p>
        </div>
    )

}

const HomeChatInput = ({setInput,handleClick}) =>{

    const getInput = (event) => {
        setInput(event.target.value)
    }

    return (
        <div className="chat-input">
            <div className="chat-textbox-box">
                <input className="chat-textbox" type="text" onChange={getInput}/>
            </div>
            <input className="chat-button" type="submit" value="Send" onClick={handleClick} />
        </div>
    )
}

const HomeChatMsg = (props) => {
    let dateObj= new Date(props.date);
    let month = dateObj.getMonth();
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds().toString();

    if (seconds.length == 1) {
        seconds = "0" + seconds;
    }
    
    let ownerClass = "msg-user";
    if (props.owner == false) {
        ownerClass = "msg-other";
    }

    return (
        <div className="msg-block">
            <div className={`msg-general ${ownerClass}`}>
                <div className="msg-interior">
                    <p className="msg-text">{props.message}</p>
                    <p className="msg-time">{`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`}</p>
                </div>
            </div>
        </div>
        
    )
}

