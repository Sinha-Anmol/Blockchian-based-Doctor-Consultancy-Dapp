import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// Assets
import person from '../assets/person.svg';
import send from '../assets/send.svg';

// Socket
const socket = io('ws://localhost:3030');

const Messages = ({ account, messages, currentChannel }) => {
  const [message, setMessage] = useState('');

  const messageEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    const startTime = performance.now(); // Get start time before sending message

    const messageObj = {
      channel: currentChannel.id.toString(),
      account: account,
      text: message,
    };

    if (message !== '') {
      socket.emit('new message', messageObj);
    }

    const endTime = performance.now(); 
    const executionTime = endTime - startTime; 

    console.log('Blockchain execution time:', executionTime); 

    setMessage('');
  };

  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    scrollHandler();
  });

  const isAdminMessage = (message) => {
    return message.account === '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; 
  };

  return (
    <div className="text">
      <div className="messages">
        {currentChannel &&
          messages
            .filter((message) => message.channel === currentChannel.id.toString())
            .map((message, index) => (
              <div className="message" key={index}>
                <img src={person} alt="Person" />
                <div className="message_content">
                  <h3>{isAdminMessage(message) ? 'Doctor' : `${message.account.slice(0, 6)}...${message.account.slice(-4)}`}</h3>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        {currentChannel && account ? (
          <input type="text" value={message} placeholder={`Message #${currentChannel.name}`} onChange={(e) => setMessage(e.target.value)} />
        ) : (
          <input type="text" value="" placeholder={`Please Connect Wallet / Join the Channel`} disabled />
        )}
        <button type="submit">
          <img src={send} alt="Send Message" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
