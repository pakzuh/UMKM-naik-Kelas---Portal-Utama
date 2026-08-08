# Rencana Digital Katalog Buku — Perpus Library Cafe

> Dokumen rencana (belum dieksekusi). Proyek ini TERPISAH dari sistem pemesanan makanan/minuman
> (`index.html` + `RENCANA-INTEGRASI-GOOGLE-SHEETS.md`) — datanya beda (buku, bukan menu), jadi
> dibangun sebagai halaman baru sendiri, bukan digabung ke situs menu.

---

## 1. Kondisi Saat Ini

- Media: Google Spreadsheet (manual/pasif) — pelanggan scan barcode/QR untuk lihat daftar buku.
- Struktur data yang sudah ada: Judul Buku, Penerbit, Nama Penulis, Tahun Terbit, Genre/Kategori (Fiksi, Non-Fiksi, Akademis, dll).
- Masalahnya: pelanggan cuma bisa scroll tabel mentah, nggak ada cara cari cepat kalau catalog-nya udah banyak.

---

## 2. Rencana: Digital Catalog dengan Search

Transisi dari tabel spreadsheet biasa jadi halaman pencarian interaktif (konsepnya mirip pencarian menu digital, tapi ini buat katalog buku).

**Cara kerja pencarian:**
- Input: cari berdasarkan **Judul Buku** atau **Nama Penulis**.
- Ketemu → tampilkan detail lengkap buku (Judul, Penulis, Penerbit, Tahun Terbit, Genre, Status Ketersediaan).
- Nggak ketemu → tampilkan pesan "Buku tidak ditemukan".
- Pencarian dilakukan di sisi browser (client-side, filter dari data yang sudah diambil sekali di awal) — cepat, nggak perlu nunggu request tiap ngetik huruf, asal jumlah bukunya belum sampai ribuan (kalau nanti udah sangat banyak, baru dipertimbangkan pencarian di sisi server).

---

## 3. Status Ketersediaan (pengganti "Sold Out" — istilah lebih pas buat buku)

Sama kayak fitur Sold Out di rencana menu makanan, tapi istilahnya disesuaikan buat konteks buku. Kolom **Status** di Sheet, dropdown pilihan:
- **Tersedia** — bisa dibaca/dipinjam
- **Dipinjam** — lagi dipinjam pengunjung lain
- **Hilang/Rusak** — nggak bisa dipakai sementara

Di halaman katalog, status ini ditampilkan sebagai badge warna di tiap hasil pencarian (mis. hijau = Tersedia, kuning = Dipinjam, abu = Hilang/Rusak) — pelanggan langsung tahu tanpa perlu tanya staff.

---

## 4. Arsitektur Teknis

Pola yang sama dengan bagian "Kontrol Harga & Sold Out" di rencana menu makanan — karena kasusnya mirip (data di Sheet, staff yang update, situs yang baca):

1. **Sheet "Katalog Buku"** — 1 baris = 1 buku. Kolom: ID Buku (opsional tapi disarankan, biar stabil kalau judul mirip-mirip), Judul, Penulis, Penerbit, Tahun Terbit, Genre, Status Ketersediaan (dropdown).
2. **Apps Script `doGet`** — endpoint publik, read-only, expose data Sheet itu sebagai JSON. Nggak perlu token (sama seperti data harga menu — ini memang informasi buat dilihat pengunjung, bukan data sensitif).
3. **Halaman baru `katalog-buku.html`** — saat dibuka, fetch semua data buku sekali di awal (tampilkan loading singkat), lalu:
   - Kalau nggak ada kata kunci: tampilkan seluruh daftar (atau bisa dikelompokkan per Genre, opsional).
   - Kalau ada kata kunci di kotak search: filter live di JS berdasarkan Judul/Penulis (cocok sebagian, case-insensitive, jadi nggak perlu ketik persis).
   - Kalau fetch ke Apps Script gagal (internet lemot dll): tampilkan pesan error + tombol "Coba lagi", bukan halaman kosong.
4. Staff update ketersediaan buku (atau tambah buku baru) langsung dari Google Sheets di HP — sama seperti workflow kasir di rencana order, nggak perlu app tambahan.

**QR/barcode yang sudah ada** tinggal diarahkan ulang ke URL halaman `katalog-buku.html` yang baru (nanti di-host bareng `index.html` di Cloudflare Pages yang sama), gantiin link ke Sheet mentah.

---

## 5. Analitik pencarian (opsional, jangan mulai dari yang berat)

Sempat kepikiran integrasi ke Grafana buat lihat "buku paling dicari", "penulis favorit", dll — tapi ini kesalahpahaman/kebablasan, dicoret dari rencana. Grafana butuh infrastruktur beneran (server/hosting sendiri + plugin khusus buat baca Google Sheets) yang jauh lebih berat dibanding pendekatan situs statis + Apps Script yang dipakai di seluruh proyek ini.

Kalau nanti (bukan sekarang) benar-benar butuh insight soal buku apa yang paling dicari: cukup catat tiap kata kunci pencarian ke 1 sheet tambahan "Log Pencarian" (kata kunci, ketemu/nggak, timestamp) lewat Apps Script — dari situ udah bisa langsung pakai Pivot Table/Chart bawaan Google Sheets buat lihat tren, tanpa alat tambahan apa pun.

---

## Urutan Pembangunan (Roadmap)

1. **Fase 1 — Siapkan Sheet:** rapikan/pastikan kolom Sheet "Katalog Buku" sesuai struktur di atas, tambah kolom Status Ketersediaan kalau belum ada, bikin Apps Script `doGet` publik yang expose datanya sebagai JSON.
2. **Fase 2 — Halaman Katalog:** bangun `katalog-buku.html` (search box, tampilan hasil + badge status, pesan "tidak ditemukan", fallback error).
3. **Fase 3 — Alihkan QR/barcode:** update kode QR fisik yang sudah ada supaya ngarah ke halaman baru, bukan ke Sheet mentah.
4. **Fase 4 (opsional, kalau nanti kepakai):** log kata kunci pencarian ke sheet terpisah buat insight sederhana lewat Pivot Table Sheets.

Bisa jalan independen dari rencana Google Sheets untuk menu makanan (`RENCANA-INTEGRASI-GOOGLE-SHEETS.md`) — dua proyek ini nggak saling bergantung, cuma kebetulan sama-sama pakai pola Sheet + Apps Script + halaman web.
