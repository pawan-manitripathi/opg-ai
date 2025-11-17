import { SkillInfo } from '@/types/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Save, X, Sparkles } from "lucide-react";

interface SkillInfoProps {
    skill: SkillInfo;
    setSkill: React.Dispatch<React.SetStateAction<SkillInfo>>;
}

export default function Skills({ skill, setSkill }: SkillInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputSkills, setInputSkills] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);


    useEffect(() => {
        setInputSkills(skill);
    }, [skill]);


    const handleSave = async () => {
        try {
            await axios.put("/api/user", { skill: inputSkills });
            setSkill(inputSkills);
            setIsEditing(false);
            toast.success("Skills updated!");
        } catch (err: any) {
            toast.error("Failed to update skills");
            console.error(err);
        }
    };


    const handleCancel = () => {
        setInputSkills(skill);
        setIsEditing(false);
    };


    const generateAISkills = async () => {
        try {
            setLoadingAI(true);
            toast.loading("Generating skills...");

            const res = await axios.get("/api/ai/skills");

            toast.dismiss();

            if (!res.data.suggestions)
                throw new Error("Invalid AI response");

            const aiSkills = res.data.suggestions.join(", ");

            setInputSkills(aiSkills);
            setIsEditing(true);

            toast.success("AI Skills Generated!");
        } catch (error: any) {
            toast.dismiss();
            toast.error("Failed to generate skills");
            console.error(error);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-4">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h1 className="text-2xl font-semibold">Skills</h1>

                <div className="flex gap-2">
                    {isEditing && (
                        <button
                            onClick={generateAISkills}
                            disabled={loadingAI}
                            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-2"
                        >
                            <Sparkles size={18} />
                            {loadingAI ? "Generating..." : "Generate Skills"}
                        </button>
                    )}

                    {!isEditing ? (

                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={18} /> Add
                        </button>
                    ) : (
                        <>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
                            >
                                <Save size={18} /> Save
                            </button>


                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        </>
                    )}

                </div>
            </div>

            {!isEditing && (
                <div className="flex flex-wrap gap-2">
                    {skill
                        ?.split(",")
                        .map(s => s.trim())
                        .filter(Boolean)
                        .map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                            >
                                {item}
                            </span>
                        ))}
                </div>
            )}

            {isEditing && (
                <textarea
                    value={inputSkills}
                    onChange={(e) => setInputSkills(e.target.value)}
                    className="w-full border rounded-lg p-3 mt-2"
                    rows={3}
                    placeholder="Enter skills separated by commas"
                />
            )}
        </div>
    );
}
