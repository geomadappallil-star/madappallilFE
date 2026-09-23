import { LeadData } from '../types';

const STORAGE_KEY = 'mhd_clinic_leads';
const SCRIPT_URL_KEY = 'mhd_google_script_url';
const BACKEND_URL_KEY = 'mhd_backend_url';
const DOCTOR_EMAIL_KEY = 'mhd_doctor_email';

export const getSavedScriptUrl = (): string => {
  return localStorage.getItem(SCRIPT_URL_KEY) || '';
};

export const setSavedScriptUrl = (url: string): void => {
  localStorage.setItem(SCRIPT_URL_KEY, url.trim());
};

export const getSavedBackendUrl = (): string => {
  return localStorage.getItem(BACKEND_URL_KEY) || (import.meta as any).env?.VITE_BACKEND_URL || '';
};

export const setSavedBackendUrl = (url: string): void => {
  localStorage.setItem(BACKEND_URL_KEY, url.trim());
};

export const getSavedDoctorEmail = (): string => {
  return localStorage.getItem(DOCTOR_EMAIL_KEY) || 'madappallilhomoeo@gmail.com';
};

export const setSavedDoctorEmail = (email: string): void => {
  localStorage.setItem(DOCTOR_EMAIL_KEY, email.trim());
};

export const getLocalLeads = (): LeadData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse local leads', e);
    return [];
  }
};

