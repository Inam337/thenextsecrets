import {
  AGENCY_NAMES,
  INDIVIDUAL_NAMES,
  ISSUER_TYPES,
  FILE_EXTENSIONS,
} from '@/common/app-constants';

// Common interface for record data
export interface RecordData {
  id?: number;
  complainId?: number;
  actionId?: number;
  actionTypeId?: number;
  issueTo?: string;
  issuer?: string;
  issueToId?: number;
  agencyId?: number;
  remarks?: string;
  createdByName?: string;
  createdAt?: string;
  actionName?: string;
  actionTypeName?: string;
  attachmentCount?: number;
  modeOfCommunication?: {
    sms: boolean;
    post: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  attachments?: Attachment[];
}

// Common interface for attachments
export interface Attachment {
  id?: string;
  title: string;
  file?: File;
  fileName?: string;
  path?: string;
}

/**
 * Get the agency name based on agency ID
 */
export const getAgencyName = (agencyId?: number): string => {
  if (!agencyId) return 'Agency';

  return AGENCY_NAMES[agencyId as keyof typeof AGENCY_NAMES] || 'Agency';
};

/**
 * Get the individual name based on issueToId
 */
export const getIndividualName = (issueToId?: number): string => {
  if (!issueToId) return 'Agency';

  return INDIVIDUAL_NAMES[issueToId as keyof typeof INDIVIDUAL_NAMES] || 'Agency';
};

/**
 * Get the issue to name (individual or complainant)
 */
export const getIssueToName = (
  recordData: RecordData | null,
  selectedComplaint?: { fullName?: string },
): string => {
  if (!recordData) return 'Agency';

  const issueTo = recordData.issueTo;
  const issuer = recordData.issuer;
  const issueToId = recordData.issueToId;
  // Check both issueTo and issuer fields (for compatibility)
  const isComplainant
    = issueTo === ISSUER_TYPES.COMPLAINANT
      || issueTo === 'Complainant'
      || issuer === ISSUER_TYPES.COMPLAINANT;

  if (isComplainant) {
    return selectedComplaint?.fullName || 'Complainant';
  }

  // For agency, map issueToId to specific names
  return getIndividualName(issueToId);
};

/**
 * Get the agency name for display (for view components)
 */
export const getAgencyNameForDisplay = (recordData: RecordData | null): string => {
  if (!recordData) return 'Agency';

  const issueToId = recordData.issueToId;
  const agencyId = recordData.agencyId;

  // If we have agencyId, use it directly
  if (agencyId) {
    return getAgencyName(agencyId);
  }

  // Fallback: if we have issueToId, show generic agency name
  if (issueToId === 201 || issueToId === 202) {
    return 'Agency';
  }

  return 'Agency';
};

/**
 * Convert mode of communication object to display format
 */
export const getModeOfCommunicationDisplay = (recordData: RecordData | null): string[] => {
  if (!recordData?.modeOfCommunication) return [];

  const modes = [];
  const modeOfComm = recordData.modeOfCommunication;

  if (modeOfComm.sms) modes.push('SMS');

  if (modeOfComm.post) modes.push('By Post');

  if (modeOfComm.email) modes.push('Email');

  if (modeOfComm.whatsapp) modes.push('WhatsApp');

  return modes;
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const idx = filename.lastIndexOf('.');

  return idx === -1 ? '' : filename.substring(idx + 1).toLowerCase();
};

/**
 * Check if file is an image based on extension
 */
export const isImageFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  return FILE_EXTENSIONS.IMAGES.includes(ext as 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'webp');
};

/**
 * Check if file is a PDF based on extension
 */
export const isPdfFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  return FILE_EXTENSIONS.PDF.includes(ext as 'pdf');
};

/**
 * Check if file is a Word document based on extension
 */
export const isWordFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  return FILE_EXTENSIONS.WORD.includes(ext as 'doc' | 'docx');
};

/**
 * Check if file is an Excel file based on extension
 */
export const isExcelFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  return FILE_EXTENSIONS.EXCEL.includes(ext as 'xls' | 'xlsx');
};

/**
 * Check if file is a text file based on extension
 */
export const isTextFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  return FILE_EXTENSIONS.TEXT.includes(ext as 'txt' | 'rtf');
};

/**
 * Convert mode of communication array to object format
 */
export const convertModeOfCommunicationToObject = (modes: string[]) => {
  return {
    sms: modes.includes('SMS'),
    post: modes.includes('By Post'),
    email: modes.includes('Email'),
    whatsapp: modes.includes('WhatsApp'),
  };
};

/**
 * Convert mode of communication object to array format
 */
export const convertModeOfCommunicationToArray = (modeOfComm: {
  sms: boolean;
  post: boolean;
  email: boolean;
  whatsapp: boolean;
}): string[] => {
  const modes = [];

  if (modeOfComm.sms) modes.push('SMS');

  if (modeOfComm.post) modes.push('By Post');

  if (modeOfComm.email) modes.push('Email');

  if (modeOfComm.whatsapp) modes.push('WhatsApp');

  return modes;
};
