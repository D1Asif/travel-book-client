import { auth } from "@/auth"
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { Spinner } from "@heroui/react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user.token) {
        redirect("/login");
    }

    if (session?.user.data.role === 'admin') {
        return (
            <AdminDashboard />
        )
    }

    if (session?.user.data.role === 'user') {
        return (
            <UserDashboard />
        )
    }

    if (!session) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }
}
