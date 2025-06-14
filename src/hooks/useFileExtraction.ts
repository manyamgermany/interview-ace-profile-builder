
import { useState } from "react";

export const useFileExtraction = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          if (file.type === "application/pdf") {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            
            // Use pdf-parse for better PDF text extraction
            const pdfParse = await import('pdf-parse');
            const pdfData = await pdfParse.default(arrayBuffer);
            
            const textContent = pdfData.text
              .replace(/\s+/g, ' ')
              .trim();
            
            resolve(textContent);
          } else {
            // Handle text files
            const textContent = (e.target?.result as string)
              .replace(/\s+/g, ' ')
              .trim();
            resolve(textContent);
          }
        } catch (error) {
          console.error("PDF parsing error:", error);
          // Fallback to basic extraction if pdf-parse fails
          try {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const text = new TextDecoder().decode(uint8Array);
            
            const textContent = text.replace(/[^\x20-\x7E\n\r]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            
            resolve(textContent);
          } catch (fallbackError) {
            reject(new Error("Failed to extract text from PDF file"));
          }
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file"));
      
      if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  return {
    isUploading,
    setIsUploading,
    uploadSuccess,
    setUploadSuccess,
    extractTextFromFile
  };
};
