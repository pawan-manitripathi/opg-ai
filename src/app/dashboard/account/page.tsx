"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PersonalInfo from '@/components/profileComponent/personal-info';
import Education from '@/components/profileComponent/education';
import Skills from '@/components/profileComponent/skills';
import Projects from '@/components/profileComponent/projects';
import Experience from '@/components/profileComponent/experience';
import { ProjectInfo, ExperienceInfo, EducationInfo, PersonalInfo as PersonalInfoType } from "@/types/user";
import Summary from '@/components/profileComponent/summary';
import PublicToggle from '@/components/profileComponent/public-toggle';





export default function page() {


    const [Personal, setPersonal] = useState<PersonalInfoType>({
        name: "",
        profession: "",
        contactNum: "",
        location: "",
        linkedin: "",
        github: "",
    })

    const [summary, setSummary] = useState<string>("");

    const [education, setEducation] = useState<EducationInfo>({
        bachelorCourse: "",
        bachelorUniversity: "",
        bachelorStart: "",
        bachelorEnd: "",
        bachelorCgpa: "",

        masterCourse: "",
        masterUniversity: "",
        masterStart: "",
        masterEnd: "",
        masterCgpa: "",
    })

    const [project, setProject] = useState<ProjectInfo>({
        projectTitle: "",
        projectLink: "",
        projectDesc: "",
    })

    const [experience, setExperience] = useState<ExperienceInfo>({
        jobTitle: "",
        companyName: "",
        employmentType: "",
        jobLocation: "",
        workDescription: "",
    })

    const [skill, setSkill] = useState<string>("");







    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/user", { withCredentials: true });

                setPersonal({
                    name: res.data.user.name || "",
                    profession: res.data.user.profession || "",
                    contactNum: res.data.user.contactNum || "",
                    location: res.data.user.location || "",
                    linkedin: res.data.user.linkedin || "",
                    github: res.data.user.github || "",
                })
                setEducation({
                    bachelorCourse: res.data.user.bachelorCourse || "",
                    bachelorUniversity: res.data.user.bachelorUniversity || "",
                    bachelorStart: res.data.user.bachelorStart || "",
                    bachelorEnd: res.data.user.bachelorEnd || "",
                    bachelorCgpa: res.data.user.bachelorCgpa || "",

                    masterCourse: res.data.user.masterCourse || "",
                    masterUniversity: res.data.user.masterUniversity || "",
                    masterStart: res.data.user.masterStart || "",
                    masterEnd: res.data.user.masterEnd || "",
                    masterCgpa: res.data.user.masterCgpa || "",
                })
                setExperience({
                    jobTitle: res.data.user.jobTitle || "",
                    companyName: res.data.user.companyName || "",
                    employmentType: res.data.user.employmentType || "",
                    jobLocation: res.data.user.jobLocation || "",
                    workDescription: res.data.user.workDescription || "",
                })
                setProject({
                    projectTitle: res.data.user.projectTitle || "",
                    projectLink: res.data.user.projectLink || "",
                    projectDesc: res.data.user.projectDesc || "",

                })
                setSkill(
                    res.data.user.skill || ""
                )
                setSummary(
                    res.data.user.summary || ""
                )
                console.log(res)
            } catch (err) {
                console.error("Failed to fetch user info:", err);
            }
        };
        fetchUser();
    }, []);



    return <>
        {/* <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <PersonalInfo />
    </div> */}
        <PublicToggle />
        <PersonalInfo user={Personal} setUser={setPersonal} />
        <Summary summary={summary} setSummary={setSummary} />
        <Education user={education} setUser={setEducation} />
        <Experience experience={experience} setExperience={setExperience} />
        <Projects project={project} setProject={setProject} />
        <Skills skill={skill} setSkill={setSkill} />
    </>
}
