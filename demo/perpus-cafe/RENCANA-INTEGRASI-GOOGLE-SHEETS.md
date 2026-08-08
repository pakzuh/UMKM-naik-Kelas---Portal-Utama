# Rencana Integrasi Google Sheets — Perpus Library Cafe

> Dokumen rencana (belum dieksekusi). Digabung jadi **1 file** (per 2026-07-23) supaya kalau di-export/dibawa ke chat baru konteksnya utuh dalam sekali upload — sebelumnya ada 2 file terpisah (order makanan vs katalog buku), sekarang jadi 1 dokumen dengan 2 BAGIAN independen:
>
> - **BAGIAN A — Sistem Pemesanan** (database order, layar dapur, kontrol harga & sold out) — terhubung ke `index.html`.
> - **BAGIAN B — Katalog Buku** (search katalog, status ketersediaan) — proyek terpisah, halaman baru sendiri (`katalog-buku.html`), tidak digabung ke situs menu.
>
> Kedua bagian **tidak saling bergantung** — bisa dieksekusi/dibangun kapan saja secara independen, cuma kebetulan sama-sama pakai pola arsitektur Google Sheet + Apps Script + halaman web statis. Digabung jadi 1 file murni supaya lebih praktis dibawa/di-reference, bukan karena keduanya jadi 1 sistem.

Situs `index.html` tetap 1 file statis seperti sekarang (checkout tetap manual via WhatsApp). Google Sheets + Apps Script cuma nambahin lapisan "pencatatan & kontrol" di sampingnya — bukan ganti alur WA yang sudah jalan.

---
---

# BAGIAN A — Sistem Pemesanan (Order, Kitchen Display, Master Produk)

> Berisi arsitektur untuk 3 hal yang saling nyambung:
> 1. **Database order** — nyatat tiap checkout dari website ke Google Sheets.
> 2. **Layar dapur (Kitchen Display)** — dapur lihat antrian pesanan yang sudah dikonfirmasi.
> 3. **Kontrol Harga & Sold Out** — staff bisa ubah harga/stok tanpa minta edit kode.

## A.1. Database Order (Sheet + Apps Script)

**Kenapa Apps Script, bukan Google Sheets API langsung:** situs ini statis/publik tanpa login, jadi nggak ada cara aman buat pakai API key/OAuth di sisi client. Apps Script di-deploy sebagai "Web App" dan dipanggil lewat `fetch()` biasa dari JS — jauh lebih simpel buat kasus ini.

**Alur:**
1. Pelanggan checkout di website → klik "Pesan via WhatsApp".
2. Saat itu juga (fire-and-forget, nggak nunggu/nggak ganggu proses buka WA), situs kirim data order ke Apps Script Web App.
3. Apps Script **validasi ulang** nama item & harga terhadap daftar menu asli (bukan percaya begitu saja data dari client) — supaya nggak bisa disusupi harga palsu (misal Rp 1).
4. Apps Script nulis ke **2 sheet sekaligus** (lihat struktur di bawah) dengan status awal **Pending**.
5. Tombol WA tetap kebuka seperti biasa — kalau pengiriman ke Sheet gagal (koneksi jelek dll), WA tetap jalan normal, cuma nggak ke-log.

### Struktur data: 2 sheet (bukan 1), biar item per-order nggak "numpuk" dalam 1 sel

Kalau semua item 1 transaksi digabung jadi 1 teks panjang dalam 1 sel, itu susah dipecah lagi nanti — baik buat kebutuhan dapur (misal mau centang selesai per-item, bukan per-order) maupun buat laporan penjualan (mis. "item X kejual berapa bulan ini" jadi susah dihitung kalau datanya teks bebas). Makanya dipisah jadi 2 sheet yang nyambung lewat Order ID, kayak struktur database beneran (tabel header + tabel detail):

**Sheet "Orders"** (1 baris = 1 transaksi/checkout):