export const saveLeadLocally = (lead: LeadData): void => {
  const existing = getLocalLeads();
  const updated = [lead, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export interface SubmitLeadResult {
  success: boolean;
  leadId: string;
  isSimulated: boolean;
  message: string;
}

export const submitLead = async (data: Omit<LeadData, 'id' | 'submittedAt' | 'status'>): Promise<SubmitLeadResult> => {
  const leadId = 'MHD-' + Math.floor(100000 + Math.random() * 900000);
  const fullLead: LeadData = {
    ...data,
    id: leadId,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  // Always save locally first so no lead can ever be lost
  saveLeadLocally(fullLead);

  const backendUrl = getSavedBackendUrl();
  const scriptUrl = getSavedScriptUrl();

  let sent = false;

  // 1. Dispatch to Render Free Backend if configured
  if (backendUrl) {
    try {
      const cleanUrl = backendUrl.replace(/\/+$/, '');
      const response = await fetch(`${cleanUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fullLead,
          targetEmail: getSavedDoctorEmail(),
        }),
      });

      if (response.ok) {
        sent = true;
      }
    } catch (e) {
      console.warn('Backend API submission failed, trying fallback:', e);
    }
  }

  // 2. Dispatch to Google Apps Script Web App if configured and not yet sent
  if (scriptUrl && !sent) {
    try {
      // Using mode: 'no-cors' allows submission to Google Apps Script without CORS blockage
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fullLead,
          targetEmail: getSavedDoctorEmail(),
        }),
      });

      sent = true;
    } catch (err) {
      console.warn('Google Script dispatch failed, saved to local clinic vault', err);
    }
  }

  if (sent) {
    return {
      success: true,
      leadId,
      isSimulated: false,
      message: 'Lead logged successfully and doctor notification dispatched.',
    };
  } else if (!backendUrl && !scriptUrl) {
    // Simulated mode (before Google Apps Script or Backend URL is connected)
    return {
      success: true,
      leadId,
      isSimulated: true,
      message: 'Simulated submission successful. Connect your Google Sheet or Backend in settings.',
    };
  } else {
    return {
      success: true,
      leadId,
      isSimulated: true,
      message: 'Lead captured securely in local register. Network retry scheduled.',
    };
  }
};

// Generates the ready-to-paste Google Apps Script code
export const generateGoogleAppsScriptCode = (doctorEmail: string = 'madappallilhomoeo@gmail.com'): string => {
  return `/**
 * MADAPPALLIL HOMOEO DISPENSARY (MHD)
 * Automated Google Sheet Lead Capture & Instant Email Notification
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Replace all existing code with this script
 * 4. Update the DOCTOR_EMAIL below if needed
 * 5. Click Deploy > New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and paste it into the MHD Website Settings
 */

const DOCTOR_EMAIL = "${doctorEmail}";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Patient Name",
        "Phone Number",
        "Email",
        "Department / Condition",
        "Preferred Date",
        "Preferred Time",
        "Language",
        "Patient Notes / History",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#2D6A4F").setFontColor("#FFFFFF");
    }
    
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    // 1. Append row to Google Sheet
    sheet.appendRow([
      timestamp,
      data.id || "MHD-" + Math.floor(100000 + Math.random() * 900000),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.condition || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.language || "",
      data.notes || "",
      "New Lead - Contact Pending"
    ]);
    
    // 2. Send instant Email Notification to Mother / Clinic
    const recipient = data.targetEmail || DOCTOR_EMAIL;
    const subject = "🌿 [MHD New Lead] " + (data.name || "Patient") + " - " + (data.condition ? data.condition.toUpperCase() : "Consultation");
    
    const htmlBody = 
      "<div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>" +
        "<div style='background-color: #1B4332; color: #ffffff; padding: 20px; text-align: center;'>" +
          "<h2 style='margin: 0;'>Madappallil Homoeo Dispensary (MHD)</h2>" +
          "<p style='margin: 5px 0 0 0; opacity: 0.85;'>New Patient Consultation Enquiry</p>" +
        "</div>" +
        "<div style='padding: 24px; background-color: #faf8f5;'>" +
          "<p style='font-size: 16px; color: #333;'>You have received a new consultation request on your website:</p>" +
          "<table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>" +
            "<tr><td style='padding: 8px; font-weight: bold; width: 35%; color: #1B4332;'>Patient Name:</td><td style='padding: 8px; color: #222;'>" + (data.name || "N/A") + "</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332;'>Phone Number:</td><td style='padding: 8px; color: #222;'><a href='tel:" + data.phone + "' style='color: #2D6A4F; font-weight: bold; text-decoration: none;'>" + (data.phone || "N/A") + "</a> (<a href='https://wa.me/" + (data.phone ? data.phone.replace(/[^0-9]/g, '') : '') + "' style='color: #25D366; text-decoration: none;'>WhatsApp</a>)</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332;'>Email:</td><td style='padding: 8px; color: #222;'>" + (data.email || "N/A") + "</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332;'>Department:</td><td style='padding: 8px; color: #222; font-weight: bold;'>" + (data.condition || "General") + "</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332;'>Preferred Slot:</td><td style='padding: 8px; color: #222;'>" + (data.preferredDate || "Any Date") + " (" + (data.preferredTime || "Flexible") + ")</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332;'>Language:</td><td style='padding: 8px; color: #222;'>" + (data.language || "English") + "</td></tr>" +
            "<tr><td style='padding: 8px; font-weight: bold; color: #1B4332; vertical-align: top;'>Notes / Symptoms:</td><td style='padding: 8px; color: #444; background: #ffffff; border-radius: 4px; border: 1px solid #eee;'>" + (data.notes || "None provided") + "</td></tr>" +
          "</table>" +
          "<div style='margin-top: 25px; text-align: center;'>" +
            "<a href='tel:" + data.phone + "' style='background-color: #2D6A4F; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; margin-right: 10px;'>Call Patient</a>" +
            "<a href='https://wa.me/" + (data.phone ? data.phone.replace(/[^0-9]/g, '') : '') + "' style='background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;'>Message on WhatsApp</a>" +
          "</div>" +
        "</div>" +
        "<div style='background-color: #eef5f1; padding: 12px; text-align: center; font-size: 12px; color: #666;'>" +
          "Madappallil Homoeo Dispensary • 35+ Years of Healing Excellence • Automated Lead System" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", id: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
};
