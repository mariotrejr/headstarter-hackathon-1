"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UserList from '../../components/UserList';
import Chat from '../../components/Chat';
import ScreenSharing from '../../components/ScreenRecord'; // Import the ScreenSharing component

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [roomId] = useState('mainRoom');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login'); // Redirect to login page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: 'url(/drivein.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sidebar for UserList */}
      <aside className="w-1/4 bg-gray-800 bg-opacity-70 p-4 text-white flex-shrink-0">
        <UserList />
      </aside>
      
      {/* Main content area with Screen Sharing in the middle */}
      <main className="flex-grow bg-gray-900 bg-opacity-70 p-6 flex flex-col justify-start">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-4xl mb-4">
          <h3 className="text-xl font-semibold mb-4 text-white">Screen Sharing</h3>
        </div>
      </main>

      {/* Sidebar for Chat */}
      <aside className="w-1/4 bg-gray-800 bg-opacity-70 p-4 text-white flex-shrink-0">
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-grow bg-gray-700 rounded-lg shadow-lg p-4 overflow-auto">
            <Chat roomId={roomId} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
