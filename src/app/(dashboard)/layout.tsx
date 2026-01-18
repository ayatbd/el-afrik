import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthGuard>
    <div className="relative bg-white h-full min-h-screen font-[sans-serif]">
      <div className="">
        <Navbar />
        <main className="w-full lg:flex">
          <Sidebar />
          {children}
        </main>
      </div>
    </div>
    // </AuthGuard>
  );
}
