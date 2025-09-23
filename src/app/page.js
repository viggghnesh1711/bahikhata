import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-200">
     
      <div className="w-full flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
