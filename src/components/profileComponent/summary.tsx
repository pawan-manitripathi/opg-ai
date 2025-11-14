
import React from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { SummaryInfo } from "@/types/user";


interface SummaryInfoProps {
    summary: SummaryInfo;
    setSummary: React.Dispatch<React.SetStateAction<SummaryInfo>>;
}

export default function Summary({ summary, setSummary }: SummaryInfoProps) {


    const handleSummary = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put("/api/user", {summary});
            toast.success("Summary added!");
        } catch (error: any) {
            console.error("failed to add summary:", error.message);
            toast.error("Failed to save summary");
        }
    };

    return (
        <div className='bg-white shadow-md rounded-xl p-6 m-4'>
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>

                <button form="summarybtn"
                    type="submit"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1"
                >
                    <Plus size={18} /> Add
                </button>
            </div>
            <form id="summarybtn" onSubmit={handleSummary}>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value )}
                    placeholder="Write your professional summary..."
                    className="w-full p-2 border rounded-lg"
                    rows={4}
                />


            </form>

        </div>
    );
}