| Kolom | Isi |
|---|---|
| Order ID | Kode pendek unik (mis. dari timestamp, `#1842`) — sama persis dengan yang muncul di pesan WA, buat cross-check |
| Timestamp | Waktu order masuk (timezone Asia/Jakarta) |
| Nama Pemesan | Dari form |
| Metode | Dine-in / Take Away / Delivery |
| Detail Metode | No. Meja / Keterangan Take Away / Alamat + siapa yang order ojek |
| Subtotal | Total harga seluruh transaksi (belum pajak) |
| Kemungkinan Terkirim | Ya/Tidak — heuristik dari deteksi tab browser (lihat bagian A.1b) |
| Konfirmasi | Checkbox — dicentang kasir setelah cek WA beneran masuk (lihat bagian A.1c) |
| Status | Pending / Dikonfirmasi / Selesai / Batal — otomatis keisi dari checkbox Konfirmasi, tapi bisa diubah manual juga |

**Sheet "Order Items"** (1 baris = 1 item, bisa beberapa baris per Order ID):

| Kolom | Isi |
|---|---|
| Order ID | Nyambung ke Sheet "Orders" |
| Nama Item | Mis. "Kopi Susu Pustaka" |
| Opsi | Mis. "DD, Less Sugar" — hasil gabungan semua pilihan opsi item itu |
| Qty | Jumlah |
| Harga Satuan | Harga per unit (sudah termasuk opsi yang mengubah harga, mis. shot DD) |
| Subtotal Baris | Harga Satuan × Qty |

Kalau 1 transaksi ada 2 item, itu jadi 2 baris di "Order Items" tapi tetap cuma 1 baris di "Orders" — statusnya nggak perlu disinkronkan manual ke tiap item karena memang cuma disimpan sekali di sheet "Orders". Buat kebutuhan dapur, item-item ini nanti dikelompokkan ulang per Order ID biar tetap kelihatan sebagai 1 "kartu pesanan", bukan berantakan per baris (lihat bagian A.2).

**Keamanan:** endpoint yang dipakai buat MENULIS order ini (dan endpoint kitchen display di bagian A.2, karena ada data pelanggan) perlu token rahasia sederhana yang ditanam di kode — nggak bikin 100% aman (kode client selalu bisa dibaca orang), tapi cukup buat nyaring iseng-iseng random.

### A.1b. Deteksi "kemungkinan terkirim ke WA"

Nggak ada cara pasti tahu pelanggan beneran pencet "kirim" di WhatsApp (itu di luar kendali situs). Tapi bisa dipakai sinyal pendekatan:
- Kalau dalam beberapa detik setelah klik tombol WA, tab/browser situs jadi nggak aktif (pindah ke app WA) → tandai "Kemungkinan Terkirim: Ya".
- Kalau tab tetap aktif (popup keblokir / user cuma nutup) → tandai "Tidak".

Dikombinasikan dengan Order ID yang sama di pesan WA & Sheet, staff bisa cross-check cepat di akhir hari: baris yang masih **Pending** + "Kemungkinan Terkirim: Tidak" → dianggap cart yang ditinggal, diabaikan dari laporan.

### A.1c. "Tombol" konfirmasi buat kasir — checkbox + onEdit trigger

Google Sheets nggak punya tombol asli per baris, tapi checkbox bawaan Sheets dikombinasikan dengan Apps Script `onEdit(e)` trigger bisa kerasa kayak tombol: kasir tinggal centang kotak di kolom "Konfirmasi" pada baris order itu → script otomatis jalan di belakang layar → kolom "Status" di baris yang sama langsung berubah jadi "Dikonfirmasi" tanpa kasir perlu buka dropdown/ketik apa-apa. Ini enak dipakai di HP karena checkbox itu target tap yang besar.

Kalau nanti dirasa checkbox kurang dan mau UI yang lebih rapi, opsi lanjutannya bikin mini web app kasir terpisah (mirip Kitchen Display tapi versi kasir) — tiap order tampil sebagai kartu dengan tombol "Konfirmasi" beneran. Ini kerjaan tambahan, jadi checkbox dulu cukup buat mulai.

