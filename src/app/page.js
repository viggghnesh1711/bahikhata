'use client'
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";
import { CreateOwner } from "./actions/CreateOwner";

export default function Home() {

  // useEffect(()=>{
  //   const fetchdetails = async () =>{
  //     await CreateOwner()
  //   }
  //   fetchdetails()
  // })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-200">
     
      <div className="w-full flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
