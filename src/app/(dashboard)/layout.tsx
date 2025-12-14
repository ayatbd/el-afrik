import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white h-full min-h-screen font-[sans-serif] overflow-x-hidden">
      <div className="flex items-start">
        <Sidebar />

        <section className="main-content w-full">
          <Navbar />
          {children}
        </section>
      </div>
    </div>
  );
}
