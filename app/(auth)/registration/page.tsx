import { auth } from '@/auth';
import RegistrationForm from '@/components/auth/RegistrationForm'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function RegistrationPage() {
  const session = await auth();

  if (session?.user.token) {
    redirect("/");
  }
  
  return (
    <div className="flex justify-center items-center h-full">
      <RegistrationForm />
    </div>
  )
}
