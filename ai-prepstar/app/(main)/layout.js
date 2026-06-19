import Provider from "../provider";

function DashboardLayout({ children }) {
  return (
    <Provider>
      <div className="min-h-screen bg-secondary">{children}</div>
    </Provider>
  );
}

export default DashboardLayout;
