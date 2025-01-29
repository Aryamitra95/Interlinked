import { auth } from '@/app/auth';
import ProfilePageContent from '@/components/ProfilePageContent';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
export default async function ProfilePage(){
    const session = await auth();
    const profile = await prisma.profile
    .findFirst({where:{email: session?.user?.email as string}});
    if(!profile){
        return redirect('/setting');
    }
    return(
        <ProfilePageContent ourFollow={null} profile={profile} isOurProfile={true}/>
    );
}