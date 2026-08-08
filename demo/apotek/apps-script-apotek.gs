// ================================================================
// apps-script-apotek.gs
// Deploy: Execute as Me | Who has access: Anyone
//
// Cara deploy:
//   1. Buka Google Apps Script → New Project
//   2. Paste seluruh kode ini
//   3. Ganti SPREADSHEET_ID di bawah
//   4. Deploy → New deployment → Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Copy URL deployment → paste ke index.html (CFG.appsScriptUrl)
// ================================================================

const SPREADSHEET_ID = 'GANTI_DENGAN_SPREADSHEET_ID_KAMU';

// ----------------------------------------------------------------
// doGet — ambil data produk
// URL: <deploy_url>?action=produk
// ----------------------------------------------------------------
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (action === 'produk') {
      const sheet = ss.getSheetByName('PRODUK');
      if (!sheet) return jsonOut({ status: 'error', message: 'Sheet PRODUK tidak ditemukan' });

      const vals = sheet.getDataRange().getValues();
      if (vals.length < 2) return jsonOut({ status: 'ok', data: [] });

      const headers = vals[0].map(h => String(h).trim());
      const data = vals.slice(1)
        .filter(row => row[0] !== '' && row[0] !== null && row[0] !== undefined)
        .map(row => {
          const obj = {};
          headers.forEach((h, i) => { obj[h] = row[i]; });
          return obj;
        });

      return jsonOut({ status: 'ok', data: data });
    }

    return jsonOut({ status: 'error', message: 'Action tidak dikenal: ' + action });

  } catch (err) {
    return jsonOut({ status: 'error', message: err.message });
  }
}

// ----------------------------------------------------------------
// doPost — simpan pesanan ke sheet PESANAN
// Body JSON: { nama, telepon, items, total, catatan }
// orderId dikirim via URL param: ?orderId=ORD-XXXXXX
// ----------------------------------------------------------------
function doPost(e) {
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('PESANAN');
    if (!sheet) return jsonOut({ status: 'error', message: 'Sheet PESANAN tidak ditemukan' });

    // orderId dari URL param (agar tidak hilang saat Google redirect)
    const orderId = (e.parameter && e.parameter.orderId)
      || ('ORD-' + Date.now().toString().slice(-6));

    const body = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),           // A: TIMESTAMP
      orderId,              // B: ORDER_ID
      body.nama    || '',   // C: NAMA
      body.telepon || '',   // D: TELEPON
      body.items   || '',   // E: ITEMS
      body.total   || 0,    // F: TOTAL
      'Pending',            // G: STATUS
      body.catatan || '',   // H: CATATAN
    ]);

    return jsonOut({ status: 'ok', orderId: orderId });

  } catch (err) {
    return jsonOut({ status: 'error', message: err.message });
  }
}

// ----------------------------------------------------------------
// Helper
// ----------------------------------------------------------------
function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
