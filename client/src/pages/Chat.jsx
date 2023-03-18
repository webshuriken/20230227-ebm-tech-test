import React, {useState} from 'react';
import { FormControl, TextField, Button } from '@mui/material';


const Chat = () => {
    // store each question, response as items
    const [currentChat, setCurrentChat] = useState([]);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const userQuery = e.target[0].value;

        const botReply = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "message": userQuery
            })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
            return null;
        });

        // TODO: how to show a network error to the user
        if (botReply !== null) {
            setCurrentChat(convo => [...convo, userQuery, botReply[0].text]);
        }
        // prepare input for next query
        e.target[0].value = '';
    }


    // TODO build chat page
    return (
        <section>
            <ul>
                {currentChat.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField id='user-query-multiline' label="enter query" required />
                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </section>
    )
}

export default Chat;
