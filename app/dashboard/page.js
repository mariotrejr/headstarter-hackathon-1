"use client"
import UserList from '../../components/UserList';
import SpotifyPlayer from '@/components/SpotifyPlayer';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <UserList />
      <SpotifyPlayer />
      
    </div>
  );
};

export default Dashboard;
