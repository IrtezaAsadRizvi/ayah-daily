"use client"
import { useSelector, useDispatch } from 'react-redux'
import LogoVector from "./LogoVector";

export default function Logo() {
    const enableDarkmode = useSelector((state:any) => state.ui.enableDarkmode)
    return (
        <div className="flex items-center gap-2">
            <LogoVector fill={enableDarkmode ? '#FFFFFF' : '#000000'}/>
            
            <span className="font-extrabold text-lg flex flex-col leading-[20px]">
                <span>Ayah</span>
                <span>Daily</span>                
            </span>
        </div>
    );
}
