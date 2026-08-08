// ============================================================
// Google Apps Script - Web Order Control (Template Cafe)
// Spreadsheet: Web Order Control & Menu Manager
// Deploy sebagai Web App:
//   Execute as: Me (Pemilik Spreadsheet)
//   Who has access: Anyone
// ============================================================

// Ganti SPREADSHEET_ID dengan ID Google Spreadsheet Anda
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : null;
  if (action === 'menu') return getMenu();
  return respond({ error: 'Unknown action' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('PESANAN');

    const orderId = (e.parameter && e.parameter.orderId) || ('ORD-' + Date.now().toString().slice(-6));
    const ts = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd-MM-yyyy HH:mm:ss');

    sheet.appendRow([
      ts,
      orderId,
      data.nama  || '-',
      data.meja  || '-',
      data.items || '-',
      data.total || 0,
      'Pending'
    ]);

    return respond({ success: true, orderId: orderId });
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

function getMenu() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('MENU');
  const rows = sheet.getDataRange().getValues();
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[2]) continue; // skip baris kosong
    items.push({
      id:       r[0],
      kategori: r[1],
      nama:     r[2],
      harga:    r[3],
      status:   r[4] || 'Tersedia'
    });
  }

  return respond({ items: items });
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
