# Panduan Deploy Situs Perpus Library Cafe ke Cloudflare Pages

> Situs ini terdiri dari **2 file utama**:
> - `index.html` — menu makanan & minuman (foto sudah base64, mandiri)
> - `katalog-buku.html` — katalog buku digital (data langsung dari Google Sheets, tanpa foto)
>
> Kamu **TIDAK perlu** upload folder "Foto Produk & Material" ke hosting.
> Cukup kedua file HTML di atas saja.

Kalau kamu sudah pernah deploy situs lain ke Cloudflare Pages (mis. pakzuh.online), kamu **sudah punya akun** —
tinggal pakai akun yang sama, langsung loncat ke **TAHAP 2**.

---

## RINGKASAN ALUR

1. Bikin akun Cloudflare (gratis) — skip kalau sudah punya.
2. Upload `index.html` ke Cloudflare Pages (drag & drop) → dapat alamat gratis `*.pages.dev`.
3. Cek situs sudah tayang & tombol WhatsApp jalan.
4. (Opsional) Pasang domain sendiri kalau nanti sudah beli, misalnya `perpuscafe.id`.
5. Cara update situs kalau ada revisi menu/harga di kemudian hari.

---

## TAHAP 1 — Bikin akun Cloudflare (skip kalau sudah punya)

1. Buka **https://dash.cloudflare.com/sign-up** → daftar pakai email + password (gratis, tanpa kartu kredit).
2. Verifikasi email → login ke dashboard.

---

## TAHAP 2 — Upload `index.html` ke Cloudflare Pages

1. Di dashboard Cloudflare, menu kiri: **Compute (Workers & Pages)** → tab **Pages**
   → **Create application** → **Upload assets** (bukan "Connect to Git").
2. Beri nama project, misalnya `perpus-cafe` → **Create project**.
3. Seret **`index.html`** dan **`katalog-buku.html`** (dari folder `Perpus.cafe`) ke kotak upload sekaligus.
   Boleh juga drag seluruh folder `Perpus.cafe` — file foto di dalamnya cuma ikut numpang,
   tidak akan dipakai situs.
4. Klik **Deploy site**. Dalam beberapa detik situs online di:
   `https://perpus-cafe.pages.dev` (atau nama yang kamu pilih di langkah 2).
5. Buka alamat itu di HP & browser — cek:
   - `index.html`: menu & foto tampil, tombol **Ice/Hot** di Coffee Series jalan, keranjang &
     tombol **Pesan via WhatsApp** membuka chat ke **0822-4595-1364**.
   - `katalog-buku.html`: buku muncul (langsung dari Google Sheets), search & filter kategori jalan.

> Situs ini **statis** (tanpa server/database), jadi kalau nanti trafiknya rame (dibagikan lewat
> Instagram/QR code di meja), tidak akan kena limit — bandwidth Cloudflare Pages gratis tanpa batas.

---

## TAHAP 3 (OPSIONAL) — Pasang domain sendiri

Kalau nanti Perpus Library Cafe beli domain sendiri (mis. `perpuscafe.id` atau `perpus.cafe`),
alurnya sama seperti project lain:

1. Pindahkan domain ke Cloudflare (ganti nameserver di panel domain-mu ke 2 nameserver Cloudflare —
   lihat `umkm-naik-kelas/PANDUAN-CLOUDFLARE-PAGES.md` TAHAP 1 untuk contoh langkah lengkapnya).
2. Di project Pages `perpus-cafe` → tab **Custom domains** → **Set up a custom domain** →
   ketik domainmu → **Activate domain**. HTTPS aktif otomatis dalam beberapa menit.

Kalau belum punya domain, alamat `https://perpus-cafe.pages.dev` sudah bisa langsung dipakai
permanen (gratis selamanya) — cukup ditaruh di link bio Instagram / QR code meja.

---

## Cara update situs nanti

### Update menu/harga (`index.html`)
1. Minta saya edit `index.html` seperti biasa (ganti harga, tambah menu, foto baru, dll).
2. Buka project `perpus-cafe` di Cloudflare Pages → **Create deployment** →
   seret file `index.html` yang baru → **Deploy**.

### Update katalog buku (`katalog-buku.html`)
- **Tambah/edit/hapus buku**: langsung di Google Sheets — situs otomatis ikut update,
  **tanpa perlu deploy ulang** (data diambil langsung dari Sheet saat halaman dibuka).
- **Update kode halaman** (fitur baru, desain berubah, dll): deploy `katalog-buku.html` yang baru
  dengan cara yang sama seperti di atas.

> Versi lama selalu tersimpan di tab **Deployments** Cloudflare — bisa di-rollback kapan saja
> kalau ada yang salah.

---

## Ceklist cepat

- [ ] Akun Cloudflare siap
- [ ] Project Pages `perpus-cafe` dibuat, `index.html` + `katalog-buku.html` ter-upload
- [ ] `https://perpus-cafe.pages.dev` — menu tampil, WhatsApp diuji coba
- [ ] `https://perpus-cafe.pages.dev/katalog-buku.html` — buku muncul, search & filter jalan
- [ ] QR code fisik diarahkan ke URL `katalog-buku.html` (gantikan link ke Google Sheets lama)
- [ ] (Opsional) Domain sendiri dipasang & HTTPS aktif
