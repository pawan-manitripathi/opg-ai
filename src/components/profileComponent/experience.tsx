import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import type { ExperienceInfo } from "@/types/user";


interface experienceInfoProps {
    experience: ExperienceInfo;
    setExperience: React.Dispatch<React.SetStateAction<ExperienceInfo>>;
}

export default function experience({ experience, setExperience }: experienceInfoProps) {


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put("/api/user", experience, { withCredentials: true });
            toast.success("experience details saved successfully!");
        } catch (error: any) {
            console.error("Error saving experience:", error.message);
            toast.error("Failed to save experience info. Try again!");
        }
    };

    return <>
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Experience</h1>
                <button
                    type="submit"
                    form="experienceForm"
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
                >
                    Save Changes
                </button>
            </div>
            <form id="experienceForm" className='m-1 p-2' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='jobTitle' className="mb-1 mr-2 font-normal">Job Title</label>
                        <input id='jobTitle' name='jobTitle' value={experience.jobTitle}
                            onChange={(e) =>
                                setExperience({ ...experience, jobTitle: e.target.value })
                            } className='border border-gray-300 rounded p-1 w-sm'></input>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='companyName' className="mb-1 mr-2 font-normal">Company / Organisation Name</label>
                        <input id='companyName' name='companyName' value={experience.companyName}
                            onChange={(e) =>
                                setExperience({ ...experience, companyName: e.target.value })
                            } className='border border-gray-300 rounded p-1 w-sm'></input>
                    </div>

                </div>

                <div className='flex justify-between'>
                    <div className='mb-4 '>
                        <label htmlFor="employmentType" className='mr-2'>Employment Type</label>
                        <select id="employmentType" name="employmentType" value={experience.employmentType}
                            onChange={(e) =>
                                setExperience({ ...experience, employmentType: e.target.value })
                            } className="border rounded p-2">
                            <option value="">Select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='jobLocation' className="mb-1 mr-2 font-normal">Location</label>
                        <input id='jobLocation' name='jobLocation' value={experience.jobLocation}
                            onChange={(e) =>
                                setExperience({ ...experience, jobLocation: e.target.value })
                            } className='border border-gray-300 rounded p-1 w-sm' placeholder='City or remote'></input>
                    </div>

                </div>

                <div className="mb-4">
                    <label htmlFor="aboutMe" className="block mb-4 ">
                        Responsibilities / Work Description
                    </label>
                    <textarea
                        id="aboutMe"
                        rows={4}
                        name='aboutMe'
                        value={experience.workDescription}
                        onChange={(e) =>
                            setExperience({
                                ...experience,
                                workDescription: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                        placeholder="What you did there, which technologies/skills used, any achievement/outcomes ..."
                    ></textarea>
                </div>


            </form>

        </ div>
        <hr className="mb-4 border-t-2 border-black-500 w-full"></hr>
    </>
}
