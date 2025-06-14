
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload, User, X } from "lucide-react";

interface PhotoUploadSectionProps {
  profilePhoto: string;
  setProfilePhoto: (photo: string) => void;
}

const PhotoUploadSection = ({ profilePhoto, setProfilePhoto }: PhotoUploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Camera size={24} className="text-blue-600" />
          Professional Photo
        </CardTitle>
        <CardDescription className="text-lg">
          Upload a professional headshot to make a great first impression. A quality photo increases interview success by 40%.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Upload Area */}
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Drop your photo here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <Button variant="outline" className="mb-2">
                <Camera size={16} className="mr-2" />
                Choose Photo
              </Button>
              <p className="text-xs text-gray-500">JPG, PNG, or GIF (max 5MB)</p>
            </div>

            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Preview Area */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px] relative">
              {profilePhoto ? (
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => setProfilePhoto("")}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <User size={64} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Your photo will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Photo Tips */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-bold mb-3 text-blue-900">📸 Perfect Photo Tips:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li>• Professional attire appropriate for the role</li>
              <li>• Clean, neutral background</li>
              <li>• Good lighting on your face</li>
            </ul>
            <ul className="space-y-2">
              <li>• Direct eye contact with camera</li>
              <li>• Confident, approachable smile</li>
              <li>• High resolution (at least 400x400px)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUploadSection;
