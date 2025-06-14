
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Timer,
  Mic,
  Eye
} from "lucide-react";

interface PracticeModeProps {
  personalInfo: any;
  skills: any[];
  projects: any[];
  currentWork: any;
  achievements: any[];
  references: any[];
  profilePhoto: string;
  theme: string;
  onExit: () => void;
}

const PracticeMode = ({ personalInfo, skills, projects, currentWork, achievements, references, profilePhoto, theme, onExit }: PracticeModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [slideTime, setSlideTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const slides = [
    { title: "Introduction", content: "Personal Info", recommendedTime: 30 },
    { title: "Professional Summary", content: "About You", recommendedTime: 45 },
    { title: "Skills & Expertise", content: "Technical Skills", recommendedTime: 60 },
    { title: "Current Role", content: "Current Work", recommendedTime: 90 },
    { title: "Key Projects", content: "Project Portfolio", recommendedTime: 120 },
    { title: "Achievements", content: "Awards & Recognition", recommendedTime: 60 },
    { title: "References", content: "Professional Network", recommendedTime: 30 },
    { title: "Questions", content: "Q&A Session", recommendedTime: 0 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
        setSlideTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setSlideTime(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setSlideTime(0);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const resetTimer = () => {
    setTimeSpent(0);
    setSlideTime(0);
    setIsPlaying(false);
  };

  const getSlideProgress = (slideIndex: number) => {
    if (slideIndex < currentSlide) return 100;
    if (slideIndex === currentSlide) {
      const recommended = slides[slideIndex].recommendedTime;
      return recommended > 0 ? Math.min((slideTime / recommended) * 100, 100) : 0;
    }
    return 0;
  };

  const getTimeColor = (recommended: number, actual: number) => {
    if (recommended === 0) return "text-gray-600";
    if (actual < recommended * 0.8) return "text-green-600";
    if (actual < recommended * 1.2) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Practice Mode</h1>
            <p className="text-blue-200">Perfect your presentation delivery</p>
          </div>
          <Button variant="outline" onClick={onExit} className="text-white border-white hover:bg-white hover:text-black">
            <X size={20} className="mr-2" />
            Exit Practice
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Slide Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Presentation Outline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentSlide 
                        ? 'bg-blue-500/50 border-blue-400 border' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setCurrentSlide(index);
                      setSlideTime(0);
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{slide.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                    <Progress 
                      value={getSlideProgress(index)} 
                      className="h-2 mb-2" 
                    />
                    {slide.recommendedTime > 0 && (
                      <p className="text-xs text-gray-300">
                        Target: {formatTime(slide.recommendedTime)}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-2xl">
                    {slides[currentSlide].title}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Slide Time</p>
                      <p className={`text-lg font-mono ${getTimeColor(slides[currentSlide].recommendedTime, slideTime)}`}>
                        {formatTime(slideTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Total Time</p>
                      <p className="text-lg font-mono text-blue-300">
                        {formatTime(timeSpent)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-8 text-black min-h-[400px] flex items-center justify-center">
                  <div className="text-center max-w-4xl">
                    {currentSlide === 0 && (
                      <div>
                        {profilePhoto && (
                          <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200" />
                        )}
                        <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
                        <p className="text-2xl text-gray-600 mb-4">{personalInfo.title || "Your Title"}</p>
                        <p className="text-lg text-gray-700">
                          "Hi, I'm excited to share my professional journey with you today."
                        </p>
                      </div>
                    )}
                    
                    {currentSlide === 1 && (
                      <div>
                        <h2 className="text-3xl font-bold mb-6">About Me</h2>
                        <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
                          {personalInfo.summary || "Share your professional summary here..."}
                        </p>
                      </div>
                    )}
                    
                    {currentSlide === 2 && (
                      <div>
                        <h2 className="text-3xl font-bold mb-6">My Skills</h2>
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                          {skills.slice(0, 6).map((skill, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg">
                              <h3 className="font-semibold">{skill.name}</h3>
                              <p className="text-sm text-gray-600">{skill.level}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Add more slide content here */}
                    {currentSlide > 2 && (
                      <div>
                        <h2 className="text-3xl font-bold mb-6">{slides[currentSlide].title}</h2>
                        <p className="text-xl text-gray-600">
                          Present your {slides[currentSlide].content.toLowerCase()} here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  <ChevronLeft size={20} className="mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Next
                  <ChevronRight size={20} className="ml-2" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  className={isRecording ? "" : "text-white border-white hover:bg-white hover:text-black"}
                >
                  <Mic size={20} className="mr-2" />
                  {isRecording ? "Stop Recording" : "Record Practice"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  {isPlaying ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetTimer}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  <RotateCcw size={20} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Practice Tips */}
            <Card className="bg-green-500/20 border-green-400/30 mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-green-300">💡 Practice Tips:</h3>
                <ul className="text-green-100 space-y-2">
                  <li>• Maintain eye contact with your imaginary audience</li>
                  <li>• Speak clearly and at a moderate pace</li>
                  <li>• Use gestures to emphasize key points</li>
                  <li>• Practice transitioning smoothly between slides</li>
                  <li>• Time each section to fit within recommended limits</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;