---

## A.2. Layar Dapur (Kitchen Display)

**Prinsip utama:** dapur cuma boleh lihat order yang statusnya **Dikonfirmasi** (bukan Pending) — supaya nggak masak duluan buat order yang ternyata nggak jadi.

**Alur:**
1. Kasir buka Google Sheets di HP (app biasa, nggak perlu app tambahan) → lihat order baru masuk statusnya Pending → setelah cek WA beneran masuk & valid → centang checkbox "Konfirmasi" (lihat A.1c) → Status otomatis jadi **Dikonfirmasi**.
2. Halaman "Kitchen Display" (dibuka di tablet/monitor yang ditaruh di dapur, fullscreen) polling Apps Script tiap 5–10 detik, ambil semua order berstatus Dikonfirmasi yang belum Selesai — Apps Script gabungin data dari sheet "Orders" + "Order Items" (join lewat Order ID) jadi 1 struktur per order sebelum dikirim ke halaman ini.
3. Ditampilkan sebagai kartu-kartu antrian (1 kartu = 1 order, isinya daftar semua item di order itu — karena sudah di-join dari "Order Items"), diurutkan dari yang paling lama nunggu, dikasih highlight warna kalau kelamaan (misal >15 menit).
4. Dapur tap "Selesai" di kartu itu → status di sheet "Orders" berubah jadi **Selesai**, kartu hilang dari antrian.

*(Opsional buat nanti, bukan sekarang: kalau suatu saat mau tiap item dicentang selesai sendiri-sendiri — misal beda stasiun masak buat makanan & minuman — struktur "Order Items" yang sudah per-baris-per-item ini tinggal ditambah kolom "Status Item" sendiri, tanpa perlu bongkar ulang struktur sheet.)*

**Soal print fisik (opsional, fase belakangan):**
- **Fase awal (disarankan mulai dari sini):** cukup layar, nggak perlu print. Paling murah & paling cepat dibangun.
- **Kalau nanti butuh struk kertas:** opsi termudah adalah buka Kitchen Display di PC/laptop yang nyambung ke printer biasa, pakai `window.print()` browser tiap ada order baru (perlu 1 klik/trigger cetak). Opsi lebih niat: printer thermal khusus (mis. Epson TM series) + software bridge — worth-it kalau volume order sudah tinggi.

**Keamanan:** endpoint buat "ambil data dapur" ini beda dari endpoint publik harga menu (bagian A.3) — dia ngandung data pelanggan (nama, alamat delivery), jadi WAJIB pakai token, jangan publik.

---

## A.3. Kontrol Harga & Sold Out (Master Produk)

**Prinsip: pindahin cuma yang sering berubah, bukan semuanya.**

| Data | Lokasi | Alasan |
|---|---|---|
| Harga | → Pindah ke Sheet | Sering berubah (promo, naik harga bahan baku) |
| Status Sold Out | → Pindah ke Sheet | Berubah harian/jam-jaman (stok habis) |
| Foto produk | Tetap di kode HTML (base64) | Jarang berubah, dan nggak natural disimpan di Sheet |
| Kategori & urutan menu | Tetap di kode HTML | Keputusan desain, jarang berubah |
| Opsi (Ice/Hot, karbo, sambal, sugar, shot) | Tetap di kode HTML (`ITEM_OPTIONS`) | Strukturnya berlapis/nested, nggak natural buat 1 baris spreadsheet |

**Kunci penghubung: Item ID.** Tiap item menu dikasih kode tetap (mis. `RB01` = Chicken Karaage Sambal Sereh, `COF05` = Kopi Susu Pustaka). Sheet "Master Produk" isinya kolom: Item ID, Nama Tampil, Harga, Sold Out (Ya/Tidak dropdown). Kode HTML (foto, opsi, kategori) tetap dikaitkan lewat Item ID yang sama — jadi kalau staff ubah nama/harga di Sheet, foto & opsi tetap nyambung, nggak ada yang "putus" gara-gara typo nama.

