
import PptxGenJS from "pptxgenjs";

export interface ExportData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    summary: string;
    yearsExperience: string;
  };
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  projects: Array<{
    name: string;
    title: string;
    description: string;
    technologies: string[];
    role: string;
    duration: string;
    achievements: string[];
    link?: string;
  }>;
  currentWork: {
    company: string;
    position: string;
    duration: string;
    achievements: string[];
    responsibilities: string[];
  };
  achievements?: Array<{
    title: string;
    description: string;
    year: string;
    organization: string;
    date: string;
    type: string;
  }>;
  references?: Array<{
    name: string;
    position: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    relationship: string;
    testimonial: string;
  }>;
  profilePhoto?: string;
  theme?: string;
}

export const exportToPowerPoint = async (data: ExportData) => {
  const pptx = new PptxGenJS();
  
  // Slide 1: Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "1E293B" };
  
  titleSlide.addText(data.personalInfo.name || "Your Name", {
    x: 1,
    y: 2,
    w: 8,
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  titleSlide.addText(data.personalInfo.title || "Your Professional Title", {
    x: 1,
    y: 3.5,
    w: 8,
    h: 1,
    fontSize: 24,
    color: "87CEEB",
    align: "center"
  });

  if (data.personalInfo.email || data.personalInfo.phone) {
    const contact = `${data.personalInfo.email || ""} ${data.personalInfo.phone ? "• " + data.personalInfo.phone : ""}`;
    titleSlide.addText(contact, {
      x: 1,
      y: 5,
      w: 8,
      h: 0.5,
      fontSize: 16,
      color: "CCCCCC",
      align: "center"
    });
  }

  // Slide 2: Professional Summary
  if (data.personalInfo.summary) {
    const summarySlide = pptx.addSlide();
    summarySlide.addText("Professional Summary", {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "1E293B"
    });
    
    summarySlide.addText(data.personalInfo.summary, {
      x: 1,
      y: 2,
      w: 8,
      h: 4,
      fontSize: 18,
      color: "374151",
      align: "left"
    });
  }

  // Slide 3: Skills
  if (data.skills.length > 0) {
    const skillsSlide = pptx.addSlide();
    skillsSlide.addText("Skills & Expertise", {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "1E293B"
    });

    const groupedSkills = data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof data.skills>);

    let yPos = 2;
    Object.entries(groupedSkills).forEach(([category, skills]) => {
      skillsSlide.addText(category, {
        x: 1,
        y: yPos,
        w: 8,
        h: 0.5,
        fontSize: 20,
        bold: true,
        color: "1E293B"
      });
      
      const skillText = skills.map(s => `${s.name} (${s.level})`).join(" • ");
      skillsSlide.addText(skillText, {
        x: 1,
        y: yPos + 0.6,
        w: 8,
        h: 0.8,
        fontSize: 14,
        color: "374151"
      });
      
      yPos += 1.5;
    });
  }

  // Slide 4: Current Work
  if (data.currentWork.company && data.currentWork.position) {
    const workSlide = pptx.addSlide();
    workSlide.addText("Current Role", {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "1E293B"
    });

    workSlide.addText(`${data.currentWork.position} at ${data.currentWork.company}`, {
      x: 1,
      y: 1.5,
      w: 8,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: "374151"
    });

    if (data.currentWork.duration) {
      workSlide.addText(data.currentWork.duration, {
        x: 1,
        y: 2.3,
        w: 8,
        h: 0.5,
        fontSize: 16,
        color: "6B7280"
      });
    }

    if (data.currentWork.achievements.length > 0) {
      workSlide.addText("Key Achievements:", {
        x: 1,
        y: 3,
        w: 8,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: "1E293B"
      });

      data.currentWork.achievements.slice(0, 4).forEach((achievement, index) => {
        workSlide.addText(`• ${achievement}`, {
          x: 1,
          y: 3.5 + (index * 0.5),
          w: 8,
          h: 0.5,
          fontSize: 14,
          color: "374151"
        });
      });
    }
  }

  // Slide 5: Key Projects
  if (data.projects.length > 0) {
    const projectsSlide = pptx.addSlide();
    projectsSlide.addText("Key Projects", {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "1E293B"
    });

    let yPos = 1.5;
    data.projects.slice(0, 2).forEach((project) => {
      projectsSlide.addText(project.name, {
        x: 1,
        y: yPos,
        w: 6,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: "1E293B"
      });

      projectsSlide.addText(project.role, {
        x: 7,
        y: yPos,
        w: 2,
        h: 0.5,
        fontSize: 14,
        color: "6B7280",
        align: "right"
      });

      projectsSlide.addText(project.description, {
        x: 1,
        y: yPos + 0.5,
        w: 8,
        h: 1,
        fontSize: 14,
        color: "374151"
      });

      if (project.technologies.length > 0) {
        projectsSlide.addText(`Technologies: ${project.technologies.join(", ")}`, {
          x: 1,
          y: yPos + 1.5,
          w: 8,
          h: 0.5,
          fontSize: 12,
          color: "6B7280"
        });
      }

      yPos += 2.5;
    });
  }

  // Download the PowerPoint file
  await pptx.writeFile({ fileName: `${data.personalInfo.name || "Presentation"}_Presentation.pptx` });
};

export const exportToGoogleSlides = (data: ExportData) => {
  // Create a structured data object that can be used to generate Google Slides
  const slidesData = {
    title: `${data.personalInfo.name || "Professional"} Presentation`,
    slides: [
      {
        type: "title",
        content: {
          title: data.personalInfo.name || "Your Name",
          subtitle: data.personalInfo.title || "Your Professional Title",
          contact: `${data.personalInfo.email || ""} ${data.personalInfo.phone || ""}`
        }
      },
      ...(data.personalInfo.summary ? [{
        type: "content",
        title: "Professional Summary",
        content: data.personalInfo.summary
      }] : []),
      ...(data.skills.length > 0 ? [{
        type: "skills",
        title: "Skills & Expertise",
        content: data.skills
      }] : []),
      ...(data.currentWork.company ? [{
        type: "work",
        title: "Current Role",
        content: data.currentWork
      }] : []),
      ...(data.projects.length > 0 ? [{
        type: "projects",
        title: "Key Projects",
        content: data.projects.slice(0, 3)
      }] : [])
    ]
  };

  // Create a Google Apps Script URL with the data
  const scriptData = encodeURIComponent(JSON.stringify(slidesData));
  const googleSlidesUrl = `https://script.google.com/macros/s/AKfycbyDH4g5g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7g7/exec?data=${scriptData}`;
  
  // For now, we'll open a new tab with instructions for the user
  const instructionsWindow = window.open("", "_blank");
  if (instructionsWindow) {
    instructionsWindow.document.write(`
      <html>
        <head><title>Export to Google Slides</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h2>Export to Google Slides</h2>
          <p>To export your presentation to Google Slides:</p>
          <ol>
            <li>Copy the JSON data below</li>
            <li>Go to <a href="https://slides.google.com" target="_blank">Google Slides</a></li>
            <li>Create a new presentation</li>
            <li>Use the "Import" feature or a Google Apps Script to import this data</li>
          </ol>
          <h3>Presentation Data:</h3>
          <textarea style="width: 100%; height: 300px; font-family: monospace;">${JSON.stringify(slidesData, null, 2)}</textarea>
          <p><em>Note: Full Google Slides integration requires Google Apps Script setup. This provides the structured data for manual import.</em></p>
        </body>
      </html>
    `);
  }
};

export const exportToPDF = (data: ExportData) => {
  // Create a temporary container for the presentation content
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.width = '8.5in';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.style.color = 'black';
  tempContainer.style.padding = '1in';
  tempContainer.style.fontFamily = 'Arial, sans-serif';
  
  // Generate HTML content for PDF
  let htmlContent = `
    <div style="text-align: center; margin-bottom: 2in;">
      <h1 style="font-size: 36px; margin-bottom: 10px;">${data.personalInfo.name || "Your Name"}</h1>
      <h2 style="font-size: 24px; color: #666; margin-bottom: 20px;">${data.personalInfo.title || "Your Professional Title"}</h2>
      <p style="font-size: 16px; color: #888;">${data.personalInfo.email || ""} ${data.personalInfo.phone || ""}</p>
    </div>
  `;

  if (data.personalInfo.summary) {
    htmlContent += `
      <div style="page-break-before: always;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px;">Professional Summary</h2>
        <p style="font-size: 16px; line-height: 1.6;">${data.personalInfo.summary}</p>
      </div>
    `;
  }

  if (data.skills.length > 0) {
    const groupedSkills = data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof data.skills>);

    htmlContent += `
      <div style="page-break-before: always;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px;">Skills & Expertise</h2>
    `;

    Object.entries(groupedSkills).forEach(([category, skills]) => {
      htmlContent += `
        <h3 style="margin-top: 20px; color: #444;">${category}</h3>
        <p style="margin-left: 20px;">${skills.map(s => `${s.name} (${s.level})`).join(" • ")}</p>
      `;
    });

    htmlContent += '</div>';
  }

  tempContainer.innerHTML = htmlContent;
  document.body.appendChild(tempContainer);

  // Use browser's print functionality to generate PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>${data.personalInfo.name || "Professional"} Presentation</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }

  document.body.removeChild(tempContainer);
};
