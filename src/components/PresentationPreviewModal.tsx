
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import PresentationPreview from "./PresentationPreview";
import { usePresentationContext } from "@/contexts/PresentationContext";
import { useState } from "react";
import ExportModal from "./ExportModal";

interface PresentationPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PresentationPreviewModal = ({ isOpen, onClose }: PresentationPreviewModalProps) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const {
    personalInfo,
    skills,
    projects,
    currentWork,
    achievements,
    references,
    profilePhoto,
    selectedTheme,
    calculateProgress
  } = usePresentationContext();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Presentation Preview
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={calculateProgress() < 75}
                  className="flex items-center gap-2"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Download size={16} />
                  Export
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X size={16} />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto">
            <PresentationPreview 
              personalInfo={personalInfo}
              skills={skills}
              projects={projects}
              currentWork={currentWork}
              achievements={achievements}
              references={references}
              profilePhoto={profilePhoto}
              theme={selectedTheme}
            />
          </div>
        </DialogContent>
      </Dialog>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={{
          personalInfo,
          skills,
          projects,
          currentWork,
          achievements,
          references,
          profilePhoto,
          theme: selectedTheme
        }}
      />
    </>
  );
};

export default PresentationPreviewModal;
