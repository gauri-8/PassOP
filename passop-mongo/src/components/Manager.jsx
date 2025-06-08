import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

const getPasswords = async () => {
  let req = await fetch("http://localhost:3000/")
   let passwords = await req.json()
   console.log(passwords)
      setPasswordArray(passwords)
      
    
}



  //jab bhi website ko load kiya jaye check if pw nam se local storage me kuch hai ya nahi..agar hai toh pw array me sab load kaarke use populate kar do varna kuch mat karo
  useEffect(() => {
  getPasswords()
    //agar kuch hai passwords me, toh password array me vo password dal denge, varna use empty chhod denge
   

  }, [])


  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    navigator.clipboard.writeText(text)
  }




  const showPassword = () => {
    passwordRef.current.type = "text"
    // alert("show the password");
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png"

    }

  }


  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    
       // If any such id exists in the db, delete it 
       //this is a part of editing taaki og wali delete ho jaye and newer persists
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })


// Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast('Error: Password not saved!');
    }

  }

  const deletePassword = async (id) => {
    //ek particular uuid wala password delete karna hai
    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id)) //pw array me se filter kakrke nikal do
     
       await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
     
       toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }
  //jab save aur delete kar rahe hai tabhi hum local storage ko alter karenge
  const editPassword = (id) => {

    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

   

  }




  const handleChange = (e) => {
    //pehle setform ko spread karo fir e.target.name karke usme value dal do
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute top-0 -z-10 h-full w-full bg-[rgba(210,194,246,0.68)]"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[160%] translate-y-[20%] rounded-full bg-[rgba(89,61,120,0.5)] opacity-50 blur-[80px]">

      </div>
      </div>
      <div className=" p-3 md:myContainer min-h-[88.2vh]">

        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-[#8355b8]'> &lt;</span>

          <span>Pass</span><span className='text-[#8355b8]'>OP/&gt;</span>

        </h1>
        <p className='text-black text-lg text-center'>Your own Password Manager</p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className=" rounded-full border border-[#9a64d7] w-full p-4 py-1" type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between ">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className=" rounded-full border border-[#9a64d7] w-full p-4 py-1" type="text" name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className=" rounded-full border border-[#9a64d7] w-full p-4 py-1" type="password" name="password" id="password" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center w-fit px-8 py-2 rounded-full gap-2 bg-[#9a64d7] border border-[#8e4ed7] hover:bg-[#9974c1] cursor-pointer'>
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              state="hover-rotation"
              colors="primary:#242424,secondary:#000000"
            >
            </lord-icon>
            Add</button>

        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className='bg-[#672fa7] text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>

            <tbody className='bg-[#d3b4f7]'>
              {passwordArray.map((item, index) => {

                return <tr key={index}>
                  <td className='py-2 border border-white text-center ' >
                    <div className='flex items-center justify-center '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} //this is a object written in javascript hence 2 brackets
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center '>
                    <div className='flex items-center justify-center '>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='justify-center py-2 border border-white text-center '>

                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>

                  </td>

                </tr>
              })}

            </tbody>


          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager

