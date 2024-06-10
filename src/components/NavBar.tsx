import React from 'react'

const NavBar = () => {
  return (
    <nav className='bg-purple-500 flex justify-between text-purple-100 p-2'>
      <div className='logo mx-3 cursor-pointer '>
      <span className='font-extrabold text-[18px]'>I-manger</span>
      </div>
      <ul className='flex font-semibold gap-9 mx-3 '>
        <li className='w-[60px] cursor-pointer hover:font-extrabold transition-all duration-100'>Home</li>
        <li className='w-[60px] cursor-pointer hover:font-extrabold transition-all duration-100'>Tasks !</li>
      </ul>
    </nav>
  )
}

export default NavBar