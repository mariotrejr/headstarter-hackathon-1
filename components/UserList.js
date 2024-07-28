import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const roomId = 'mainRoom';
    const roomRef = doc(db, 'rooms', roomId);

    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        setUsers(doc.data().users || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLeaveRoom = async () => {
    const user = auth.currentUser;
    if (user) {
      const roomId = 'mainRoom';
      const roomRef = doc(db, 'rooms', roomId);

      await updateDoc(roomRef, {
        users: arrayRemove({
          uid: user.uid,
          displayName: user.displayName || user.email,
          email: user.email,
        }),
      });

      await signOut(auth);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Users in the Room</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.uid} className="bg-gray-700 text-white p-3 rounded">
            {user.displayName || user.email}
          </li>
        ))}
      </ul>
      <Link href="/login" passHref>
        <button
          onClick={handleLeaveRoom}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Leave Room
        </button>
      </Link>
    </div>
  );
};

export default UserList;
