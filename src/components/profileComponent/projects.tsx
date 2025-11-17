import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Save, X, Sparkles } from "lucide-react";
import type { ProjectInfo } from "@/types/user";

interface ProjectInfoProps {
    project: ProjectInfo;
    setProject: React.Dispatch<React.SetStateAction<ProjectInfo>>;
}

export default function Projects({ project, setProject }: ProjectInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempDesc, setTempDesc] = useState(project.projectDesc || "");
    const [loadingAI, setLoadingAI] = useState(false);

    const handleSave = async () => {
        try {
            await axios.put("/api/user", { ...project, projectDesc: tempDesc }, { withCredentials: true });
            setProject({ ...project, projectDesc: tempDesc });
            setIsEditing(false);
            toast.success("Project details saved!");
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to save project details");
        }
    };


    const handleCancel = () => {
        setTempDesc(project.projectDesc || "");
        setIsEditing(false);
    };


    const generateAISummary = async () => {
        if (tempDesc.trim().split(" ").length < 10) {
            toast.error("Please write at least 10 words in project description to generate AI summary.");
            return;
        }

        try {
            setLoadingAI(true);
            toast.loading("Generating AI summary...");

            const res = await axios.post("/api/ai/projectDescription", { roughDescription: tempDesc });
            toast.dismiss();

            if (!res.data.summary) throw new Error("Invalid AI response");

            setTempDesc(res.data.summary);
            setIsEditing(true);
            toast.success("AI-generated summary applied!");
        } catch (error: any) {
            toast.dismiss();
            console.error(error);
            toast.error("Failed to generate AI summary");
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
                <div className="flex gap-2">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1"
                        >
                            <Pencil size={18} /> Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={generateAISummary}
                                disabled={loadingAI}
                                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-1"
                            >
                                <Sparkles size={18} /> {loadingAI ? "Generating..." : "Generate AI Summary"}
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-1"
                            >
                                <Save size={18} /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-1"
                            >
                                <X size={18} /> Cancel
                            </button>

                        </>
                    )}
                </div>
            </div>

            <form id="projectForm" className='m-1 p-2'>
                <div className='flex justify-between mb-4'>
                    <div>
                        <label htmlFor='projectTitle' className="mb-1 mr-2 font-normal">Project Title</label>
                        <input
                            id='projectTitle'
                            name='projectTitle'
                            value={project.projectTitle}
                            disabled
                            className='border border-gray-300 rounded p-1 w-sm bg-gray-100'
                        />
                    </div>

                    <div>
                        <label htmlFor='projectLink' className="mb-1 mr-2 font-normal">Github / Code Link</label>
                        <input
                            id='projectLink'
                            name='projectLink'
                            value={project.projectLink}
                            onChange={(e) => setProject({ ...project, projectLink: e.target.value })}
                            className='border border-gray-300 rounded p-1 w-sm'
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="project_desc" className="block mb-2 font-normal">Project Description</label>
                    <textarea
                        id="project_desc"
                        rows={4}
                        name='project_desc'
                        value={tempDesc}
                        onChange={(e) => setTempDesc(e.target.value)}
                        disabled={!isEditing}
                        className={`w-full border border-gray-300 rounded-md p-2 ${!isEditing ? 'bg-gray-100' : ''}`}
                        placeholder="Enter rough project description here..."
                    ></textarea>
                </div>
            </form>
        </div>
    );
}
