import { auth, signOut } from "@/app/auth";
import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/db";
import { Button } from "@radix-ui/themes";
import { Upload, SquareChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
     const session = await auth();
     if (!session?.user?.email){
        return "Not Logged In";
     };
     const profile = await prisma.profile.findFirst({
        where:{email: session.user.email },
    });
    
    return(
        <div className="max-w-sm mx-auto mt-4 ">
            <div>
              <Link className='mx-4 size-12' href="/profile"><SquareChevronLeft  /></Link>
              <h1 className="text-2xl font-bold mb-3 text-center">Profile Settings</h1>
            </div>
            <p className="text-gray-500 text-xs text-center -mt-2 mb-2">
              {session.user.email}
            </p>
              <div>
                <SettingsForm 
                profile={profile}/>
                <div className="flex justify-center mt-2 pt-2 border-gray-200">
                  <form action= {async()=>{
                            'use server';
                            await signOut();
                         }}>
                           <Button type="submit" variant="outline">Logout</Button>
                         </form>
                </div>
              </div>  
        </div>
    );
}