import { AttachmentDisplayData, InvestigationAttachment } from '@/models';
import { CommonIconNames, IconColors } from '@/components/icons/types';
import { AttachmentDisplayConfig } from '@/common/app-constants';

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const idx = filename.lastIndexOf('.');

  return idx === -1 ? '' : filename.substring(idx + 1).toLowerCase();
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Convert investigation attachments to display format
 */
export const convertAttachmentsForDisplay = (attachments: InvestigationAttachment[]): AttachmentDisplayData[] => {
  if (!attachments || !Array.isArray(attachments)) return [];

  return attachments.map((attachment) => {
    // Handle size - check if it's directly available or in the file object
    let sizeValue = 0;

    if (attachment.size !== undefined) {
      sizeValue = typeof attachment.size === 'string' ? parseInt(attachment.size, 10) || 0 : attachment.size || 0;
    } else if (attachment.file?.size) {
      sizeValue = attachment.file.size / 1000;
    }

    return {
      id: attachment.id || `temp-${Math.random()}`,
      name: attachment.title || attachment.fileName || attachment.file?.name || 'Untitled',
      type: getFileExtension(attachment.title || attachment.fileName || attachment.file?.name || ''),
      size: formatFileSize(sizeValue),
      fileName: attachment.fileName || attachment.file?.name || attachment.title || 'Unknown file',
      fileTitle: attachment.title,
      url: attachment.path || attachment.url || attachment.presignedUrl,
    };
  });
};

/**
 * Convert complaint review attachments to display format
 */
export const convertComplaintAttachmentsForDisplay = (attachments: Array<{
  id: string;
  name: string;
  type: 'image' | 'pdf' | string;
  size: number;
  url: string;
  file?: File;
  title?: string;
  presignedUrl?: string;
  downloadUrl?: string;
  fileUrl?: string;
} | File>) => {
  if (!attachments || !Array.isArray(attachments)) return [];

  return attachments.map((attachment, index) => {
    if (attachment instanceof File) {
      return {
        id: `file-${index}`,
        name: attachment.name || `Attachment ${index + 1}`, // Main display name
        type: attachment.type || getFileExtension(attachment.name || ''),
        size: attachment.size ? `${(attachment.size / 1024).toFixed(2)} KB` : undefined, // File size
        fileName: attachment.name, // Filename (same as name for File objects)
        fileTitle: attachment.name,
        url: URL.createObjectURL(attachment),
      };
    } else {
      // Handle attachment object - Updated for complaint attachment structure
      const fileName = attachment.name || attachment.title || `Attachment ${index + 1}`;
      // Handle size - complaint attachments have size directly, not in file object
      const fileSize = attachment.size || attachment.file?.size || 0;
      const sizeInKB = fileSize > 0
        ? `${(fileSize / 1024).toFixed(2)} KB`
        : undefined;
      // For complaint attachments, use title as the main display name
      const displayName = attachment.title || attachment.name || `Attachment ${index + 1}`;

      return {
        id: attachment.id || `obj-${index}`,
        name: displayName, // This will be the main title (e.g., "Attachment during registration")
        type: attachment.type || getFileExtension(fileName),
        size: sizeInKB, // This will be the file size (e.g., "286 KB")
        fileName: attachment.file?.name || attachment.name || attachment.title || 'Unknown file',
        fileTitle: attachment.title,
        url: attachment.url || attachment.presignedUrl || attachment.downloadUrl || attachment.fileUrl,
        path: attachment.url || attachment.presignedUrl || attachment.downloadUrl
          || attachment.fileUrl, // Add path for display
      };
    }
  });
};

/**
 * Handle download from AttachmentDisplay component
 */
export const handleDownloadFromDisplay = <T = InvestigationAttachment>(
  displayAttachment: { name: string },
  originalAttachments: InvestigationAttachment[],
  onDownload: (attachment: T) => void,
) => {
  // Find the original attachment by matching the converted data
  const originalAttachment = originalAttachments?.find((att: InvestigationAttachment) =>
    (att.title || att.fileName || att.file?.name || '') === displayAttachment.name,
  );

  if (originalAttachment) {
    onDownload(originalAttachment as T);
  }
};

/**
 * Handle download all attachments
 */
export const handleDownloadAll = <T = InvestigationAttachment>(
  attachments: InvestigationAttachment[],
  onDownload: (attachment: T) => void,
) => {
  if (Array.isArray(attachments)) {
    attachments.forEach((attachment: InvestigationAttachment) => {
      onDownload(attachment as T);
    });
  }
};

/**
 * Get file icon configuration based on file name
 * Optimized version using centralized constants
 */
export const getFileIcon = (fileName: string) => {
  if (!fileName || typeof fileName !== 'string') {
    return {
      icon: CommonIconNames.FILE_ICON,
      color: IconColors.GRAY_COLOR_ICON,
    };
  }

  const extension = getFileExtension(fileName);
  const iconConfig = AttachmentDisplayConfig.fileExtensionMap[
    extension as keyof typeof AttachmentDisplayConfig.fileExtensionMap
  ] || AttachmentDisplayConfig.fileExtensionMap.default;

  return {
    icon: CommonIconNames[iconConfig.icon as keyof typeof CommonIconNames],
    color: IconColors[iconConfig.color as keyof typeof IconColors],
  };
};

/**
 * Check if file is an image based on extension
 */
export const isImageFile = (fileName: string): boolean => {
  const extension = getFileExtension(fileName);
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

  return imageExtensions.includes(extension);
};

/**
 * Check if file is a document based on extension
 */
export const isDocumentFile = (fileName: string): boolean => {
  const extension = getFileExtension(fileName);
  const documentExtensions = ['pdf', 'doc', 'docx', 'rtf', 'txt'];

  return documentExtensions.includes(extension);
};

/**
 * Check if file is a spreadsheet based on extension
 */
export const isSpreadsheetFile = (fileName: string): boolean => {
  const extension = getFileExtension(fileName);
  const spreadsheetExtensions = ['xls', 'xlsx', 'csv'];

  return spreadsheetExtensions.includes(extension);
};

/**
 * Get file type category for display purposes
 */
export const getFileTypeCategory = (fileName: string): string => {
  if (isImageFile(fileName)) return 'Image';

  if (isDocumentFile(fileName)) return 'Document';

  if (isSpreadsheetFile(fileName)) return 'Spreadsheet';

  return 'File';
};
