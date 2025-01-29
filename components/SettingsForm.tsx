'use client';
import { redirect, useRouter } from "next/navigation";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { Upload, SquareChevronLeft } from "lucide-react";
import { updateProfile } from "@/actions";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({profile}:{profile:Profile|null}) {
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement>(null);
    const [file,setFile] = useState<File|null>(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar|| '');
    useEffect(()=> {
        if(file) {
            const data = new FormData();
      data.set("file", file);
       fetch("/api/upload", {
        method: "POST",
        body: data,
        }).then(response =>{
            response.json().then(url =>{
                setAvatarUrl(url);
            })
        });
     }
    },[file]);
    return (
    <form action={ async(data:FormData) => {
         await updateProfile(data);
        router.push('/profile');
        router.refresh(); 
    }}>
        <input type="hidden" name="avatar" value={avatarUrl}/>
        <div className="flex items-center gap-4">   
            <div>
                <div className="bg-gray-300 size-24 rounded-full overflow-hidden aspect-square border-2 border-gray-600 shadow-md shadow-gray-500">
                  <img className="" src={avatarUrl} alt=""/>
                </div>
            </div>
            <div>
                <input 
                type="file" 
                ref={fileInRef} 
                className="hidden"
                onChange={ev => setFile(ev.target.files?.[0] || null)}
                />
                <Button
                type="button" 
                variant="surface"
                 onClick={()=>fileInRef.current?.click()}>
                   <Upload/>
                    Change Profile Picture
                    </Button>
            </div>
        </div>
        <p className="mt-2 font-bold">Username:</p>
        <TextField.Root 
        defaultValue={profile?.username || ''}
        name="username"
        placeholder="your_username" />
        <p className="mt-2 font-bold">Name:</p>
        <TextField.Root
        defaultValue={profile?.name || ''}
        name ="name"
        placeholder="John Blackthorne" />
        <p className="mt-2 font-bold">Subtitle:</p>
        <TextField.Root 
        defaultValue={profile?.subtitle || ''}
        name="subtitle"
        placeholder="Photographer" />
        <p className="mt-2 font-bold">Bio:</p>
        <TextArea 
        defaultValue={profile?.bio || ''}
        name="bio"/>
         <label className="flex gap-2 items-center mt-2">
        <span>Dark mode </span>
        <Switch 
          defaultChecked={localStorage.getItem('theme') == 'dark'}
          onCheckedChange={(isDark) => {
            const html = document.querySelector('html');
            const theme = isDark ? 'dark' : 'light';
            if (html) {
              html.dataset.theme = theme;
            }
            localStorage.setItem('theme', theme);
            window.location.reload();
        }} />
      </label>
        <div className="mt-4 flex justify-center">
        <Button variant="solid">Save Settings</Button>
        </div>
        
    </form>
  );
}