// ============================================================
// Samurai Cricket Club — Expense Tracker (Google Apps Script)
// ============================================================
// SETUP:
//   1. Open Google Sheets → Extensions → Apps Script
//   2. Paste this entire file into the editor
//   3. Click Deploy → New Deployment → Web App
//   4. Execute as: Me | Who has access: Anyone
//   5. Copy the Web App URL and share it with the frontend app
//
// NOTE: All operations use GET requests to avoid CORS issues.
//       Data is passed via URL query parameters.
// ============================================================

const SHEET_NAME = 'Transactions';

// ── HTTP Handler (GET only — avoids CORS issues) ────────────

function doGet(e) {
  const p = (e && e.parameter) || {};
  const action = p.action || '';

  let result;
  switch (action) {

    // ── Read operations ──
    case 'getAll':
      result = getAllTransactions();
      break;
    case 'getBalance':
      result = getBalanceSummary();
      break;
    case 'getMembers':
      result = getMembers();
      break;

    // ── Write operations (via GET params to avoid CORS) ──
    case 'add':
      result = addTransaction({
        type:        p.type        || '',
        description: p.description || '',
        amount:      p.amount      || 0,
        recordedBy:  p.recordedBy  || '',
        date:        p.date        || '',
        category:    p.category    || ''
      });
      break;
    case 'delete':
      result = deleteTransaction(p.id);
      break;
    case 'addMember':
      result = addMember(p.name);
      break;

    default:
      result = { success: false, error: 'Unknown action: ' + action };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPost kept as fallback (may not work from browsers due to CORS)
function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  let result;
  switch (data.action) {
    case 'add':
      result = addTransaction(data);
      break;
    case 'delete':
      result = deleteTransaction(data.id);
      break;
    case 'addMember':
      result = addMember(data.name);
      break;
    default:
      result = { success: false, error: 'Unknown action: ' + data.action };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Sheet Helpers ───────────────────────────────────────────

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange('1:1').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function txSheet() {
  return getOrCreateSheet(SHEET_NAME, [
    'ID', 'Timestamp', 'Type', 'Description', 'Amount',
    'RecordedBy', 'Date', 'Category'
  ]);
}

function membersSheet() {
  return getOrCreateSheet('Members', ['Name', 'AddedOn']);
}

// ── Transactions ────────────────────────────────────────────

function getAllTransactions() {
  const sheet = txSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0].map(h => h.toString().toLowerCase());
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    headers.forEach((h, j) => {
      obj[h] = rows[i][j];
    });
    // Format dates to ISO strings
    if (obj.timestamp instanceof Date) obj.timestamp = obj.timestamp.toISOString();
    if (obj.date instanceof Date) obj.date = obj.date.toISOString().split('T')[0];
    data.push(obj);
  }

  return { success: true, data: data };
}

function addTransaction(d) {
  const sheet = txSheet();
  const id = Utilities.getUuid();
  const timestamp = new Date().toISOString();

  sheet.appendRow([
    id,
    timestamp,
    d.type || '',
    d.description || '',
    parseFloat(d.amount) || 0,
    d.recordedBy || '',
    d.date || new Date().toISOString().split('T')[0],
    d.category || ''
  ]);

  return { success: true, id: id, message: 'Transaction added!' };
}

function deleteTransaction(id) {
  const sheet = txSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Deleted.' };
    }
  }

  return { success: false, message: 'Transaction not found.' };
}

// ── Balance ─────────────────────────────────────────────────

function getBalanceSummary() {
  const sheet = txSheet();
  const rows = sheet.getDataRange().getValues();

  let contributions = 0, expenses = 0, sponsorships = 0;

  for (let i = 1; i < rows.length; i++) {
    const type = (rows[i][2] || '').toString();
    const amount = parseFloat(rows[i][4]) || 0;

    if (type === 'Contribution') contributions += amount;
    else if (type === 'Expense') expenses += amount;
    else if (type === 'Sponsorship') sponsorships += amount;
  }

  return {
    success: true,
    data: {
      contributions: contributions,
      expenses: expenses,
      sponsorships: sponsorships,
      balance: contributions + sponsorships - expenses
    }
  };
}

// ── Members ─────────────────────────────────────────────────

function getMembers() {
  const sheet = membersSheet();
  const rows = sheet.getDataRange().getValues();
  const names = [];

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]) names.push(rows[i][0].toString());
  }

  return { success: true, data: names };
}

function addMember(name) {
  if (!name || !name.trim()) {
    return { success: false, message: 'Name is required.' };
  }

  const sheet = membersSheet();
  const rows = sheet.getDataRange().getValues();

  // Check duplicate
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] && rows[i][0].toString().toLowerCase() === name.trim().toLowerCase()) {
      return { success: false, message: 'Member already exists.' };
    }
  }

  sheet.appendRow([name.trim(), new Date().toISOString()]);
  return { success: true, message: 'Member added!' };
}
