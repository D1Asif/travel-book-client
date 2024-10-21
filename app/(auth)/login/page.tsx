import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();

    if (session?.user.token) {
        redirect("/");
    }

    return (
        <div className="flex justify-center items-center h-full">
            <LoginForm />
        </div>
    )
}
