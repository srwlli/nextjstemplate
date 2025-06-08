// src/app/user-dashboard/page.tsx
// This page is rendered inside UserDashboardLayout and can access its data (e.g., user profile implicitly).
// This is the default page for /user-dashboard.

import { getUserSession } from '@/lib/auth-actions'; // For current session
import { redirect } from 'next/navigation';

export default async function UserDashboardOverviewPage() {
  // You could fetch more data here if specific to this overview page,
  // but core user data is fetched in the layout.
  const session = await getUserSession(); // Verify session again for safety

  if (!session) {
    redirect('/login'); // Should be caught by layout, but good practice
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
      <p className="text-gray-700">This is your personalized dashboard overview. You can add widgets and summary information here.</p>
      <p className="text-gray-600">Your User ID: {session.user.id}</p>
      {/* You can display other data from the layout here implicitly, or pass it down */}
    </div>
  );
} 