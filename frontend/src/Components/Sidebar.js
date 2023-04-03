import React, { useContext } from "react";
import "./Styles/sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { ThemeContext } from "../App";
const Sidebar = () => {

    const {themes,first} = useContext(ThemeContext)
    return(
        <>
        <div className={`sidebar-container ${themes ? `sidebar-container-${themes}` : null}`} >
            <div className={`side-icon ${themes? `icon-${themes}`: null}`} >
            <HomeIcon  />
            </div>
            <div className={`side-icon ${themes? `icon-${themes}`: null}`} >
            <GroupsIcon  />
            </div>
            <div className={`side-icon ${themes? `icon-${themes}`: null}`} >
            <DensitySmallIcon />
            </div>
          
         
           
        </div>
        </>
    )
}
export default Sidebar;