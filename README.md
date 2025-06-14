
# PitchPerfect - AI-Powered Presentation Builder

PitchPerfect is an intelligent presentation builder that helps professionals create compelling career presentations using AI technology. Upload your resume and let AI extract and organize your professional information into a polished presentation.

## 🚀 Features

### Smart Import
- **AI Resume Processing**: Upload PDF, Word, or text resumes and let AI automatically extract your professional information
- **Multiple File Formats**: Supports PDF (.pdf), Word documents (.doc/.docx), and text files (.txt)
- **Intelligent Data Extraction**: AI identifies and organizes personal info, skills, projects, work experience, and achievements
- **Progress Tracking**: Real-time progress updates during file processing

### Comprehensive Profile Builder
- **Personal Information**: Name, title, contact details, and professional summary
- **Skills Management**: Add technical and soft skills with proficiency levels
- **Project Showcase**: Highlight key projects with descriptions and technologies used
- **Work Experience**: Current position, responsibilities, and achievements
- **Awards & Recognition**: Professional achievements and certifications
- **Professional References**: Contact information for references
- **Profile Photo**: Upload and crop professional headshots

### AI-Powered Enhancements
- **Multiple AI Providers**: Support for OpenAI, Anthropic, Google, and Perplexity
- **Content Enhancement**: AI can improve and refine your content
- **Practice Mode**: AI-powered interview practice with your presentation data
- **Job Alignment**: Tailor your presentation to specific job descriptions

### Presentation Features
- **Theme Selection**: Choose from multiple professional themes
- **Live Preview**: See your presentation in real-time as you build it
- **Progress Tracking**: Visual progress indicator showing completion status
- **Export Options**: Generate PDF presentations (75% completion required)

## 📋 How to Use

### 1. Initial Setup

1. **Configure AI Provider** (Required for Smart Import)
   - Click on "AI Assistant Settings" 
   - Choose your preferred AI provider (OpenAI, Anthropic, Google, or Perplexity)
   - Enter your API key
   - Select the appropriate model
   - Save configuration

### 2. Smart Import (Recommended)

1. **Upload Resume**
   - Click "Choose File" in the Smart Import section
   - Select your resume file (PDF, DOC, DOCX, or TXT)
   - Maximum file size: 10MB
   - Wait for AI processing (progress bar will show status)

2. **Review Extracted Data**
   - AI will automatically populate your profile sections
   - Review and edit the extracted information as needed
   - All data can be modified after import

### 3. Manual Profile Building

If you prefer to build your profile manually or want to add additional information:

#### Personal Information Tab
- Fill in your full name and professional title
- Add contact information (email, phone)
- Write a compelling professional summary
- Specify years of experience

#### Photo Tab
- Upload a professional headshot
- Use the cropping tool to adjust the image
- Recommended: High-quality, professional photo

#### Skills Tab
- Add technical and soft skills
- Set proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Focus on 5-7 key skills relevant to your target role

#### Projects Tab
- Showcase 2-4 key projects
- Include project titles, descriptions, and technologies used
- Highlight quantifiable results and impact

#### Current Work Tab
- Add your current position and company
- List key responsibilities and achievements
- Include duration and notable accomplishments

#### Awards Tab
- Add professional achievements, certifications, and recognition
- Include titles, descriptions, and years received

#### References Tab
- Add professional references with contact information
- Include name, position, company, and contact details

### 4. Job Details (Optional but Recommended)

- Add the job description you're targeting
- AI can help align your presentation content with job requirements
- Improves relevance and impact of your presentation

### 5. Theme Selection

- Choose from available professional themes
- Preview how your content looks in different themes
- Select the theme that best represents your professional brand

### 6. Preview and Practice

1. **Preview Presentation**
   - Click "Preview Presentation" when ready (requires sufficient completion)
   - Review your presentation in full-screen mode
   - Make adjustments as needed

2. **Practice Mode**
   - Available at 50% completion
   - AI-powered interview practice using your presentation data
   - Get feedback and improve your delivery

3. **Export PDF**
   - Available at 75% completion
   - Generate a professional PDF of your presentation
   - Perfect for sharing with potential employers

## 🎯 Pro Tips

- **Professional Photo**: Upload a high-quality headshot for maximum impact
- **Concise Summary**: Keep your professional summary compelling but under 150 words
- **Key Skills**: Highlight 5-7 core skills with specific expertise levels
- **Quantifiable Achievements**: Include numbers, percentages, and measurable results
- **Job Alignment**: Use the job description feature to tailor your presentation
- **Regular Updates**: Keep your presentation current with latest achievements

## 🔧 Technical Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features
- AI provider API key for Smart Import and Practice Mode

## 📱 Supported File Formats

### Resume Upload
- **PDF**: .pdf files with text content (not image-based)
- **Word**: .doc and .docx files
- **Text**: .txt files
- **Size Limit**: 10MB maximum

### Photo Upload
- **Images**: .jpg, .jpeg, .png, .gif, .webp
- **Size Limit**: 5MB maximum
- **Recommendation**: Professional headshots work best

## 🚨 Troubleshooting

### Common Issues

**"AI Configuration Required" Error**
- Ensure you've selected an AI provider
- Verify your API key is correct and has sufficient credits
- Check your internet connection

**"Could not extract text from PDF"**
- Ensure PDF contains readable text (not just images)
- Try saving the PDF as a text file instead
- Use a different PDF viewer to save/export the file

**Upload Failed**
- Check file size (must be under 10MB)
- Verify file format is supported
- Try a different file or format

**Slow Processing**
- Large files take longer to process
- Check the progress bar for current status
- Ensure stable internet connection

## 🔒 Privacy & Security

- Your data is processed securely using your chosen AI provider
- No data is stored permanently on our servers
- API keys are stored locally in your browser
- Resume content is only sent to your configured AI provider

## 🏗️ Development

### Project Structure
```
src/
├── components/           # React components
│   ├── file-upload/     # File upload related components
│   └── ui/              # UI components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── services/            # API services
└── utils/               # Utility functions
```

### Technologies Used
- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, Shadcn UI
- **File Processing**: pdf-parse for PDF text extraction
- **AI Integration**: Multiple provider support (OpenAI, Anthropic, Google, Perplexity)

## 📞 Support

For technical issues or questions:
- Check the troubleshooting section above
- Review the progress indicators for processing status
- Ensure your AI provider configuration is correct

---

## Project Setup (for developers)

**URL**: https://lovable.dev/projects/1b747b92-ff45-4f56-9d6d-ff60ce349325

### Development Setup

**Use Lovable**
Simply visit the [Lovable Project](https://lovable.dev/projects/1b747b92-ff45-4f56-9d6d-ff60ce349325) and start prompting.

**Local Development**
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

### Deployment
Click the Publish button in Lovable or deploy using your preferred hosting service.

### Custom Domain
Connect your custom domain through Project > Settings > Domains in Lovable.
