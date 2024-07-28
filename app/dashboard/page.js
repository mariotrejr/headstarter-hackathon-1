// app/dashboard/page.js
"use client";

import Chat from '../components/Chat';

export default function Tempdash() {

  const roomId='mainRoom';

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-900 p-4">
        {/*screen playing stuff will go here */}
      </div>

      {/* call Chat Component and pass in room id*/}
      <Chat roomId={roomId}/>
    </div>
  );
}

