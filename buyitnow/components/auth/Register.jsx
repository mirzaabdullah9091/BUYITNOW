"use client"
import axios from 'axios';
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';
const Register = () => {
    const {setUser} = useContext(UserContext)
    const router = useRouter()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const submitHandler = async(e) => {
        e.preventDefault();
        let userForRegistration = {name, email, password}
          await axios.post(`${process.env.HOST_URL}/api/auth/registration`, userForRegistration)
          .then((res)=>{
            if(res.data.success)
                if(res.data.payload)
                    setUser(res.data.payload)
                router.push("/")
          }).catch((err)=>{
            console.log(err)
          })
       
    };
    return (
        <div
            style={{ maxWidth: "480px" }}
            className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
        >
            <form onSubmit={submitHandler}>
                <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

                <div className="mb-4">
                    <label className="block mb-1"> Full Name </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="password"
                        placeholder="Type your password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                    Register
                </button>

                <hr className="mt-4" />

                <p className="text-center mt-5">
                    Already have an account?
                    <Link href="/login" className="text-blue-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register