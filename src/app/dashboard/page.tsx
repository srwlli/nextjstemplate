import { redirect } from 'next/navigation';
import { getUserSession, getUserProfile } from '@/lib/auth-actions';
import { Users, FileText, TrendingUp } from 'lucide-react';
import LogoutButton from './logout-button';
import CreatePostForm from '@/components/CreatePostForm';
import CounterDisplay from '@/components/CounterDisplay';

const cardData = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: Users,
    description: 'Active users in the platform',
  },
  {
    title: 'Total Posts',
    value: '5,678',
    icon: FileText,
    description: 'Posts created by users',
  },
  {
    title: 'Engagement Rate',
    value: '89%',
    icon: TrendingUp,
    description: 'Average user engagement',
  },
];

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect('/login'); // Protect the route
  }

  const userProfile = await getUserProfile(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <LogoutButton />
      </div>

      <p className="text-lg text-gray-700">
        Welcome, {userProfile?.fullName || userProfile?.email || 'User'}!
      </p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Session Info:</h2>
        <p className="text-sm text-gray-600">User ID: {session.user.id}</p>
        <p className="text-sm text-gray-600">Email: {session.user.email}</p>
        {userProfile && (
          <p className="text-sm text-gray-600">Profile Username: {userProfile.username || 'N/A'}</p>
        )}
      </div>

      {/* Add the Create Post Form */}
      {session.user.id && (
        <CreatePostForm authorId={session.user.id} />
      )}

      {/* Add the Counter Display */}
      <CounterDisplay />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
              <card.icon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 