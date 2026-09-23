# 📋 Google Sheets & Instant Email Lead Guide: Madappallil Homoeo Dispensary (MHD)

This guide walks you through connecting your website's consultation booking form to a **Google Sheet** and having patient leads automatically sent to your mother's email address.

---

## 🚀 5-Minute Setup Instructions

### Step 1: Create Your Google Sheet
1. Go to [sheets.new](https://sheets.new) in your web browser.
2. Name the sheet: **`MHD Clinic Patient Leads`**.

### Step 2: Open Google Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. A code editor will open. Select and delete any code that is currently in `Code.gs`.

### Step 3: Paste the Lead Capture Script
Copy and paste the following script into the Apps Script editor:

```javascript
/**
 * MADAPPALLIL HOMOEO DISPENSARY (MHD)
 * Automated Google Sheet Lead Capture & Instant Email Notification
 */

// Replace with your mother's / clinic's email address:
const DOCTOR_EMAIL = "madappallilhomoeo@gmail.com";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create headers if sheet is empty
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
```

### Step 4: Deploy as a Web App
1. In the top right corner of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `MHD Website Lead Endpoint`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Important: Must be 'Anyone' so the website can submit leads without authentication)*
4. Click **Deploy**.
5. Grant permissions if prompted by Google (Click *Advanced* > *Go to Untitled project (unsafe)* > *Allow*).
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5: Link into the Website
1. Open the MHD website.
2. Click the **Settings (gear icon)** in the navbar or above the booking form.
3. Paste your mother's email address and the **Web App URL**.
4. Click **Save URL** and then click **Send Test Lead**.
5. Check your Google Sheet (a new row will be created) and check the email inbox (a beautifully formatted lead notification will appear)!

---

## 🛡️ Built-in Fail-Safes
- **Local Register / Lead Vault**: Every submission is automatically backed up in the browser's local storage. Even if there is a network dropout, you can click **"Leads Vault"** in the footer or menu and export a CSV spreadsheet anytime!
- **Direct WhatsApp Link**: After submitting, patients are presented with a 1-click WhatsApp button pre-filled with their appointment reference ID to chat with the clinic directly.
