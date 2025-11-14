import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import type  { ProjectInfo } from "@/types/user"; 

interface ProjectInfoProps {
  project: ProjectInfo;
  setProject: React.Dispatch<React.SetStateAction<ProjectInfo>>;
}

export default function Projects({ project, setProject }: ProjectInfoProps) {

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/user", project, { withCredentials: true });
      toast.success("Project details saved successfully!");
    } catch (error: any) {
      console.error("Error saving project info:", error.message);
      toast.error("Failed to save project details. Try again!");
    }
  };

    return <>
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
                <button
                    type="submit"
                    form="projectForm"
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
                >
                    Save Changes
                </button>
            </div>
            <form id="projectForm" className='m-1 p-2' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <div className='mb-4'>
                        <label htmlFor='projectTitle' className="mb-1 mr-2 font-normal">Project Title</label>
                        <input id='projectTitle' name='projectTitle' value={project.projectTitle}
                            onChange={(e) =>
                                setProject({ ...project, projectTitle: e.target.value })
                            } className='border border-gray-300 rounded p-1 w-sm'></input>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='Name' className="mb-1 mr-2 font-normal">Github / Code Link</label>
                        <input id='Name' name='Name' value={project.projectLink}
                            onChange={(e) =>
                                setProject({ ...project, projectLink: e.target.value })
                            } className='border border-gray-300 rounded p-1 w-sm'></input>
                    </div>

                </div>
                <div className="mb-4">
                    <label htmlFor="project_desc" className="block mb-4 ">
                        Short Description
                    </label>
                    <textarea
                        id="project_desc"
                        rows={4}
                        name='project_desc'
                        value={project.projectDesc}
                        onChange={(e) =>
                            setProject({ ...project, projectDesc: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                        placeholder="What the project is about, tools or languages used ..."
                    ></textarea>
                </div>

            </form>

        </ div>
        <hr className="mb-4 border-t-2 border-black-500 w-full"></hr>
    </>
}
