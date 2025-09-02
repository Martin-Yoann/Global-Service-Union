// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
export const runtime = 'edge';
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'border-0 shadow-lg',
            headerTitle: 'text-2xl font-bold'
          }
        }}
      />
    </div>
  )
}