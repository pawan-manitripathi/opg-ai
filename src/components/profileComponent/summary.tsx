import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Save, X, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { SummaryInfo } from "@/types/user";

interface SummaryInfoProps {
  summary: SummaryInfo;
  setSummary: React.Dispatch<React.SetStateAction<SummaryInfo>>;
}

export default function Summary({ summary, setSummary }: SummaryInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempSummary, setTempSummary] = useState(summary || "");
  const [loadingAI, setLoadingAI] = useState(false);

  
  useEffect(() => {
    setTempSummary(summary || "");
  }, [summary]);

  
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      await axios.put("/api/user", { summary: tempSummary });
      setSummary(tempSummary);
      setIsEditing(false);
      toast.success("Summary updated!");
    } catch (error: any) {
      console.error("Failed to update summary:", error?.message || error);
      toast.error("Failed to save summary");
    }
  };

  const handleCancel = () => {
    setTempSummary(summary || "");
    setIsEditing(false);
  };

  const generateAISummary = async () => {
    // enforce 10-word validation on frontend
    const wordCount = (tempSummary || "").trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10) {
      toast.error("Please write at least 10 words before generating AI summary.");
      return;
    }

    try {
      setLoadingAI(true);
      toast.loading("Generating summary...");

      const res = await axios.post("/api/ai/summary", { summary: tempSummary });

      toast.dismiss();

      if (!res.data?.summary) {
        throw new Error("Invalid AI response");
      }

      // Put AI-generated text into the textarea and keep edit mode ON
      setTempSummary(res.data.summary);
      setIsEditing(true);

      toast.success("AI summary generated! You can edit or save it.");
    } catch (error: any) {
      toast.dismiss();
      console.error("AI error:", error?.message || error);
      toast.error("Failed to generate summary");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 m-4">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>

        <div className="flex gap-2">
          {/* Generate visible only in edit mode */}
          {isEditing && (
            <button
              onClick={generateAISummary}
              disabled={loadingAI}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-1"
            >
              <Sparkles size={18} />
              {loadingAI ? "Generating..." : "Generate Summary"}
            </button>
          )}

          {/* Edit / Save / Cancel */}
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
                form="summaryForm"
                type="submit"
                onClick={handleSave}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-1"
              >
                <Save size={18} /> Save
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-1"
              >
                <X size={18} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* View Mode */}
      {!isEditing && (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {summary || "No summary added yet."}
        </p>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <form id="summaryForm" onSubmit={handleSave}>
          <textarea
            value={tempSummary}
            onChange={(e) => setTempSummary(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows={4}
            placeholder="Write your rough professional summary (min 10 words)..."
          />
          <p className="text-sm mt-2 text-gray-600">
            Words:{" "}
            {(tempSummary || "").trim().split(/\s+/).filter(Boolean).length} / 10 required
          </p>
        </form>
      )}
    </div>
  );
}

