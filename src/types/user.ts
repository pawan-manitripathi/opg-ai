

export interface User {
    name: string;
    profession: string;
    contactNum: string;
    location: string;
    linkedin: string;
    github: string;

    // Bachelor's details
    bachelorCourse: string;
    bachelorUniversity: string;
    bachelorStart: string;
    bachelorEnd: string;
    bachelorCgpa: string;

    // Master's details
    masterCourse: string;
    masterUniversity: string;
    masterStart: string;
    masterEnd: string;
    masterCgpa: string;

    jobTitle: string;
    companyName: string;
    employmentType: string;
    jobLocation: string;
    workDescription: string;
}


export interface PersonalInfo {
    name: string;
    profession: string;
    contactNum: string;
    location: string;
    linkedin: string;
    github: string;

}

export interface EducationInfo {
    bachelorCourse: string;
    bachelorUniversity: string;
    bachelorStart: string;
    bachelorEnd: string;
    bachelorCgpa: string;

    // Master's details
    masterCourse: string;
    masterUniversity: string;
    masterStart: string;
    masterEnd: string;
    masterCgpa: string;

}

export interface ProjectInfo {
    projectTitle: string;
    projectLink: string;
    projectDesc: string;

}

export interface ExperienceInfo {
    jobTitle: string;
    companyName: string;
    employmentType: string;
    jobLocation: string;
    workDescription: string;
}

export type SkillInfo = string;

export type SummaryInfo = string;


