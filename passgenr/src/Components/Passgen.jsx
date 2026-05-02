import React, { useRef } from 'react'
import { useState,useCallback,useEffect } from 'react'

export function Passgen() {
  const [length,setlength]=useState();
  const [password,setpassword]=useState();
  const [isNumberAllowed,setisNumberAllowed]=useState(false);
  const [isCharAllowed,setisCharAllowed]=useState(false);

  const passwordref = useRef(null);

  const passwordGenerator = useCallback( () => {
    let pass="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(isNumberAllowed){
      str+="0123456789";
    }
    if(isCharAllowed){
      str+="~`!@#$%^&*(){}[]_-=+:;'<>?/,."
    }
    for(let i=1;i<length;i++){
      let charIndex=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(charIndex);
    }
    setpassword(pass);
  },[length,isCharAllowed,isNumberAllowed,password])
  
   const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);

   },[password])
   useEffect(() =>{passwordGenerator()},[length,isCharAllowed,isNumberAllowed])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl my-8 text-orange-400 bg-gray-600 px-4 py-3'>
        <div className='text-xl text-center text-white my-3 '>Password Generator</div>
        <div className='flex rounded-xl shadow-md overflow-hidden mb-4'>
            <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white'
            placeholder={password}
            readOnly />
            <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5'>Copy</button>
        </div>
         <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                   <input 
                   type='range'
                   min={10}
                   max={80}
                   value={length}
                   className='cursor-pointer'
                   id='lengthId' 
                   onChange={(e)=> {setlength(e.target.value)}}/>
                   <label htmlFor="lengthId">length:{length}</label>
                </div>
        
        </div>  
        <div className='flex items-center gap-x-1'>              
        <input 
        type='checkbox'
        id='numInput'
        defaultChecked={isNumberAllowed}
        onChange={(e) => {setisNumberAllowed(!isNumberAllowed)}} />
        <label htmlFor="numInput">Numbers</label>
        </div>  

        <div className='flex items-center gap-x-1'>              
        <input 
        type='checkbox'
        name=''
        id='charInput' 
        defaultChecked={isCharAllowed}
        onChange={(e) => {setisCharAllowed(!isCharAllowed)}}/>
        <label htmlFor="charInput">Character</label>
        </div>  
    </div>

  )
}

export default Passgen