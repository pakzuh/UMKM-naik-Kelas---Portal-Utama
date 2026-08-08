# Panduan Deploy Situs Template Cafe ke Cloudflare Pages

> Situs ini terdiri dari **2 file utama**:
> - `index.html` — menu makanan & minuman (statis & responsive, foto dari Unsplash / SVG fallback)
> - `katalog-buku.html` — katalog buku digital (data langsung dari Google Sheets)
>
> Kamu **TIDAK perlu** setup database rumit, cukup deploy kedua file HTML ini.

---

## RINGKASAN ALUR

1. Bikin akun Cloudflare (gratis).
2. Upload file situs ke Cloudflare Pages (drag & drop) → dapat alamat gratis `*.pages.dev`.
3. Cek situs sudah tayang & atur konfigurasi nomor WhatsApp toko.
4. (Opsional) Pasang domain sendiri jika sudah memiliki domain.

---

## KONFIGURASI CEPAT CAFE ANDA (`index.html`)

Buka file `index.html` di editor teks (VSCode / Notepad / Antigravity), di bagian atas script terdapat variabel konfigurasi:

```javascript
const BRAND_CONFIG = {
  name: "Nama Cafe Anda",          // Contoh: "Cozy Haven Cafe"
  subtitle: "Kopi • Makanan • Ruang Santai",
  waNumber: "6281234567890",      // Nomor WhatsApp Toko untuk terima pesanan
  appsScriptUrl: "",              // Opsional: Web App URL jika pakai Google Sheets Backend
  sheetId: ""                     // Opsional: Google Sheets ID untuk katalog buku
};
```

---

## TAHAP 1 — Upload ke Cloudflare Pages

1. Buka **https://dash.cloudflare.com/** → Login / Register akun gratis.
2. Di menu sebelah kiri: **Compute (Workers & Pages)** → **Pages** → **Create application** → **Upload assets**.
3. Beri nama project Anda (misal: `my-cafe-template`).
4. Seret file `index.html`, `katalog-buku.html`, dan folder `assets/` ke kotak upload Cloudflare.
5. Klik **Deploy site**. Dalam beberapa detik situs Anda online di: `https://my-cafe-template.pages.dev`.

---

## TAHAP 2 — Menyesuaikan Katalog Buku (`katalog-buku.html`)

1. Buat Google Sheet baru untuk katalog buku.
2. Publish Google Sheet ke web (File -> Share -> Publish to Web).
3. Ganti `SHEET_ID` di `katalog-buku.html` dengan ID Sheet Anda.

---

## KELENGKAPAN TEMPLATE

- [x] `index.html`: Menu order online responsive & cart system.
- [x] `katalog-buku.html`: Katalog buku & perpustakaan mini.
- [x] `assets/logo.svg`: Vector logo modern cafe.
- [x] `apps-script-template.gs`: Backend Google Apps Script jika ingin integrasi Google Sheets.
- [x] `menu-data-for-sheets.tsv`: Data TSV awal untuk impor menu ke Google Sheets.