**Perilaku di website:**
- Saat dibuka, situs langsung render pakai harga & status "terakhir diketahui" yang nempel di kode (jadi nggak pernah blank/nunggu lama).
- Di belakang layar, diam-diam fetch data terbaru dari Sheet (Apps Script `doGet`, endpoint ini **publik, nggak perlu token** — harga memang buat dilihat semua orang), lalu update tampilan begitu data datang.
- Item Sold Out ditampilkan pudar + badge "Habis" + tombol Tambah dimatikan.

**Proteksi staff dari salah edit:** kolom Sheet dikunci strukturnya — dropdown Ya/Tidak buat Sold Out, validasi kolom Harga wajib angka (Sheets nolak kalau ketik teks).

---

## Roadmap A (Sistem Pemesanan)

1. **Fase 1 — Database Order:** bikin Sheet "Orders" + "Order Items" (2 sheet, nyambung lewat Order ID) + Apps Script (nulis ke keduanya + validasi + token) + integrasi `fetch()` di `index.html` (Order ID, fire-and-forget, deteksi blur tab) + checkbox "Konfirmasi" & `onEdit` trigger buat kasir.
2. **Fase 2 — Layar Dapur:** halaman Kitchen Display baru (polling, join "Orders"+"Order Items" jadi kartu per order, tombol Selesai).
3. **Fase 3 — Master Produk:** Sheet "Master Produk" (Item ID, Harga, Sold Out), integrasi fetch harga/status di `index.html`, migrasi `MENU` array ke pakai Item ID sebagai key.
4. **Fase 4 (opsional, kalau sudah butuh):** print fisik struk dapur.

Tiap fase bisa jalan sendiri-sendiri (nggak harus sekaligus) — mulai dari Fase 1 dulu baru lanjut kalau sudah kepakai & terasa perlu lanjut ke fase berikutnya.

---
---

# BAGIAN B — Katalog Buku (Sub-Proyek Terpisah)

> Proyek ini TERPISAH dari sistem pemesanan makanan/minuman di BAGIAN A (`index.html`) — datanya beda (buku, bukan menu), jadi dibangun sebagai halaman baru sendiri (`katalog-buku.html`), bukan digabung ke situs menu.

## B.1. Kondisi Saat Ini

- Media: Google Spreadsheet (manual/pasif) — pelanggan scan barcode/QR untuk lihat daftar buku.
- Struktur data yang sudah ada: Judul Buku, Penerbit, Nama Penulis, Tahun Terbit, Genre/Kategori (Fiksi, Non-Fiksi, Akademis, dll).
- Masalahnya: pelanggan cuma bisa scroll tabel mentah, nggak ada cara cari cepat kalau catalog-nya udah banyak.

## B.2. Rencana: Digital Catalog dengan Search

Transisi dari tabel spreadsheet biasa jadi halaman pencarian interaktif (konsepnya mirip pencarian menu digital, tapi ini buat katalog buku).

**Cara kerja pencarian:**
- Input: cari berdasarkan **Judul Buku** atau **Nama Penulis**.
- Ketemu → tampilkan detail lengkap buku (Judul, Penulis, Penerbit, Tahun Terbit, Genre, Status Ketersediaan).
- Nggak ketemu → tampilkan pesan "Buku tidak ditemukan".
- Pencarian dilakukan di sisi browser (client-side, filter dari data yang sudah diambil sekali di awal) — cepat, nggak perlu nunggu request tiap ngetik huruf, asal jumlah bukunya belum sampai ribuan (kalau nanti udah sangat banyak, baru dipertimbangkan pencarian di sisi server).

## B.3. Status Ketersediaan (pengganti "Sold Out" — istilah lebih pas buat buku)

Sama kayak fitur Sold Out di BAGIAN A, tapi istilahnya disesuaikan buat konteks buku. Kolom **Status** di Sheet, dropdown pilihan:
- **Tersedia** — bisa dibaca/dipinjam
- **Dipinjam** — lagi dipinjam pengunjung lain
- **Hilang/Rusak** — nggak bisa dipakai sementara

