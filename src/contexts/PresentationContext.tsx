
import { createContext, useContext, useState, ReactNode } from 'react';

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
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
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
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
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
      setSkills(extractedData.skills);
    }

    if (extractedData.projects && Array.isArray(extractedData.projects)) {
      setProjects(extractedData.projects);
    }

    if (extractedData.currentWork) {
      setCurrentWork(prev => ({
        ...prev,
        ...extractedData.currentWork
      }));
    }

    if (extractedData.achievements && Array.isArray(extractedData.achievements)) {
      setAchievements(extractedData.achievements);
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    const sections = 7;
    
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
      handleDataExtracted,
      calculateProgress,
      isReadyForPreview
    }}>
      {children}
    </PresentationContext.Provider>
  );
};
