"use client";

import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

export default function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (
        <form className="min-w-[320px] flex flex-col gap-5">
            <h1 className="text-3xl font-semibold pb-4">Log In 👋</h1>
            <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                variant="bordered"
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
            />
            <div className="flex justify-between py-1">
                <Checkbox defaultSelected size="sm">Remember me</Checkbox>
                <Link size="sm" className="text-gray-400 hover:text-gray-500 cursor-pointer">
                    Forgot password?
                </Link>
            </div>
            <Button color="primary">Log In</Button>
            <Link href="/registration" size="sm" className="cursor-pointer justify-center">
                Create an account
            </Link>
        </form>
    )
}
