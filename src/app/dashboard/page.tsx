"use client"
import axios from "axios";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router= useRouter();
  const [user, setUser] = useState({ name: "string", email: "string", profession:"string" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          withCredentials: true 
        });
        setUser(response.data.user)
      
      } catch (err) {
        router.push("/login"); 
      }
    };

    fetchUser();
  }, []);
  return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl"><p>Name : {user?.name}</p>
            <p>Profession: {user?.profession}</p></div>
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
  )
}
