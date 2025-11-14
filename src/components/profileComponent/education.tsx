import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { EducationInfo } from "@/types/user";


interface EducationInfoProps {
    user: EducationInfo;
    setUser: React.Dispatch<React.SetStateAction<EducationInfo>>;
}



export default function Education({ user, setUser }: EducationInfoProps) {


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put("/api/user", user, { withCredentials: true });
            toast.success("Education details saved successfully!");
        } catch (error: any) {
            console.error("Error saving education:", error.message);
            toast.error("Failed to save education info. Try again!");
        }
    };


    return <>
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Education</h1>
                <button type="submit"
                    form="educationForm"
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
                >
                    Save Changes
                </button>
            </div>
            <form id="educationForm" className='m-1 p-2' onSubmit={handleSubmit}>
                <h3 className='mb-4 font-semibold'>Bachelor Degree:-</h3>
                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='bachelorCourse' className="mb-1 mr-2 font-normal">Course Name</label>
                        <input id='bachelorCourse' name='bachelorCourse'
                            value={user.bachelorCourse} onChange={(e) => setUser({ ...user, bachelorCourse: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='bachelorUniversity' className="mb-1 mr-2 font-normal">University / Institute Name</label>
                        <input id='bachelorUniversity' name='bachelorUniversity' value={user.bachelorUniversity} onChange={(e) => setUser({ ...user, bachelorUniversity: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                </div>

                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='bachelorCgpa' className="mb-1 mr-2 font-normal">CGPA / Percentage</label>
                        <input id='bachelorCgpa' name='bachelorCgpa' value={user.bachelorCgpa} onChange={(e) => setUser({ ...user, bachelorCgpa: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                    <div className='mb-4 '>
                        <label htmlFor="bachelorStart" className='mr-2'>Start Year</label>
                        <select id="bachelorStart" name="bachelorStart" value={user.bachelorStart} onChange={(e) => setUser({ ...user, bachelorStart: e.target.value })} className="border rounded-lg p-2">
                            <option value="">Select</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                        </select>
                    </div>

                    <div className='mb-4 '>
                        <label htmlFor="bachelorEnd" className='mr-2'>End Year</label>
                        <select id="bachelorEnd" name="bachelorEnd" value={user.bachelorEnd} onChange={(e) => setUser({ ...user, bachelorEnd: e.target.value })} className="border rounded-lg p-2">
                            <option value="">Select</option>
                            <option value="Pursuing">Pursuing</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>


                </div>

                <h3 className='mb-4 font-semibold'>Master Degree:- (if any)</h3>
                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='masterCourse' className="mb-1 mr-2 font-normal">Course Name</label>
                        <input id='masterCourse' name='masterCourse' value={user.masterCourse} onChange={(e) => setUser({ ...user, masterCourse: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='masterUniversity' className="mb-1 mr-2 font-normal">University / Institute Name</label>
                        <input id='masterUniversity' name='masterUniversity' value={user.masterUniversity} onChange={(e) => setUser({ ...user, masterUniversity: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                </div>

                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='masterCgpa' className="mb-1 mr-2 font-normal">CGPA / Percentage</label>
                        <input id='masterCgpa' name='masterCgpa' value={user.masterCgpa} onChange={(e) => setUser({ ...user, masterCgpa: e.target.value })} className='border border-gray-300 rounded-lg p-2 w-sm'></input>
                    </div>

                    <div className='mb-4 '>
                        <label htmlFor="masterStart" className='mr-2'>Start Year</label>
                        <select id="masterStart" name="masterStart" value={user.masterStart} onChange={(e) => setUser({ ...user, masterStart: e.target.value })} className="border rounded-lg p-2">
                            <option value="">Select</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                        </select>
                    </div>

                    <div className='mb-4 '>
                        <label htmlFor="masterEnd" className='mr-2'>End Year</label>
                        <select id="masterEnd" name="masterEnd" value={user.masterEnd} onChange={(e) => setUser({ ...user, masterEnd: e.target.value })} className="border rounded-lg p-2">
                            <option value="">Select</option>
                            <option value="Pursuing">Pursuing</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                </div>

            </form>

        </div>
        <hr className="mb-4 border-t-2 border-black-500 w-full"></hr>

    </>
}
