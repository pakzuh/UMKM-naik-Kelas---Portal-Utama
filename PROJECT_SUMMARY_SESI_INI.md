# 🚀 DOKUMEN RANGKUMAN PROJEK & SINTESIS DEVELOPMENT — RAKYAT.SPACE

> **Dokumen ini disusun untuk memudahkan peninjauan (*review*) dan kelanjutan diskusi pada sesi berikutnya.**
> 
> *Tanggal Update:* 11 Agustus 2026  
> *Portal Utama:* [https://rakyat.space](https://rakyat.space)  
> *Repositori GitHub:* [https://github.com/pakzuh/UMKM-naik-Kelas---Portal-Utama.git](https://github.com/pakzuh/UMKM-naik-Kelas---Portal-Utama.git)  

---

## 📌 1. PROFIL & ARSITEKTUR PROJEK

- **Nama Platform**: `rakyat.space` (Space UMKM Indonesia)
- **Tagline Utama**: *"Memberi Sedikit Space untuk UMKM Berkembang"*
- **Model Bisnis**: Jasa pembuatan website UMKM siap pakai seharga **Rp200.000** (sekali bayar, tanpa biaya bulanan tersembunyi, tanpa ribet, integrasi WhatsApp & Google Sheets/Spreadsheet).
- **Infrastruktur & Deployment**:
  - **Version Control**: GitHub (`main` branch)
  - **Hosting & CDN**: Cloudflare Pages (Auto-build & deploy instan saat `git push origin main`)
  - **Aksesibilitas**: 100% Self-contained & Responsif di HP, Tablet, maupun Laptop/Desktop.

---

## 🌐 2. DAFTAR LIVE DEMO SHOWCASE (11+ SAMPEL WEBSITE SIAP PAKAI)

Seluruh sampel demo website dibuat dengan standar visual estetika tinggi, performa memuat cepat, dan integrasi pemesanan WhatsApp langsung:

| No | Nama Demo & Badan Usaha | Kategori / Bidang | Fitur Utama & Keunggulan | Link Live Demo |
|---|---|---|---|---|
| 1 | **⚖️ EF Law Partnership** | Company Profile / Konsultan Hukum | Tampilan *Deep Navy & Gold*, profil advokat & partner, *practice areas*, daftar klien BUMN, & form konsultasi. | [Buka Demo ↗](https://rakyat.space/demo/ef-lawfirm/index.html) |
| 2 | **🛠️ AutoPro Garage** | Jasa Bengkel Mobil & Motor | Paket servis (Oli, Tune Up, AC, 3D Spooring, Rem), *Unified Cart Drawer*, *Sticky Floating Bottom Bar*, & booking jam. | [Buka Demo ↗](https://rakyat.space/demo/bengkel-auto/index.html) |
| 3 | **🚘 Nusantara Rent** | Rental / Sewa Mobil & Motor | Katalog armada, kalkulator durasi hari otomatis, paket lepas kunci/driver, seksi syarat sewa, & WA reservation. | [Buka Demo ↗](https://rakyat.space/demo/sewa-kendaraan/index.html) |
| 4 | **🛍️ MartPlus Toko Retail** | Minimarket & Retail Store | Katalog sembako, sabun, snack, foto asli produk (Shampoo Suu Balm, Telur Ayam Fresh, Gula Pasir GMP), & keranjang WA. | [Buka Demo ↗](https://rakyat.space/demo/toko-retail/index.html) |
| 5 | **💇‍♀️ Glow & Grace Studio** | Salon Kecantikan Khusus Wanita | Ruangan privat muslimah, daftar treatment kecantikan & hair spa, reservasi tanggal/jam kunjungan WA. | [Buka Demo ↗](https://rakyat.space/demo/salon-beauty/index.html) |
| 6 | **📚 Perpus.cafe** | Kafe & Perpustakaan Digital | Katalog menu makanan/minuman, pencarian buku bacaan digital, filter genre, & order instan WhatsApp. | [Buka Demo ↗](https://rakyat.space/demo/perpus-cafe/index.html) |
| 7 | **🍖 Omah Etas D'Jawara** | Katering & Paket Aqiqah | Paket katering olahan kambing, Sate Gule, Nasi Kebuli, & reservasi tanggal acara via WA. | [Buka Demo ↗](https://rakyat.space/demo/omah-etas-djawara/index.html) |
| 8 | **💊 Apotek Digital** | Kesehatan & Obat-obatan | Katalog obat halal, vitamin, suplemen, & formulir tebus resep dokter langsung ke WA apoteker. | [Buka Demo ↗](https://rakyat.space/demo/apotek/index.html) |
| 9 | **🧺 Daily Wash Indonesia** | Pabrik & Supplier Sabun | Showcase produk sabun cuci baju, cuci piring, softener, handsoap, & pembersih lantai curah. | [Buka Demo ↗](https://rakyat.space/demo/dailywash/index.html) |
| 10 | **🍜 Mie Ayam Bangka Ayung** | Kuliner & Warung Makan | Daftar varian porsi mie, bakso, pangsit, petunjuk lokasi Google Maps, & order takeaway WA. | [Buka Demo ↗](https://rakyat.space/demo/mie-ayam-ayung/index.html) |
| 11 | **☕ Kopi Link Warkop** | Warkop & Link Bio WA | Landing page super cepat & ringan untuk Bio Instagram, TikTok, & Status WhatsApp. | [Buka Demo ↗](https://rakyat.space/demo/kopi-link/index.html) |

---

## 💡 3. INOVASI FITUR & PENYEMPURNAAN UI/UX (SESI INI)

1. **Fitur `Add to Cart = Auto Order`**:
   - Diangkat sebagai **Keunggulan Nomor 2** pada halaman depan `rakyat.space/#benefit`.
   - Memungkinkan pembeli memilih produk/layanan dengan 1 klik `+ Tambah ke Keranjang`. Subtotal harga & estimasi durasi terhitung otomatis, lalu dapat dikirimkan rapi ke WhatsApp Penjual tanpa perlu mengetik manual.

2. **Pop-Up Keranjang Melayang di Bawah Layar (*Sticky Floating Bottom Cart Bar*)**:
   - Bar navigasi melayang (*Gofood / Grabfood Style*) di bagian bawah layar HP/Laptop.
   - Otomatis muncul dengan animasi *slide-up* begitu pengguna memilih minimal 1 item/paket.
   - Menampilkan total item & estimasi harga (contoh: `🛒 2 Paket Servis Dipilih | Total: Rp 425.000`) serta tombol 1-klik `Lihat Keranjang ↗`.

3. **Unified Cart Drawer (*Single Scroll Container*)**:
   - Merombak total struktur panel keranjang samping (*slide-out drawer*) dengan lebar lapang (`max-width: 480px`).
   - Menyatukan **Daftar Paket Dipilih** dan **Formulir Checkout** ke dalam **1 area scroll yang sama**.
   - Menghilangkan *nested scrollbar* internal yang sempit sehingga seluruh item, tombol `+` / `-`, dan field input terlihat sejajar, bersih, & sangat lega.

4. **Penyederhanaan Form Booking Bengkel**:
   - Mengabulkan permintaan penyederhanaan formulir: **Menghapus field Nomor WhatsApp** (karena nomor pengirim otomatis terdeteksi saat obrolan WA dibuka) dan **menghapus syarat Plat Nomor** (disederhanakan menjadi `Merk / Tipe Kendaraan`).

5. **Auto-Close Menu Mobile pada Portal Utama (`rakyat.space`)**:
   - Memperbaiki bug menu navigasi mobile (hamburger menu) di `index.html` dan `tentang-kami.html`.
   - Mengimplementasikan *event listener* sehingga begitu link menu (*Beranda, Fitur, Harga, dll.*) diklik, menu mobile **langsung otomatis menutup** dan layar HP kembali bersih menampilkan seksi yang dituju.

6. **Pembaruan Foto Produk Asli Unggahan Pengguna**:
   - Mengganti foto produk pada demo **MartPlus Toko Retail** (`demo/toko-retail/index.html`) dengan file foto asli yang diunggah pengguna:
     - 🧴 **Shampoo**: `SUU BALM Scalp Care Gentle Moisturising Anti Dandruff Shampoo` (`assets/shampoo_suubalm.png`).
     - 🥚 **Telur Ayam**: `Telur Ayam Negeri Fresh di atas kain goni kayu` (`assets/telur_ayam.jpg`).
     - 🍬 **Gula Pasir**: `GMP Gula Pasir Kristal Putih Gunung Madu 1kg` (`assets/gula_pasir_gmp.jpg`).

---

## 📂 4. STRUKTUR DIREKTORI & FILE PENTING

```
D:\SYSTEM WINDOWS SUPPORT\PROGRAM\CLAUDE\PROJECT\Website\rakyat.space\
├── index.html                   # Landing page utama portal rakyat.space
├── tentang-kami.html            # Halaman Layanan IT & Tentang Kami
├── style.css                    # CSS Design System utama
├── cetak-mini-card-dan-surat.html# Template cetak brosur/mini card promo
├── PROJECT_SUMMARY_SESI_INI.md  # Dokumen Rangkuman Projek ini
├── assets/                      # Asset gambar, logo, QR code portal utama
└── demo/                        # Direktori seluruh website live demo
    ├── ef-lawfirm/              # Company profile firma hukum EF Law Partnership
    ├── bengkel-auto/            # Demo Bengkel Mobil & Motor AutoPro Garage
    ├── sewa-kendaraan/          # Demo Rental Mobil & Motor Nusantara Rent
    ├── toko-retail/             # Demo Minimarket MartPlus Toko Retail
    ├── salon-beauty/            # Demo Salon Kecantikan Glow & Grace Studio
    ├── perpus-cafe/             # Demo Kafe & Perpustakaan Digital Perpus.cafe
    ├── omah-etas-djawara/       # Demo Katering & Aqiqah Omah Etas D'Jawara
    ├── apotek/                  # Demo Apotek Digital
    ├── dailywash/               # Demo Supplier Sabun Daily Wash
    ├── mie-ayam-ayung/          # Demo Warung Kuliner Mie Ayam Ayung
    ├── pawon-ayu/               # Demo Resto Tradisional Pawon Ayu
    ├── mlijo-keliling/          # Demo Toko Sayur Mlijo Keliling
    └── kopi-link/               # Demo Link Bio Warkop Kopi Link
```

---

## 📜 5. RIWAYAT GIT COMMIT (SESI INI)

| Commit Hash | Pesan Commit & Rincian Perubahan |
|---|---|
| `e1532b3` | `Feat: Add EF Law Partnership Company Profile live demo & portfolio card` |
| `67d3bc0` | `Feat: Move EF Law Partnership, MartPlus Retail, and Glow & Grace Studio to recommended section` |
| `ca5ad0c` | `Fix: Replace Shampoo, Telur Ayam, and Gula Pasir images with exact user-uploaded assets` |
| `bb2fe26` | `Feat: Add AutoPro Garage Bengkel live demo website & portfolio card` |
| `5891c1b` | `Feat: Add interactive Shopping Cart Drawer to AutoPro Garage Bengkel demo` |
| `cbe9945` | `Feat: Add Sticky Floating Bottom Cart Bar to AutoPro Garage Bengkel demo` |
| `31f8bf1` | `Fix: Automatically close mobile navigation menu when a link is clicked` |
| `679df20` | `Fix: Redesign Cart Drawer layout to unify item list and checkout form into one spacious scroll container` |
| `616d28e` | `Feat: Add Nusantara Rent (Car & Bike Rental) live demo website & portfolio card` |
| `0bcdaab` | `Fix: Remove phone number and plat number fields from AutoPro Garage Bengkel cart form` |
| `a85f4e0` | `Feat: Add Syarat & Ketentuan Sewa section to Nusantara Rent demo` |
| `044149a` | `Feat: Update Benefit 2 on main portal to highlight Fitur Add to Cart = Auto Order` |

---

## 🛠️ 6. PANDUAN CEPAT UNTUK MELANJUTKAN DI SESI BEBERAPA SAAT LAGI

Jika Anda ingin melanjutkan pengerjaan atau membahas repositori ini di sesi AI lainnya, Anda tinggal memberikan instruksi singkat atau mengunggah file ini (`PROJECT_SUMMARY_SESI_INI.md`):

1. **Perintah Sync & Push Git Manual (Jika Dibutuhkan)**:
   ```powershell
   cd "D:\SYSTEM WINDOWS SUPPORT\PROGRAM\CLAUDE\PROJECT\Website\rakyat.space"
   git status
   git add .
   git commit -m "Feat: Melanjutkan pengembangan portal rakyat.space"
   git push origin main
   ```
2. **Status Live Website**:
   - Portal Utama: [https://rakyat.space](https://rakyat.space)
   - Seluruh 11+ demo website dapat diakses secara *live* melalui path `/demo/<nama-demo>/index.html`.

---
*Dokumen ini dibuat secara otomatis & siap digunakan sebagai bahan referensi pada sesi selanjutnya.* 🚀
