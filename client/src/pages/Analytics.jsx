import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Analytics = () => {
    // TODO build analytics page
    const [chatData, setChatData] = useState(false);

    useEffect(() => {
        async function fetchChatData() {
            const chat = await fetch('http://localhost:5000/api/analytics')
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(data => data);

            setChatData(() => chat);
        }

        fetchChatData();
    }, []);

    // [intent matches, intent misses] as array
    const intentHitMiss = chatData ? chatData.items.reduce((acc, cur) => {
        if (cur.intent !== null) {
            acc[0] += 1;
        }else{
            acc[1] += 1;
        }
        return acc;
    }, [0,0]) : 0;


    /**
     * There are a few things I would have liked to implement with more time:
     * - Grouping of intents. To help identify if the response was adequate for the message or if there are other similar words we 
     * can use to identify similar intents.
     * - The table showing the amount of times an intent was recognised or missed, could be a pie chart showing the data as percentages. 
     * This would help to quickly visualise how the chatbox is performing.
     */

    return (
        <section>
            <h2>Chat box Analytics</h2>
            <h3>Coversation with intent and reply</h3>
            {chatData ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 620 }} aria-label="Chat box analysis table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User message</TableCell>
                                <TableCell>User intent</TableCell>
                                <TableCell>Bot Reply</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chatData.items.map((data, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{data.message}</TableCell>
                                    <TableCell>{(data.intent != null) ? data.intent : 'not clear'}</TableCell>
                                    <TableCell>{data.replies[0].text}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            :
                <p>No data to display</p>}
            
            <h3>Hits and Misses</h3>
            {chatData ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 620 }} aria-label="Chat box analysis table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Number of comments</TableCell>
                                <TableCell>Intent Match</TableCell>
                                <TableCell>Intent Miss</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{chatData.count}</TableCell>
                                    <TableCell>{intentHitMiss[0]}</TableCell>
                                    <TableCell>{intentHitMiss[1]}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            : <p>No data to diaplay</p>}
        </section>
    )
}

export default Analytics;