Di halaman katalog, status ini ditampilkan sebagai badge warna di tiap hasil pencarian (mis. hijau = Tersedia, kuning = Dipinjam, abu = Hilang/Rusak) — pelanggan langsung tahu tanpa perlu tanya staff.

## B.4. Arsitektur Teknis

Pola yang sama dengan A.3 "Kontrol Harga & Sold Out" — karena kasusnya mirip (data di Sheet, staff yang update, situs yang baca):

1. **Sheet "Katalog Buku"** — 1 baris = 1 buku. Kolom: ID Buku (opsional tapi disarankan, biar stabil kalau judul mirip-mirip), Judul, Penulis, Penerbit, Tahun Terbit, Genre, Status Ketersediaan (dropdown).
2. **Apps Script `doGet`** — endpoint publik, read-only, expose data Sheet itu sebagai JSON. Nggak perlu token (sama seperti data harga menu — ini memang informasi buat dilihat pengunjung, bukan data sensitif).
3. **Halaman baru `katalog-buku.html`** — saat dibuka, fetch semua data buku sekali di awal (tampilkan loading singkat), lalu:
   - Kalau nggak ada kata kunci: tampilkan seluruh daftar (atau bisa dikelompokkan per Genre, opsional).
   - Kalau ada kata kunci di kotak search: filter live di JS berdasarkan Judul/Penulis (cocok sebagian, case-insensitive, jadi nggak perlu ketik persis).
   - Kalau fetch ke Apps Script gagal (internet lemot dll): tampilkan pesan error + tombol "Coba lagi", bukan halaman kosong.
4. Staff update ketersediaan buku (atau tambah buku baru) langsung dari Google Sheets di HP — sama seperti workflow kasir di BAGIAN A, nggak perlu app tambahan.

**QR/barcode yang sudah ada** tinggal diarahkan ulang ke URL halaman `katalog-buku.html` yang baru (nanti di-host bareng `index.html` di Cloudflare Pages yang sama), gantiin link ke Sheet mentah.

## B.5. Analitik pencarian (opsional, jangan mulai dari yang berat)

Sempat kepikiran integrasi ke Grafana buat lihat "buku paling dicari", "penulis favorit", dll — tapi ini kesalahpahaman/kebablasan, dicoret dari rencana. Grafana butuh infrastruktur beneran (server/hosting sendiri + plugin khusus buat baca Google Sheets) yang jauh lebih berat dibanding pendekatan situs statis + Apps Script yang dipakai di seluruh proyek ini.

Kalau nanti (bukan sekarang) benar-benar butuh insight soal buku apa yang paling dicari: cukup catat tiap kata kunci pencarian ke 1 sheet tambahan "Log Pencarian" (kata kunci, ketemu/nggak, timestamp) lewat Apps Script — dari situ udah bisa langsung pakai Pivot Table/Chart bawaan Google Sheets buat lihat tren, tanpa alat tambahan apa pun.

## Roadmap B (Katalog Buku)

1. **Fase 1 — Siapkan Sheet:** rapikan/pastikan kolom Sheet "Katalog Buku" sesuai struktur di atas, tambah kolom Status Ketersediaan kalau belum ada, bikin Apps Script `doGet` publik yang expose datanya sebagai JSON.
2. **Fase 2 — Halaman Katalog:** bangun `katalog-buku.html` (search box, tampilan hasil + badge status, pesan "tidak ditemukan", fallback error).
3. **Fase 3 — Alihkan QR/barcode:** update kode QR fisik yang sudah ada supaya ngarah ke halaman baru, bukan ke Sheet mentah.
4. **Fase 4 (opsional, kalau nanti kepakai):** log kata kunci pencarian ke sheet terpisah buat insight sederhana lewat Pivot Table Sheets.

Bisa jalan independen dari Roadmap A — dua proyek ini nggak saling bergantung, cuma kebetulan sama-sama pakai pola Sheet + Apps Script + halaman web.
