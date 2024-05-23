"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Search = () => {
  const router = useRouter();
  const[keyword,setKeyword] = useState("")

  function submitHandler(e){
    if(keyword){
      router.push(`?keyword=${keyword}`)
    }else
    router.push("/")
  }
  return (
    <>
    <form className='flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4'>
    <input type="text" 
    className='flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 mr-2 px-3 hover:border-gray-400 focus:outline focus:border-gray-500'
    placeholder='Enter your keyword'
    value={keyword}
    onChange={(e)=>setKeyword(e.target.value)}
    required
    />
    <button
    type='button'
    onClick={submitHandler}
    className='px-4 py-2 inline-block text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700'
    >Search</button>

    </form>
      
    </>
  )
}

export default Search
