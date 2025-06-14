
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
            
            try {
              // Use pdf-parse for better PDF text extraction
              const pdfParse = await import('pdf-parse');
              const pdfData = await pdfParse.default(arrayBuffer);
              
              const textContent = pdfData.text
                .replace(/\s+/g, ' ')
                .trim();
              
              resolve(textContent);
            } catch (error) {
              console.error("PDF parsing error:", error);
              // Fallback to basic extraction if pdf-parse fails
              const uint8Array = new Uint8Array(arrayBuffer);
              const text = new TextDecoder().decode(uint8Array);
              
              const textContent = text.replace(/[^\x20-\x7E\n\r]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              
              resolve(textContent);
            }
          } else if (file.type === "text/plain" || file.name.endsWith('.txt')) {
            // Handle text files
            const textContent = (e.target?.result as string)
              .replace(/\s+/g, ' ')
              .trim();
            resolve(textContent);
          } else if (file.type === "application/msword" || 
                     file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                     file.name.endsWith('.doc') || 
                     file.name.endsWith('.docx')) {
            // For Word documents, we'll extract what we can as plain text
            // Note: This is a basic extraction - for full Word document parsing, 
            // we'd need additional libraries like mammoth.js
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const text = new TextDecoder('utf-8', { fatal: false }).decode(uint8Array);
            
            // Basic cleanup to extract readable text from Word format
            const textContent = text
              .replace(/[^\x20-\x7E\n\r]/g, ' ') // Remove non-printable characters
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim();
            
            if (textContent.length < 50) {
              throw new Error("Could not extract sufficient text from Word document. Please save as PDF or text file for better results.");
            }
            
            resolve(textContent);
          } else {
            throw new Error("Unsupported file type");
          }
        } catch (error) {
          console.error("File parsing error:", error);
          reject(new Error(`Failed to extract text from ${file.type} file: ${error instanceof Error ? error.message : 'Unknown error'}`));
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file"));
      
      if (file.type === "application/pdf" || 
          file.type === "application/msword" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.name.endsWith('.doc') || 
          file.name.endsWith('.docx')) {
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
