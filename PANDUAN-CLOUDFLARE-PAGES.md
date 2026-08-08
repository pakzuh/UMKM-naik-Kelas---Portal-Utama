# Panduan Deploy ke Cloudflare Pages + Domain pakzuh.online

> Kenapa Cloudflare Pages: bandwidth & request UNLIMITED (gratis), 500 build/bulan,
> custom domain + HTTPS gratis. Cocok buat model banyak situs klien tanpa pusing kuota.
> Dengan Cloudflare, kamu cukup 1 akun untuk banyak situs (tiap klien = 1 project).

> Sebelum mulai: ganti `62812XXXXXXXX` (nomor WA), `umkmnaikkelas` (sosmed),
> dan kotak foto di semua halaman.

---

## RINGKASAN ALUR (urutan yang benar)
1. Bikin akun Cloudflare (gratis).
2. Pindahkan domain pakzuh.online ke Cloudflare (ganti nameserver di Hostinger). ← sekali seumur hidup
3. Upload folder situs ke Cloudflare Pages (drag & drop).
4. Pasang domain pakzuh.online ke project Pages.
5. (Bonus) Aktifkan Email Routing gratis untuk admin@pakzuh.online.

---

## TAHAP 1 — Bikin akun & pindahkan domain ke Cloudflare

1. Buka **https://dash.cloudflare.com/sign-up** → daftar (gratis, cukup email + password).
2. Setelah masuk, klik **Add a site / Tambah situs** → ketik `pakzuh.online` → pilih paket **Free** → Continue.
3. Cloudflare akan memindai DNS domainmu, lalu menampilkan **2 nameserver** khusus untukmu, contoh:
   ```
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```
4. Login ke **Hostinger (hpanel.hostinger.com)** → **Domains** → `pakzuh.online` → **DNS / Nameservers**
   → bagian **Nameservers** → **Change nameservers** → pilih **custom** → isi dengan 2 nameserver Cloudflare tadi → **Save**.
5. Balik ke Cloudflare, klik **Done / Check nameservers**. Tunggu domain berstatus **Active**
   (biasanya belasan menit sampai beberapa jam).

> Setelah ini, DNS domainmu dikelola dari dashboard Cloudflare — semua jadi satu atap.

---

## TAHAP 2 — Upload situs ke Cloudflare Pages (drag & drop)

1. Di dashboard Cloudflare, menu kiri: **Compute (Workers & Pages)** → tab **Pages**
   → **Create application** → **Upload assets** (bukan Git).
2. Beri nama project, mis. `umkm-naik-kelas` → **Create project**.
3. **Seret SELURUH folder `umkm-naik-kelas`** (isi: index.html, style.css, dll) ke kotak upload.
   (Seret folder, bukan file satu-satu, biar CSS & link antar-halaman jalan.)
4. Klik **Deploy site**. Beberapa detik kemudian situs online di alamat:
   `https://umkm-naik-kelas.pages.dev`. Klik untuk cek.

> **Update ke depannya:** buka project → **Create deployment** → seret ulang folder yang sudah direvisi.
> Versi lama tetap tersimpan (bisa rollback). Gratis, cepat.

---

## TAHAP 3 — Pasang domain pakzuh.online

1. Di project Pages tadi → tab **Custom domains** → **Set up a custom domain**.
2. Ketik `pakzuh.online` → **Continue** → **Activate domain**.
   (Karena DNS sudah di Cloudflare, record diarahkan otomatis. Nggak perlu isi apa-apa manual.)
3. Mau sekalian pasang `www`? Ulangi dan ketik `www.pakzuh.online`.
4. Tunggu beberapa menit → SSL/HTTPS aktif otomatis → `https://pakzuh.online` sudah tayang. 🎉

---

## TAHAP 4 (BONUS) — Email admin@pakzuh.online gratis (Email Routing)

Buat trik "1 klien 1 akun" atau sekadar email profesional.
1. Dashboard Cloudflare → pilih domain `pakzuh.online` → menu **Email → Email Routing**.
2. **Enable** (Cloudflare otomatis menambahkan record MX & TXT yang diperlukan).
3. **Destination addresses** → tambah Gmail-mu → verifikasi lewat email yang masuk.
4. **Routing rules**:
   - Tambah alamat spesifik: `admin@pakzuh.online → gmailmu@gmail.com`, atau
   - Aktifkan **Catch-all**: *apa pun*`@pakzuh.online` → gmailmu. (paling fleksibel)
5. Sekarang `admin@pakzuh.online`, `klienA@pakzuh.online`, dst otomatis masuk Gmail-mu —
   bisa dipakai daftar akun/layanan lain.

---

## Bikin subdomain contoh (katalog) — mis. kopi.pakzuh.online
1. Buat project Pages baru (upload situs contoh).
2. Project itu → **Custom domains** → ketik `kopi.pakzuh.online` → Activate.
   (Otomatis, karena DNS sudah di Cloudflare.)

---

## Netlify vs Cloudflare Pages (ringkas)
| | Netlify (free baru) | Cloudflare Pages (free) |
|---|---|---|
| Bandwidth | ~15 GB/bulan | Unlimited |
| Deploy/build | ~20/bulan | 500/bulan |
| Custom domain + SSL | Ya | Ya (5/project) |
| Butuh banyak akun? | Ya | Tidak — 1 akun, banyak project |
| Kemudahan setup | Paling gampang | Sedikit lebih teknis (sekali set) |

---

## Ceklist cepat
- [ ] Nomor WA, sosmed, & foto sudah diganti
- [ ] Akun Cloudflare dibuat
- [ ] Nameserver Hostinger diganti ke Cloudflare → domain **Active**
- [ ] Folder `umkm-naik-kelas` di-upload ke Pages → `*.pages.dev` tampil oke
- [ ] Custom domain `pakzuh.online` di-activate → HTTPS jalan
- [ ] (Opsional) Email Routing aktif untuk admin@pakzuh.online
