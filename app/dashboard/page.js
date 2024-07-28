<<<<<<< HEAD
"use client"
import UserList from '../../components/UserList';
import SpotifyPlayer from '@/components/SpotifyPlayer';
=======
// app/dashboard/page.js
"use client";

import Chat from '../components/Chat';

export default function Tempdash() {

  const roomId='mainRoom';
>>>>>>> b069ff029c89acc26f75679e5e94a17cd06f38d7

const Dashboard = () => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <UserList />
      <SpotifyPlayer />
      
    </div>
  );
};

export default Dashboard;
=======
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-900 p-4">
        {/*screen playing stuff will go here */}
      </div>

      {/* call Chat Component and pass in room id*/}
      <Chat roomId={roomId}/>
    </div>
  );
}

>>>>>>> b069ff029c89acc26f75679e5e94a17cd06f38d7
