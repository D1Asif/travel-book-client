"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type TLoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TLoginFormValues) => {
    setError("");
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (res?.error) {
        throw new Error("Credentials do not match!");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="min-w-[320px] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-semibold pb-4">Log In 👋</h1>
      <Input
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        variant="bordered"
        {...register('email')}
        isInvalid={errors.email?.message ? true : false}
        errorMessage={errors.email?.message?.toString() || ""}
      />
      <Input
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        variant="bordered"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            {isVisible ? (
              <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...register('password')}
        isInvalid={errors.password?.message ? true : false}
        errorMessage={errors.password?.message?.toString() || ""}
      />
      <div className="flex justify-between py-1">
        <Checkbox defaultSelected size="sm">Remember me</Checkbox>
        <Link size="sm" className="text-gray-400 hover:text-gray-500 cursor-pointer">
          Forgot password?
        </Link>
      </div>
      {error && <span className="text-red-500 text-center">{error}</span>}
      <Button color="primary" type="submit" isLoading={isLoading}>Log In</Button>
      <Link href="/registration" size="sm" className="cursor-pointer justify-center">
        Create an account
      </Link>
    </form>
  )
}
