import { Button } from '@radix-ui/themes';
import FollowButton from './FollowButton';
import {SquareChevronLeft, Bolt, Check, UserPlusIcon} from 'lucide-react';
import Link from "next/link";
import { Follower, Profile } from '@prisma/client';
export default function ProfilePageInfo({
    profile,
    isOurProfile,
    ourFollow,
}:{
    profile: Profile;
    isOurProfile: boolean;
    ourFollow: Follower| null;
}){
    return(
        <div>
            <section className="py-4 flex justify-between items-center">
                <button className='mb-6 size-12'><SquareChevronLeft  /></button>
                <div className='font-bold'>
                    {profile.username}
                    <div className='size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white'>
                    <Check size={16}/>
                    </div>
                </div>
                <div>
                {isOurProfile && (
                    <Link href='/setting' className=' size-12'>
                    <Bolt />
                 </Link>
                )}
                </div>
            </section>
            <section className='place-content-center flex justify-center '>
            <div className='size-48  rounded-full bg-gradient-to-tr from-ig-red to-ig-orange flex justify-center items-center'>
                <div className='size-44 bg-white dark:bg-black rounded-full flex justify-center items-center'>
                  <div className='size-40 aspect-square overflow-hidden rounded-full inline-flex justify-center items-center'>
                    <img 
                      className=''
                      src={profile.avatar || ''} 
                      alt=""/> 
                  </div>  
                </div>
                </div>
            </section>
            <section className='text-center mt-2'>
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 my-1">{profile.subtitle}</p>
                <p className="">
                {profile.bio}
                </p>
            </section>
                {!isOurProfile && (
                    <section className='flex justify-center my-3'>
                        <FollowButton ourFollow={ourFollow} profileIdToFollow={profile.id}/>
                     </section>
                )}
        </div>
    )
}