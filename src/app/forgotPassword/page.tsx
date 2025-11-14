"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

   const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/forgotPassword", {email} );
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  return (
   <main className="w-full max-w-md mx-auto mt-16 p-6">
    <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-gray-300">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-black">
            Remember your password?
              <Link className="text-black-500 hover:underline font-medium" href="/login"> Login here</Link>
          </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input type="email" id="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} className="py-3 px-4 block w-full border-2 text-black border-gray-200 rounded-md text-sm " required aria-describedby="email-error"></input>
                </div>
                
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white ">Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  );
}
