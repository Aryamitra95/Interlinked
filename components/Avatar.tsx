export default function Avatar({src}:{src:string}){
    return(
        <div className="size-16 rounded-full aspect-square overflow-hidden ">
        <img src={src} alt=""/>
        </div>
    );
}