import React, { useState, useEffect } from 'react';
import { BsFillChatDotsFill, BsFillXCircleFill, BsEmojiSmile } from 'react-icons/bs';
import { ResizableBox } from 'react-resizable';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp, where, getDocs, writeBatch } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';
import 'react-resizable/css/styles.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = ({ roomId = 'defaultRoomId' }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [windowHeight, setWindowHeight] = useState(0);
    const [user, setUser] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                console.log('No user signed in');
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (roomId) {
            const q = query(
                collection(db, 'rooms', roomId, 'messages'),
                orderBy('time', 'asc')
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messagesArray = [];
                querySnapshot.forEach((doc) => {
                    messagesArray.push({ id: doc.id, ...doc.data() });
                });
                setMessages(messagesArray);
            }, (error) => {
                console.error('Error fetching messages: ', error);
            });

            return () => unsubscribe();
        }
    }, [roomId]);

    const deleteOldMessages = async (roomId) => {
        try {
            const oneHourAgo = Timestamp.fromDate(new Date(Date.now() - 60 * 60 * 1000)); // 1 hour ago
            const messagesRef = collection(db, 'rooms', roomId, 'messages');
            const q = query(messagesRef, where('time', '<', oneHourAgo));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                });

                const batch = writeBatch(db);
                snapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
                console.log('Success! old messages deleted');
            } else {
                console.log('No messages found to delete');
            }
        } catch (error) {
            console.error('Error deleting old messages: ', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (roomId) {
                deleteOldMessages(roomId);
            }
        }, 60 * 1000); // Every minute 

        return () => clearInterval(intervalId);
    }, [roomId]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() && user && roomId) {
            try {
                // Extract the username from the email
                const username = user.email.split('@')[0];

                await addDoc(collection(db, 'rooms', roomId, 'messages'), {
                    text: input,
                    username: username,
                    uid: user.uid,
                    time: serverTimestamp(),
                });
                setInput('');
                console.log('Message sent successfully');
            } catch (error) {
                console.error('Error sending message: ', error);
            }
        } else {
            console.log('Input is empty or user/roomId is missing');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(e);
        }
    };

    // Define a set of colors for usernames, including pink tones
    const colors = [
        'text-green-500',
        'text-blue-500',
        'text-pink-500',
        'text-yellow-500',
        'text-purple-500',
        'text-teal-500',
        'text-indigo-500',
    ];

    // Create a map to store user colors
    const userColors = new Map();

    // Function to get a color based on user ID, ensuring no repeating colors
    const getUserColor = (uid) => {
        if (!userColors.has(uid)) {
            // Assign a unique color to the user
            const availableColors = colors.filter(color => ![...userColors.values()].includes(color));
            const color = availableColors.length > 0 ? availableColors[0] : colors[0];
            userColors.set(uid, color);
        }
        return userColors.get(uid);
    };

    const handleEmojiClick = (emojiObject) => {
        setInput(input + emojiObject.emoji); // Append emoji to input
    };

    return (
        windowHeight > 0 && (
            <>
                {isOpen ? (
                    <ResizableBox
                        width={300}
                        height={windowHeight}
                        minConstraints={[200, windowHeight]}
                        maxConstraints={[600, windowHeight]}
                        className="fixed left-0 top-0 h-full bg-gray-800 text-white p-4 flex flex-col border-r border-gray-600 overflow-hidden"
                        axis="x"
                    >
                        <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
                            <h2 className="text-xl font-semibold">Chat</h2>
                            <button className="text-gray-400 hover:text-white" onClick={handleToggle}>
                                <BsFillXCircleFill size={20} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto mb-4">
                            {messages.map((message) => (
                                <div key={message.id} className="mb-2 p-2 break-words">
                                    <span className={`font-semibold mr-2 ${getUserColor(message.uid)}`}>{message.username}:</span>
                                    <span>{message.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center relative">
                            <input
                                type="text"
                                className="flex-grow p-2 rounded-l border-none bg-gray-700 placeholder-gray-400 overflow-hidden"
                                placeholder="Type a message"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className="bg-gray-500 p-2 rounded-r text-white border-none"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                            <button
                                className="ml-2 p-2 text-gray-400 hover:text-white"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <BsEmojiSmile size={24} />
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-16 right-0 z-50 max-w-full bg-white rounded-lg border border-gray-600 shadow-lg overflow-auto" style={{ width: '300px', maxHeight: '300px' }}>
                                    <EmojiPicker 
                                        onEmojiClick={handleEmojiClick} 
                                        pickerStyle={{ width: '100%', height: '100%' }} 
                                    />
                                </div>
                            )}
                        </div>
                    </ResizableBox>
                ) : (
                    <button
                        className="fixed bottom-4 right-4 bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none transition duration-300"
                        onClick={handleToggle}
                    >
                        <BsFillChatDotsFill size={24} />
                    </button>
                )}
            </>
        )
    );
};

export default Chat;


