import React from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'
import { IoCloseCircle } from "react-icons/io5";

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon'/>
            Clayton Santos
            <BsFillBellFill className='icon'/>
            <IoCloseCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header