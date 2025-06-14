
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Presentation, Download, X } from "lucide-react";
import { exportToPowerPoint, exportToGoogleSlides, exportToPDF, ExportData } from "@/services/exportService";
import { useToast } from "@/hooks/use-toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExportData;
}

const ExportModal = ({ isOpen, onClose, data }: ExportModalProps) => {
  const { toast } = useToast();

  const handlePowerPointExport = async () => {
    try {
      await exportToPowerPoint(data);
      toast({
        title: "Success!",
        description: "PowerPoint presentation has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export to PowerPoint. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSlidesExport = () => {
    try {
      exportToGoogleSlides(data);
      toast({
        title: "Export Initiated",
        description: "Google Slides export instructions have been opened in a new tab.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not initiate Google Slides export. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePDFExport = () => {
    try {
      exportToPDF(data);
      toast({
        title: "PDF Export Initiated",
        description: "PDF export has been opened in a new window for printing/saving.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export to PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Export Presentation
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handlePowerPointExport}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Presentation className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <CardTitle className="text-lg">Microsoft PowerPoint</CardTitle>
                <CardDescription>
                  Export as a .pptx file for PowerPoint and compatible apps
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Download size={16} className="mr-2" />
                Export to PowerPoint
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleGoogleSlidesExport}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Presentation className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <CardTitle className="text-lg">Google Slides</CardTitle>
                <CardDescription>
                  Export structured data for import into Google Slides
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Download size={16} className="mr-2" />
                Export to Google Slides
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handlePDFExport}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <FileText className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <CardTitle className="text-lg">PDF Document</CardTitle>
                <CardDescription>
                  Export as a PDF for viewing and printing
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Download size={16} className="mr-2" />
                Export to PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
