
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUploadFile = (file: File): FileValidationResult => {
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size must be less than 10MB"
    };
  }

  // Check file type
  const validTypes = [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const validExtensions = ['.pdf', '.txt', '.doc', '.docx'];
  
  const hasValidType = validTypes.includes(file.type);
  const hasValidExtension = validExtensions.some(ext => 
    file.name.toLowerCase().endsWith(ext)
  );

  if (!hasValidType && !hasValidExtension) {
    return {
      isValid: false,
      error: "Please upload a PDF, Word document (.doc/.docx), or text file (.txt)"
    };
  }

  return { isValid: true };
};

export const isValidFileType = (file: File): boolean => {
  return validateUploadFile(file).isValid;
};
