import Header from "@/app/_components/Header";
import Welcome from "./welcome";
import Create from "./__components/create";
import Latest from "./__components/latest";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* reduce top padding */}
      <main className="px-10 pt-3 pb-6">
        <Welcome />

        {/* reduce heading margin */}
        <h2 className="mt-4 text-2xl font-bold">Dashboard</h2>

        <Create />

        <Latest />
      </main>
    </div>
  );
}

export default Dashboard;
