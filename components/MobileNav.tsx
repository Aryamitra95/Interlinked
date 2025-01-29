import Link from "next/link";
import { CameraIcon, GridIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";
export default function MobileNav(){
    return(
        <div className="block lg:hidden fixed bottom-0 left-0 right-0">
      <div className="flex text-gray-700 *:flex *:items-center">
        <div
          className="pl-2 bg-white dark:bg-black rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/" className="">
            <HomeIcon/>
          </Link>
          <Link href="/search" className="">
            <SearchIcon/>
          </Link>
        </div>
        <div className="size-14 relative -top-4 justify-center w-[144px]">
          <div
            className="absolute bg-white  bg-clip-text border-white dark:border-black dark:border-black border-t-transparent dark:border-t-transparent border-l-transparent dark:border-l-transparent border-[48px]  rounded-full rotate-45">
            <div className="border-8 size-15 border-transparent">
              <Link
                href="/create"
                className="-rotate-45 bg-gradient-to-tr from-ig-orange to-ig-red to-70% size-12 flex items-center justify-center text-white rounded-full">
                <CameraIcon/>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pr-2 w-full bg-white dark:bg-black rounded-t-xl relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/browse" className="">
            <LayoutGridIcon/>
          </Link>
          <Link href="/profile" className=" text-ig-red dark:text-ig-orange">
            <UserIcon/>
          </Link>
        </div>
      </div>
    </div>
    );
}