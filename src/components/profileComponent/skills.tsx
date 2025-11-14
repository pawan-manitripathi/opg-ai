import { SkillInfo } from '@/types/user';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface SkillInfoProps {
    skill: SkillInfo;
    setSkill: React.Dispatch<React.SetStateAction<SkillInfo>>;
}

export default function Skills({ skill, setSkill }: SkillInfoProps) {

    
    const skillList = skill
        ? skill.split(",").map(s => s.trim()).filter(Boolean)
        : [];


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put("/api/user", { skill });
            toast.success("Skills added successfully!");
            
        } catch (error: any) {
            console.error("failed to add skills:", error.message);
            toast.error("failed to add skills. Try again!");

        }

    };

    return <>
        <div className='bg-white shadow-md rounded-xl p-6 m-4'>
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Skills</h1>

            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value )}

                    placeholder="Enter your skill"
                    className="flex-1 px-3 py-2 border rounded-lg"
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1"
                >
                    <Plus size={16} /> Add
                </button>

            </form>
            <div className="flex flex-wrap gap-2">
                {skillList.map((item, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </ div>
    </>
}


