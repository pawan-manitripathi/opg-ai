"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  ContactRound,
  MapPin,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import AIChat from "@/components/profileComponent/ai-chat";
import Link from "next/link";

interface ProfileData {
  id: number;
  name: string;
  profession: string | null;
  contactNum: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
  bachelorCourse: string | null;
  bachelorUniversity: string | null;
  bachelorCgpa: string | null;
  bachelorStart: string | null;
  bachelorEnd: string | null;
  masterCourse: string | null;
  masterUniversity: string | null;
  masterCgpa: string | null;
  masterStart: string | null;
  masterEnd: string | null;
  jobTitle: string | null;
  companyName: string | null;
  employmentType: string | null;
  jobLocation: string | null;
  workDescription: string | null;
  projectTitle: string | null;
  projectLink: string | null;
  projectDesc: string | null;
  skill: string | null;
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/profile/${params.id}`);
        setProfile(response.data.profile);
      } catch (err: any) {
        console.error("Failed to fetch profile:", err);
        if (err.response?.status === 404) {
          setError("Profile not found");
        } else if (err.response?.status === 403) {
          setError("This profile is not publicly accessible");
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProfile();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {error || "Profile Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error ||
              "The profile you're looking for doesn't exist or is not available."}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              {profile.profession && (
                <p className="text-xl text-gray-600 mt-1">
                  {profile.profession}
                </p>
              )}
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center gap-2 border-b pb-3 mb-4">
                <ContactRound className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.contactNum && (
                  <div className="flex items-center gap-2">
                    <ContactRound className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{profile.contactNum}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                )}
                {profile.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {profile.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-gray-800" />
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {profile.summary && (
              <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">Professional Summary</h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {profile.summary}
                </p>
              </div>
            )}

            {/* Education */}
            {(profile.bachelorCourse ||
              profile.masterCourse ||
              profile.bachelorUniversity ||
              profile.masterUniversity) && (
              <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold">Education</h2>
                </div>
                <div className="space-y-4">
                  {profile.bachelorCourse && (
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold text-gray-800">
                        {profile.bachelorCourse}
                      </h3>
                      {profile.bachelorUniversity && (
                        <p className="text-gray-600">{profile.bachelorUniversity}</p>
                      )}
                      {(profile.bachelorStart || profile.bachelorEnd) && (
                        <p className="text-sm text-gray-500">
                          {profile.bachelorStart} - {profile.bachelorEnd}
                        </p>
                      )}
                      {profile.bachelorCgpa && (
                        <p className="text-sm text-gray-500">
                          CGPA: {profile.bachelorCgpa}
                        </p>
                      )}
                    </div>
                  )}
                  {profile.masterCourse && (
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold text-gray-800">
                        {profile.masterCourse}
                      </h3>
                      {profile.masterUniversity && (
                        <p className="text-gray-600">{profile.masterUniversity}</p>
                      )}
                      {(profile.masterStart || profile.masterEnd) && (
                        <p className="text-sm text-gray-500">
                          {profile.masterStart} - {profile.masterEnd}
                        </p>
                      )}
                      {profile.masterCgpa && (
                        <p className="text-sm text-gray-500">
                          CGPA: {profile.masterCgpa}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Experience */}
            {profile.jobTitle && (
              <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-semibold">Experience</h2>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {profile.jobTitle}
                  </h3>
                  {profile.companyName && (
                    <p className="text-gray-600">{profile.companyName}</p>
                  )}
                  {profile.employmentType && (
                    <p className="text-sm text-gray-500">
                      {profile.employmentType}
                    </p>
                  )}
                  {profile.jobLocation && (
                    <p className="text-sm text-gray-500">{profile.jobLocation}</p>
                  )}
                  {profile.workDescription && (
                    <p className="text-gray-700 mt-3 leading-relaxed whitespace-pre-line">
                      {profile.workDescription}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {profile.projectTitle && (
              <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <Code className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold">Projects</h2>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {profile.projectTitle}
                  </h3>
                  {profile.projectLink && (
                    <a
                      href={profile.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Project →
                    </a>
                  )}
                  {profile.projectDesc && (
                    <p className="text-gray-700 mt-3 leading-relaxed whitespace-pre-line">
                      {profile.projectDesc}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.skill && (
              <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <Code className="h-5 w-5 text-pink-600" />
                  <h2 className="text-xl font-semibold">Skills</h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {profile.skill}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - AI Chat */}
          <div className="lg:col-span-1">
            <AIChat userId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

