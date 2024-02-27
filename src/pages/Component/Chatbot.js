import React, { useEffect, useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar';
function Chatbot() {

    const [userInputArray, setuserInputArray] = useState([])
    const [conversationChat, setConversationChat] = useState([{
        role: 'bot',
        message: "Welcome to MODV Beta bot👨‍💻. Just type your question here and see the magic✨"
    }])
    const chatWindowRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [conversationChat]); // Scroll to bottom whenever conversationChat changes

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };
    const userInput = (e) => {
        setuserInputArray(e.target.value)
    }
    // const 
    const MODV_Document_extract = () => {
        setConversationChat((preChat => [...preChat, {
            role: 'user',
            message: userInputArray
        }]))
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("jwt", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwODNkNmRiYjI4OWRkOWU0YTk5NjEiLCJjcmVhdGVkT24iOjE3MDkwMTUxOTE3MzUsImFjY2Vzc1JpZ2h0cyI6WyJtb2R2Il0sInNjb3BlIjpbImNvcmUiLCJkb2N1bWVudHMiLCJlc2lnbiIsImZhdm91cml0ZXMiLCJmb2xkZXJzIiwiaWFtIiwibXktbGVnYWN5Iiwic2VhcmNoIiwidmF1bHRzIiwiY29udmVydC10by1wZGYiXSwib3JnYW5pc2F0aW9uSWQiOiI2NWMwODUwNDVjZWMxYWE1YTBlYWYwY2QiLCJpc09yZ0FkbWluIjp0cnVlLCJvcmdhbmlzYXRpb25NZW1iZXJzaGlwcyI6W3sib3JnYW5pc2F0aW9uSWQiOiI2NWMwODUwNDVjZWMxYWE1YTBlYWYwY2QiLCJvcmdhbmlzYXRpb25OYW1lIjoiRGVlcGVzaCdzIE9yZyIsImlzT3JnQWRtaW4iOnRydWV9XSwic2FsdCI6IjU2NGUyODgyOTgyMjA0ZjU5ZGUzNjU3ZDFlN2Y3MGViYjdlOWZlZDBhZWRjZWIwY2UwOWY0ODBiNWZhM2I2OTQiLCJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MDkwMTUxOTEsImV4cCI6MTcwOTAxODc5MX0.ShOG2lskQDStmIPp68nwei9MiHnzwT_mhEG5v49nLDgxIiYSDSAYkTfu7kwaD7it3RNjIs0J4b_WOg7nONbLjCXxVFsYFas1c6h3BdV3ogUdm8-SQcDl-nvRs7kku_P73CA4i1S_bwxpQEZhA0mL1ZhOK1EoY7scmO_ltE_4N8gf6PAtwDIDD2evOwCpGE-llE413hUy8ROt0XnvUv3nxBJuEGqKFdOQeuZq6bsmJeVnACA_-TUJXlcRqV7fKL1Sa5izRso9mlFf70JtUDeUOqtYDNpIJUPRuqklXfJrYmDDki7Ljk5j-IZmNeOZL7f4xpa64mDYHW_ic3GQtMLDPYM3SAEhTmxpe9wkawQPC8yrZNFj6_hWEcy41J1ate4vTn_7Ju1eLbETj_OsoFAVpqJlbJUnsyoSWECXCV2V8_j0KnhlS2gcvXzIfWA_YPOofXuGr3Kc7wkjVgx1ppdr0vuP2NEP3orwDLkMehublRy7NgUP9IJktDMCcC2jrICYK6NvSDdgobIyC9jW6xwBTn2SBrRLBKNRHs-g2ImbfpA6Eu3hJWimTMhb6_kjU0cwOFFThYWOhsPFWlBIg5wjan59gVJ5oH4NIzu2JPe4HX_B4sgrgp4RpTwbz4C-TqHICwKytcbFLIi0VPAe8Ia1IvziIiEvn1f5TaDrX3bJkbw");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3AJEHJ8jM_-_1YQwCU9f9ND7Fr4kwgVEUp.6Ak%2FZr0tOzyCxJ0ZzUlbQ0IFEL7TUlMJ%2FwtyNImMDCo");

        const raw = JSON.stringify({
            "base64Thumbnails": true,
            "itemsPerPage": 0,
            "pageNo": 0,
            "term": userInputArray
        });
        setuserInputArray('')
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://api.modv.io/search/documentGpt/65c083d75cec1aa5a0eaf098/0/65cdce6b8d4d52abb08e8c1c", requestOptions)
            .then((response) => response.json())
            .then((result) => setConversationChat((preChat => [...preChat, {
                role: 'bot',
                message: result.content
            }])))
            .catch((error) => console.error(error));
    }

    return (
        <div className='Webpage'>
            <div className="chat-container">
                <div className='chat-header'>
                    <div className='chat-header_inner_section'>
                        <Avatar alt="Travis Howard" src="https://app.modv.io/img/logo.4835d1ee.svg" />

                    </div>
                    <div className='chat-header_inner_description'>
                        <h4 style={{marginBottom:'5px'}}>MODV</h4>
                        <h6 style={{fontWeight:'300'}}>Your AI Virtual Assistant</h6>
                    </div>
                </div>

                <div className="chat-window" ref={chatWindowRef}>
                    {conversationChat.map((element, i) => (
                        <div key={i} className={element.role === 'bot' ? 'GPT_response_Main_Div' : 'user_response_Main_div'}>
                            {element.role === 'bot' ? (
                                <div className='GPT_response_Main_Div'>
                                    <div className='GPT_response_Blank_div'>
                                        <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg" />
                                    </div>
                                    <div className='GPT_response_div'>
                                        <span>{element.message}</span>
                                    </div>

                                </div>
                            ) : (
                                <div className='user_response_Main_div'>

                                    <div className='user_response_div'>
                                        <span>{element.message}</span>
                                    </div>
                                    <div className='user_response_first_div'>
                                        <Avatar alt="Remy Sharp" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="input-box">
                    <input type="text" onChange={(e) => userInput(e)} value={userInputArray} className="message-input" placeholder="Type your message" />
                    <button className="send-btn" onClick={() => MODV_Document_extract()}>Send</button>
                </div>
            </div>
            {/* dsc */}
        </div>
    )
}

export default Chatbot