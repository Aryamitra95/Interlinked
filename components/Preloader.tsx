'use client';
import { BeatLoader } from "react-spinners";

export default function Preloader(){
    return(
        <>
        <div>
        <BeatLoader color="#aaa" speedMultiplier={4}/>
        </div>
        </>
    )
}