import DashboardLayout from "@/Components/dashboard/DashboardLayout";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function MainDashboardLayout({ children }) {

    const user = await getUserSession();

    if (!user) {
        redirect('/auth/signin');
    }

    return (
        <div className="pt-15">
            <DashboardLayout userRole={user?.role}>
                {children}
            </DashboardLayout>
        </div>
    );
}