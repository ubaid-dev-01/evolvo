# Google Apps Script Setup (Evolvo Hiring)

## Overview

Data flow:

```
Next.js Form (FormData POST)
  -> Google Apps Script Web App
    -> Google Drive (CV files, role-based folders)
    -> Google Sheet (data + CV link)
```

## Drive Folder Structure

Create a root folder and allow the script to auto-create role folders:

```
Evolvo Hiring/
  Fullstack Developer/
  Expert Meta Marketer/
  PHP Developer/
```

## File Naming

Save CV files as:

```
Role_FullName_Timestamp.ext
```

Example:
`Fullstack Developer_John Doe_20260206143000.pdf`

## File Validation (Required)

- Max size: 10 MB
- Allowed types: PDF, DOC, DOCX
- Reject everything else

## Google Sheet Columns (Example)

One row per submission. Suggested columns:

```
Timestamp | Role | Name | WhatsApp | Salary | CV Link | ...other fields
```

## CV Upload: Base64 (Required)

The Next.js app sends the CV as **base64 string** in FormData (not as a raw file), because Google Apps Script Web App does not expose multipart file uploads in `e.parameter`. The client sends:

- `cv` – base64-encoded file content (string)
- `cvFileName` – original file name (e.g. `resume.pdf`)

In your script, replace the CV handling with:

1. Read base64 and filename from parameters:
   ```javascript
   const cvBase64 = e.parameter.cv;
   const cvFileName = e.parameter.cvFileName || 'cv.pdf';
   if (!cvBase64) {
     return jsonResponse(false, 'CV file is missing.');
   }
   ```

2. Decode and create a Blob, then validate and save:
   ```javascript
   const cvBlob = Utilities.newBlob(
     Utilities.base64Decode(cvBase64),
     null,  // or detect MIME from cvFileName
     cvFileName
   );
   if (cvBlob.getBytes().length > MAX_FILE_SIZE_BYTES) {
     return jsonResponse(false, 'File size exceeds 10 MB.');
   }
   const ext = (cvFileName.split('.').pop() || '').toLowerCase();
   if (!['pdf', 'doc', 'docx'].includes(ext)) {
     return jsonResponse(false, 'Only PDF, DOC, DOCX files are allowed.');
   }
   // Then save cvBlob to Drive (same as before) and append row with CV link.
   ```

Use the same folder logic and file naming (`Role_FullName_Timestamp.ext`) as in the rest of your script.

## Notes

- Do not expose Sheet IDs or API keys in the frontend.
- Apps Script runs as the script owner.
- Limit Drive folder sharing to HR/team only.
