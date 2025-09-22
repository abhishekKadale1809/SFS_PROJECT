/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface EnquiryCreateRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string; // ISO string
}

export interface EnquiryCreateResponse {
  success: true;
  enquiry: Enquiry;
}

export interface EnquiryListResponse {
  success: true;
  data: Enquiry[];
}
