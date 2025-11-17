"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Save, X } from "lucide-react";
import { EducationInfo } from "@/types/user";

interface EducationProps {
    user: EducationInfo;
    setUser: React.Dispatch<React.SetStateAction<EducationInfo>>;
}

export default function Education({ user, setUser }: EducationProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [originalUser, setOriginalUser] = useState<EducationInfo>(user);

    // sync DB data to local original copy
    useEffect(() => {
        setOriginalUser(user);
    }, [user]);

    const handleSave = async () => {
        try {
            const res = await axios.put("/api/user", user, {
                withCredentials: true,
            });

            setOriginalUser(user);
            setIsEditing(false);
            toast.success("Education updated successfully!");
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to save!");
        }
    };

    const handleCancel = () => {
        setUser(originalUser); // restore previous DB values
        setIsEditing(false);
        toast("Changes canceled");
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-xl p-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Education</h1>

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition flex items-center gap-2"
                            >
                                <Pencil size={16} /> Edit
                            </button>
                        )}

                        {isEditing && (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition flex items-center gap-2"
                                >
                                    <Save size={16} /> Save
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* FORM */}
                <form className="m-1 p-2">
                    {/* BACHELOR */}
                    <h3 className="mb-4 font-semibold">Bachelor Degree:-</h3>

                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">Course Name</label>
                            <input
                                disabled={!isEditing}
                                value={user.bachelorCourse}
                                onChange={(e) =>
                                    setUser({ ...user, bachelorCourse: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">
                                University / Institute Name
                            </label>
                            <input
                                disabled={!isEditing}
                                value={user.bachelorUniversity}
                                onChange={(e) =>
                                    setUser({ ...user, bachelorUniversity: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>
                    </div>

                    {/* BACHELOR DETAILS */}
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">
                                CGPA / Percentage
                            </label>
                            <input
                                disabled={!isEditing}
                                value={user.bachelorCgpa}
                                onChange={(e) =>
                                    setUser({ ...user, bachelorCgpa: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mr-2">Start Year</label>
                            <select
                                disabled={!isEditing}
                                value={user.bachelorStart}
                                onChange={(e) =>
                                    setUser({ ...user, bachelorStart: e.target.value })
                                }
                                className={`border rounded-lg p-2 ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            >
                                <option value="">Select</option>
                                {["2024", "2023", "2022", "2021", "2020", "2019"].map(
                                    (yr) => (
                                        <option key={yr} value={yr}>
                                            {yr}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mr-2">End Year</label>
                            <select
                                disabled={!isEditing}
                                value={user.bachelorEnd}
                                onChange={(e) =>
                                    setUser({ ...user, bachelorEnd: e.target.value })
                                }
                                className={`border rounded-lg p-2 ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            >
                                <option value="">Select</option>
                                {["Pursuing", "2025", "2024", "2023", "2022"].map(
                                    (yr) => (
                                        <option key={yr} value={yr}>
                                            {yr}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* MASTER */}
                    <h3 className="mb-4 font-semibold">Master Degree:- (if any)</h3>

                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">Course Name</label>
                            <input
                                disabled={!isEditing}
                                value={user.masterCourse}
                                onChange={(e) =>
                                    setUser({ ...user, masterCourse: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">
                                University / Institute Name
                            </label>
                            <input
                                disabled={!isEditing}
                                value={user.masterUniversity}
                                onChange={(e) =>
                                    setUser({ ...user, masterUniversity: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="mb-1 mr-2 font-normal">
                                CGPA / Percentage
                            </label>
                            <input
                                disabled={!isEditing}
                                value={user.masterCgpa}
                                onChange={(e) =>
                                    setUser({ ...user, masterCgpa: e.target.value })
                                }
                                className={`border rounded-lg p-2 w-sm ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mr-2">Start Year</label>
                            <select
                                disabled={!isEditing}
                                value={user.masterStart}
                                onChange={(e) =>
                                    setUser({ ...user, masterStart: e.target.value })
                                }
                                className={`border rounded-lg p-2 ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            >
                                <option value="">Select</option>
                                {["2024", "2023", "2022", "2021", "2020", "2019"].map(
                                    (yr) => (
                                        <option key={yr} value={yr}>
                                            {yr}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mr-2">End Year</label>
                            <select
                                disabled={!isEditing}
                                value={user.masterEnd}
                                onChange={(e) =>
                                    setUser({ ...user, masterEnd: e.target.value })
                                }
                                className={`border rounded-lg p-2 ${
                                    !isEditing && "bg-gray-100"
                                }`}
                            >
                                <option value="">Select</option>
                                {["Pursuing", "2025", "2024", "2023", "2022"].map(
                                    (yr) => (
                                        <option key={yr} value={yr}>
                                            {yr}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <hr className="mb-4 border-t-2 border-black-500 w-full" />
        </>
    );
}
