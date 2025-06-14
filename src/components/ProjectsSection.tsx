
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, Edit, Trash2, ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
  achievements: string[];
  link?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const ProjectsSection = ({ projects, setProjects }: ProjectsSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [currentProject, setCurrentProject] = useState<Project>({
    name: "",
    description: "",
    technologies: [],
    role: "",
    duration: "",
    achievements: [],
    link: ""
  });
  const [newTech, setNewTech] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const resetForm = () => {
    setCurrentProject({
      name: "",
      description: "",
      technologies: [],
      role: "",
      duration: "",
      achievements: [],
      link: ""
    });
    setNewTech("");
    setNewAchievement("");
    setIsAdding(false);
    setEditingIndex(-1);
  };

  const saveProject = () => {
    if (currentProject.name && currentProject.description) {
      if (editingIndex >= 0) {
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = currentProject;
        setProjects(updatedProjects);
      } else {
        setProjects([...projects, currentProject]);
      }
      resetForm();
    }
  };

  const editProject = (index: number) => {
    setCurrentProject(projects[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setCurrentProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    setCurrentProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setCurrentProject(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (achievement: string) => {
    setCurrentProject(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target size={20} />
          Key Projects
        </CardTitle>
        <CardDescription>
          Highlight your most impressive projects that demonstrate your capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add/Edit Project Form */}
        {isAdding && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingIndex >= 0 ? "Edit Project" : "Add New Project"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name *</label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Your Role *</label>
                  <Input
                    placeholder="Lead Developer"
                    value={currentProject.role}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <Input
                    placeholder="6 months"
                    value={currentProject.duration}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Project Link</label>
                  <Input
                    placeholder="https://github.com/..."
                    value={currentProject.link}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <Textarea
                  placeholder="Describe the project, its purpose, and your contribution..."
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-1">Technologies Used</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="React, Node.js, MongoDB..."
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                  />
                  <Button onClick={addTechnology} variant="outline" size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button onClick={() => removeTechnology(tech)}>
                        <Target size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium mb-1">Key Achievements</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Increased user engagement by 40%..."
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                  />
                  <Button onClick={addAchievement} variant="outline" size="sm">
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {currentProject.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
                      <span>• {achievement}</span>
                      <button 
                        onClick={() => removeAchievement(achievement)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveProject}>
                  {editingIndex >= 0 ? "Update Project" : "Save Project"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Project Button */}
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="w-full" variant="outline">
            <Plus size={16} className="mr-2" />
            Add New Project
          </Button>
        )}

        {/* Projects List */}
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {project.name}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {project.role} {project.duration && `• ${project.duration}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editProject(index)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteProject(index)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{project.description}</p>

                  {project.technologies.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.achievements.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {project.achievements.map((achievement, achIndex) => (
                          <li key={achIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <Target size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No projects added yet. Showcase your best work!</p>
          </div>
        )}

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">🚀 Project Selection Tips</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Choose 3-5 of your most impressive and relevant projects</li>
            <li>• Include quantifiable results and impact</li>
            <li>• Highlight projects that align with the target role</li>
            <li>• Show progression in complexity and responsibility</li>
            <li>• Include both team and individual projects</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
