import Image from "next/image";
import Link from "next/link";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";
export default function DesktopNav() {
 return(
    <div className="hidden lg:block bg-grey-300 px-4 pb-4 w-48 shadow-md shadow-gray-400 "> 
          <div className="top-4 sticky">
          <Image className="dark:invert" alt="Interlinked"
          src="/image/Screenshot 2025-01-28 195122.png" width={522} height={78}/>
          <div className=" ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
          <Link href={'/'}>
          <HomeIcon/>
            Home
          </Link>
          <Link href={'/search'}>
          <SearchIcon/>
          Search
          </Link>
          <Link href={'/browse'}>
          <LayoutGridIcon/>
          Browse
          </Link>
          <Link href={'/profile'}>
          <UserIcon/>
          Profile
          </Link>
          <Link href={'/create'}>
          <CameraIcon/>
          Create
          </Link>
          </div>
          </div>
          </div>
 );
}