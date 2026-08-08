# Rencana Integrasi Google Sheets — Template Cafe

Dokumen ini berisi arsitektur integrasi antara **Google Sheets**, **Google Apps Script**, dan halaman web **Template Cafe**.

## Modul Sistem

1. **Sistem Pemesanan (Order System)**: Mencatat pesanan dari `index.html` ke Google Sheets dan terhubung dengan layar dapur (Kitchen Display).
2. **Katalog Buku (Book Catalog)**: Mengambil data buku dari Google Sheets ke halaman `katalog-buku.html`.

---

## BAGIAN A — Sistem Pemesanan

### 1. Structure Database (Google Sheets)

#### Sheet `PESANAN`
- `Timestamp`: Waktu order
- `Order ID`: Kode unik pesanan (contoh: `ORD-123456`)
- `Nama`: Nama pelanggan
- `Meja / Detail`: No. meja / Alamat delivery
- `Item Pesanan`: Rincian item & opsi
- `Total`: Subtotal pesanan
- `Status`: Pending / Dikonfirmasi / Selesai / Batal

#### Sheet `MENU`
- `ID`: Kode unik produk (misal `RB-01`)
- `Kategori`: Kategori menu
- `Nama`: Nama menu
- `Harga`: Harga per porsi
- `Status`: Tersedia / Habis

---

## BAGIAN B — Katalog Buku

- Membaca data buku dari Sheet `KATALOG` secara real-time.
- Mendukung fitur pencarian instan (Judul, Penulis, Genre).
- Menampilkan badge ketersediaan (Tersedia, Dipinjam, Rusak).

---

## Langkah Setup Backend (Apps Script)

1. Buat Google Sheet baru.
2. Buka Extensions -> Apps Script.
3. Paste kode dari `apps-script-template.gs`.
4. Masukkan `SPREADSHEET_ID`.
5. Deploy -> New deployment -> Select type: Web App.
   - Execute as: Me
   - Who has access: Anyone
6. Salin Web App URL ke `BRAND_CONFIG.appsScriptUrl` pada file `index.html`.
