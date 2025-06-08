import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#1c1b1c] text-white flex flex-col justify-center items-center fixed bottom-0  w-full'>
            <div className="logo font-bold text-white text-2xl">
                    <span className='text-[#8355b8]'> &lt;</span>
                   
                    <span>Pass</span><span className='text-[#8355b8]'>OP/&gt;</span>
                    </div>
            <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Gauri </div>
        </div>
  )
}

export default Footer
