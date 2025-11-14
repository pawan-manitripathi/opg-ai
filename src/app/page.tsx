"use client"

import Link from "next/link"

export default function Home() {
  return <>
  <h1 className="text-center font-semibold text-2xl">Welcome To NextFolio</h1>
  <Link href="/signup">Sign Up</Link>
  </> 
}
