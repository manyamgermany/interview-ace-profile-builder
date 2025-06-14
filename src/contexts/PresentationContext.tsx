
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  yearsExperience: string;
}

export interface Skill {
  name: string;
  level: string;
  category: string;
}

export interface Project {
  name: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
  achievements: string[];
  link?: string;
}

export interface CurrentWork {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  responsibilities: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  organization: string;
  date: string;
  type: string;
}

export interface Reference {
  name: string;
  position: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  testimonial: string;
}

export interface JobDetails {
  jobTitle: string;
  company: string;
  jobDescription: string;
}

interface PresentationContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  currentWork: CurrentWork;
  setCurrentWork: (work: CurrentWork) => void;
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  references: Reference[];
  setReferences: (references: Reference[]) => void;
  profilePhoto: string;
  setProfilePhoto: (photo: string) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  jobDetails: JobDetails;
  setJobDetails: Dispatch<SetStateAction<JobDetails>>;
  handleDataExtracted: (data: any) => void;
  calculateProgress: () => number;
  isReadyForPreview: () => boolean;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const usePresentationContext = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within a PresentationProvider');
  }
  return context;
};

interface PresentationProviderProps {
  children: ReactNode;
}

export const PresentationProvider = ({ children }: PresentationProviderProps) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    yearsExperience: ""
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentWork, setCurrentWork] = useState<CurrentWork>({
    company: "",
    position: "",
    duration: "",
    achievements: [],
    responsibilities: []
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("professional");
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    jobTitle: "",
    company: "",
    jobDescription: "",
  });

  const handleDataExtracted = (extractedData: any) => {
    console.log("Extracted data:", extractedData);
    
    if (extractedData.name || extractedData.title || extractedData.email || extractedData.phone || extractedData.summary || extractedData.yearsExperience) {
      setPersonalInfo(prev => ({
        ...prev,
        name: extractedData.name || prev.name,
        title: extractedData.title || prev.title,
        email: extractedData.email || prev.email,
        phone: extractedData.phone || prev.phone,
        summary: extractedData.summary || prev.summary,
        yearsExperience: extractedData.yearsExperience || prev.yearsExperience
      }));
    }

    if (extractedData.skills && Array.isArray(extractedData.skills)) {
      const skillsWithCategory = extractedData.skills.map((skill: any) => ({
        name: skill.name || skill,
        level: skill.level || "Intermediate",
        category: skill.category || "Technical"
      }));
      setSkills(skillsWithCategory);
    }

    if (extractedData.projects && Array.isArray(extractedData.projects)) {
      const projectsWithRequiredFields = extractedData.projects.map((project: any) => ({
        name: project.name || project.title || "Untitled Project",
        title: project.title || project.name || "Untitled Project",
        description: project.description || "",
        technologies: project.technologies || [],
        role: project.role || "Developer",
        duration: project.duration || "Not specified",
        achievements: project.achievements || [],
        link: project.link
      }));
      setProjects(projectsWithRequiredFields);
    }

    if (extractedData.currentWork) {
      setCurrentWork(prev => ({
        ...prev,
        ...extractedData.currentWork
      }));
    }

    if (extractedData.achievements && Array.isArray(extractedData.achievements)) {
      const achievementsWithRequiredFields = extractedData.achievements.map((achievement: any) => ({
        title: achievement.title || "Achievement",
        description: achievement.description || "",
        year: achievement.year || achievement.date || "Unknown",
        organization: achievement.organization || "Unknown",
        date: achievement.date || achievement.year || "Unknown",
        type: achievement.type || "Professional"
      }));
      setAchievements(achievementsWithRequiredFields);
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    const sections = 8;
    
    if (jobDetails.jobTitle && jobDetails.company && jobDetails.jobDescription) completed += 1;
    if (personalInfo.name && personalInfo.title && personalInfo.summary) completed += 1;
    if (profilePhoto) completed += 1;
    if (skills.length > 0) completed += 1;
    if (projects.length > 0) completed += 1;
    if (currentWork.company && currentWork.position) completed += 1;
    if (achievements.length > 0) completed += 1;
    if (references.length > 0) completed += 1;
    
    return Math.round((completed / sections) * 100);
  };

  const isReadyForPreview = () => {
    return personalInfo.name && personalInfo.title && skills.length > 0;
  };

  return (
    <PresentationContext.Provider value={{
      personalInfo,
      setPersonalInfo,
      skills,
      setSkills,
      projects,
      setProjects,
      currentWork,
      setCurrentWork,
      achievements,
      setAchievements,
      references,
      setReferences,
      profilePhoto,
      setProfilePhoto,
      selectedTheme,
      setSelectedTheme,
      jobDetails,
      setJobDetails,
      handleDataExtracted,
      calculateProgress,
      isReadyForPreview
    }}>
      {children}
    </PresentationContext.Provider>
  );
};
