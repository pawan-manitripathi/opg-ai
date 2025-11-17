"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Globe, Copy, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PublicToggle() {
  const [isPublic, setIsPublic] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID
        const meRes = await axios.get("/api/me", { withCredentials: true });
        setUserId(meRes.data.user.id);

        // Fetch public status
        const publicRes = await axios.get("/api/user/public", {
          withCredentials: true,
        });
        setIsPublic(publicRes.data.isPublic);
      } catch (error: any) {
        console.error("Failed to fetch profile settings:", error);
        toast.error("Failed to load profile settings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async () => {
    const newValue = !isPublic;
    setUpdating(true);

    try {
      await axios.put(
        "/api/user/public",
        { isPublic: newValue },
        { withCredentials: true }
      );
      setIsPublic(newValue);
      toast.success(
        newValue
          ? "Profile is now public!"
          : "Profile is now private"
      );
    } catch (error: any) {
      console.error("Failed to update profile visibility:", error);
      toast.error("Failed to update profile visibility");
    } finally {
      setUpdating(false);
    }
  };

  const handleCopyUrl = async () => {
    if (!userId) {
      toast.error("User ID not available");
      return;
    }

    const profileUrl = `${window.location.origin}/profile/${userId}`;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success("Profile URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy URL");
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 m-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 m-4">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Public Profile</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">
              Make profile publicly accessible
            </p>
            <p className="text-sm text-gray-500 mt-1">
              When enabled, anyone with your profile URL can view your profile
              and chat with AI about it.
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={updating}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isPublic ? "bg-blue-600" : "bg-gray-300"
            } ${updating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            role="switch"
            aria-checked={isPublic}
            aria-label="Toggle public profile"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPublic ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {isPublic && userId && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">
              Your Public Profile URL:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/profile/${userId}`}
                className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                title="Copy URL"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

