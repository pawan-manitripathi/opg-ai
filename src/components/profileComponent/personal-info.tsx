"use client";
import React, { useState } from "react";
import {
    ContactRound,
    MapPin,
    Linkedin,
    Github,
    Pencil,
    Save,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import type  { PersonalInfo } from "@/types/user"; 


interface PersonalInfoProps {
  user: PersonalInfo;
  setUser: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}


export default function PersonalInfo({ user, setUser }: PersonalInfoProps) {
    
    const [isEditing, setIsEditing] = useState(false);
    


    

    const handleToggleEdit = async () => {
        if (isEditing) {
            try {
                await axios.put("/api/user", user, { withCredentials: true });
                toast.success("Personal info updated")
            } catch (error: any) {
                console.error("Update failed:", error.message);
                toast.error("Please try again")
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Personal Information
                </h1>

                <button
                    onClick={handleToggleEdit}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${isEditing
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                >
                    {isEditing ? (
                        <>
                            <Save className="w-4 h-4" /> Save
                        </>
                    ) : (
                        <>
                            <Pencil className="w-4 h-4" /> Edit
                        </>
                    )}
                </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Full Name</label>
                    {isEditing ? (
                        <input
                            name="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : (
                        <p className="text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            {user.name || "Not Provided"}
                        </p>
                    )}
                </div>

                {/* Profession */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Profession</label>
                    {isEditing ? (
                        <input
                            name="profession"
                            value={user.profession}
                            onChange={(e) =>
                                setUser({ ...user, profession: e.target.value })
                            }
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : (
                        <p className="text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            {user.profession || "Not Provided"}
                        </p>
                    )}
                </div>

                {/* Contact No */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-1">
                        <ContactRound className="text-blue-500 w-4 h-4" /> Contact No.
                    </label>
                    {isEditing ? (
                        <input
                            name="contactNum"
                            value={user.contactNum}
                            onChange={(e) =>
                                setUser({ ...user, contactNum: e.target.value })
                            }
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : (
                        <p className="text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            {user.contactNum || "Not Provided"}
                        </p>
                    )}
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-1">
                        <MapPin className="text-blue-500 w-4 h-4" /> Location
                    </label>
                    {isEditing ? (
                        <input
                            name="location"
                            value={user.location}
                            onChange={(e) =>
                                setUser({ ...user, location: e.target.value })
                            }
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : (
                        <p className="text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            {user.location || "Not Provided"}
                        </p>
                    )}
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-1">
                        <Linkedin className="text-blue-500 w-4 h-4" /> LinkedIn
                    </label>
                    {isEditing ? (
                        <input
                            name="linkedin"
                            value={user.linkedin}
                            onChange={(e) =>
                                setUser({ ...user, linkedin: e.target.value })
                            }
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : user.linkedin ? (
                        <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline bg-gray-50 p-2 rounded-lg border border-gray-200 truncate"
                        >
                            {user.linkedin}
                        </a>
                    ) : (
                        <p className="text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            Not Provided
                        </p>
                    )}
                </div>

                {/* GitHub */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-1">
                        <Github className="text-gray-700 w-4 h-4" /> GitHub
                    </label>
                    {isEditing ? (
                        <input
                            name="github"
                            value={user.github}
                            onChange={(e) =>
                                setUser({ ...user, github: e.target.value })
                            }
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2 outline-none transition"
                        />
                    ) : user.github ? (
                        <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline bg-gray-50 p-2 rounded-lg border border-gray-200 truncate"
                        >
                            {user.github}
                        </a>
                    ) : (
                        <p className="text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            Not Provided
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
