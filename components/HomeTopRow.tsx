import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";

export default async function HomeTopRow({
    follows,
    profiles,
}:{
    follows:Follower[],
    profiles:Profile[],
}){
   
    return(
        <div className="flex gap-2 xl:justify-center max-w-full overflow-x-auto">
            <div>
                <button className="size-[92px] bg-gradient-to-tr from-ig-orange t0-ig-red rounded-full flex items-center justify-center">
                    <PlusIcon size="42"/>
                </button>
                <p className="text-center text-gray-500 text-sm">New Story</p>
            </div>
           {profiles.map(profiles => (
            <div className="w-24 flex justify-center flex-col items-center">
                <div>
                <div className='rounded-full bg-gradient-to-tr from-ig-red to-ig-orange flex justify-center items-center p-1.5'>
                <div className='bg-white rounded-full flex justify-center items-center p-1 dark:bg-black'>
               <Avatar size='6' radius="full"  fallback={'avatar'} src={profiles.avatar || ''} />
               </div>
               </div>
                </div>
               <p className="text-center text-gray-500 text-sm">{profiles.username}</p>
            </div>
           ))}
          </div>
    );
}