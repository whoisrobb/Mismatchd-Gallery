import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <SignUp path="/sign-up" />
    </div>
  )
}