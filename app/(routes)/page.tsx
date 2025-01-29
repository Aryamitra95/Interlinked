
import Image from "next/image";
import {auth, signIn, signOut} from "@/app/auth"
import UserHome from "@/components/UserHome";
import { Suspense } from "react";
import Preloader from "@/components/Preloader";

export default async function Home() {
  const session = await auth();
  return (
    <div className=''>
      {session &&(
        <Suspense fallback={<Preloader/>}>
          <UserHome session={session}/>
        </Suspense>
      )}
      {!session && (
        <form action= {async()=>{
          'use server';
          await signIn('google');
       }}>
         <button className="px-4 bg-ig-red text-white rounded-lg">SignIn to Google</button>
       </form>

      )}
      
      

    </div>
  );
}
