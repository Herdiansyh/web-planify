import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;
