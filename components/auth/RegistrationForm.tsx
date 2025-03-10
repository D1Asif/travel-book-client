"use client"

import { Button, Checkbox, Input, Link } from "@heroui/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignup } from "@/actions";
import { TUserData } from "@/actions/action.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    phone: z.string().min(10, "Phone number should be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password confirmation is required"),
    terms: z.boolean().refine((value) => value === true, {
        message: "You must agree to the Terms and Conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the path of the error
});

type TFormData = z.infer<typeof schema>;

export default function RegistrationForm() {
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TFormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: TFormData) => {
        const userData: TUserData = {
            name: data.name,
            email: data.email,
            username: data.username,
            phone: data.phone,
            password: data.password,
            role: "user"
        }

        setIsLoading(true);

        const res = await userSignup(userData);

        setIsLoading(false);

        if (res?.success) {
            router.push("/login");
        } else {
            if (res?.message === 'Duplicate error') {
                return toast(`${res.errorSources[0].path}: ${res.errorSources[0].message}`,
                    {
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            }
            toast('Something went wrong!',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };

    return (
        <form className="min-w-[320px] flex flex-col gap-5 my-10" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-semibold pb-4">Sign up 👋</h1>
            <Input
                type="text"
                label="Name"
                labelPlacement="outside"
                placeholder="Enter your name"
                variant="bordered"
                errorMessage={errors.name?.message?.toString() || ""}
                isInvalid={errors.name?.message ? true : false}
                {...register("name")}
            />
            <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                variant="bordered"
                errorMessage={errors.email?.message?.toString() || ""}
                isInvalid={errors.email?.message ? true : false}
                {...register("email")}
            />
            <Input
                type="text"
                label="Username"
                labelPlacement="outside"
                placeholder="Enter your username"
                variant="bordered"
                errorMessage={errors.username?.message?.toString() || ""}
                isInvalid={errors.username?.message ? true : false}
                {...register("username")}
            />
            <Input
                type="text"
                label="Phone"
                labelPlacement="outside"
                placeholder="Enter your phone"
                variant="bordered"
                errorMessage={errors.phone?.message?.toString() || ""}
                isInvalid={errors.phone?.message ? true : false}
                {...register("phone")}
            />
            <Input
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                variant="bordered"
                errorMessage={errors.password?.message?.toString() || ""}
                isInvalid={errors.password?.message ? true : false}
                {...register("password")}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={() => setIsVisiblePass(!isVisiblePass)} aria-label="toggle password visibility">
                        {isVisiblePass ? (
                            <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisiblePass ? "text" : "password"}
            />
            <Input
                label="Confirm Password"
                labelPlacement="outside"
                placeholder="Confirm your password"
                variant="bordered"
                errorMessage={errors.confirmPassword?.message?.toString() || ""}
                isInvalid={errors.confirmPassword?.message ? true : false}
                {...register("confirmPassword")}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={() => setIsVisibleConfirmPass(!isVisibleConfirmPass)} aria-label="toggle password visibility">
                        {isVisibleConfirmPass ? (
                            <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisibleConfirmPass ? "text" : "password"}
            />
            <div>
                <div className="flex justify-between py-1">
                    <Checkbox
                        size="sm"
                        {...register("terms")}
                    >
                        I agree with the {" "}
                        <Link size="sm" className="cursor-pointer">
                            Terms
                        </Link>
                        {" "} and {" "}
                        <Link size="sm" className="cursor-pointer">
                            Privacy Policy
                        </Link>
                    </Checkbox>
                </div>
                {errors.terms && <span className="text-red-500 text-sm">{errors?.terms?.message?.toString()}</span>}
            </div>
            <Button color="primary" type="submit" isLoading={isLoading}>Sign up</Button>
            <Link href="/login" size="sm" className="cursor-pointer justify-center">
                Already have an account? Log in
            </Link>
        </form>
    )
}
