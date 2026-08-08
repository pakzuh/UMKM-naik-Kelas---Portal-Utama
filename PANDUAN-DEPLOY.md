# Panduan Deploy ke Netlify + Pasang Domain (pakzuh.online)

> Sebelum mulai: pastikan sudah ganti `62812XXXXXXXX` (nomor WA), `umkmnaikkelas` (sosmed),
> dan kotak foto di semua halaman. Setelah itu baru upload.

---

## TAHAP 1 — Upload situs ke Netlify (cara paling gampang: drag & drop)

1. Buka **https://app.netlify.com** lalu **Sign up** (bisa pakai email atau akun GitHub/Google). Gratis.
2. Setelah masuk, klik menu **Sites** (atau **Add new site**).
3. Cari kotak bertuliskan **"Drag and drop your site output folder here"**
   (biasanya di halaman **Sites**, atau lewat **Add new site → Deploy manually**).
4. Buka File Explorer, masuk ke folder **`umkm-naik-kelas`** (yang isinya `index.html`, `style.css`, dll).
5. **Seret SELURUH folder `umkm-naik-kelas`** ke kotak tadi. (Seret foldernya, bukan file satu-satu —
   biar `style.css` & link antar-halaman tetap jalan.)
6. Tunggu beberapa detik. Situs langsung online dengan alamat acak, contoh:
   `https://calm-biscuit-12345.netlify.app`. Klik untuk cek — harusnya sudah tampil rapi.

> **Update ke depannya:** kalau ada revisi, edit file di komputer, lalu masuk ke situs kamu di
> Netlify → tab **Deploys** → seret ulang foldernya. Update < 5 detik, tanpa biaya.

---

## TAHAP 2 — Arahkan domain pakzuh.online ke Netlify

Domain kamu (.online) dibeli di registrar (tempat beli domain). Ada 2 cara. **Cara A paling disarankan**
karena otomatis mengurus domain utama + HTTPS.

### Cara A — Serahkan DNS ke Netlify (paling gampang, RECOMMENDED)

1. Di dashboard situs Netlify, buka **Domain management → Add a domain**.
2. Ketik **`pakzuh.online`** → **Verify** → **Add domain**.
3. Netlify akan menawarkan **"Set up Netlify DNS"**. Ikuti — Netlify akan menampilkan
   **4 alamat nameserver**, contohnya:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (Punyamu bisa beda — pakai yang ditampilkan Netlify.)
4. Buka panel **registrar tempat kamu beli domain** → cari menu **Nameserver / DNS / Kelola Domain**.
5. Ganti nameserver domain dari bawaan registrar menjadi **4 nameserver dari Netlify** tadi. Simpan.
6. Tunggu propagasi (biasanya 15 menit–beberapa jam, kadang sampai 24 jam).
7. Netlify otomatis memasang **SSL/HTTPS gratis** (Let's Encrypt). Setelah aktif,
   `https://pakzuh.online` sudah bisa diakses. 🎉

### Cara B — Biarkan DNS di registrar, tambah record manual

Pakai ini kalау kamu mau nameserver tetap di registrar. Di menu **DNS / DNS Records** registrar,
tambahkan:

| Type  | Name/Host        | Value / Points to                     |
|-------|------------------|---------------------------------------|
| A     | `@` (atau kosong)| `75.2.60.5`                           |
| CNAME | `www`            | `NAMA-SITUS-KAMU.netlify.app`          |

- `@` = domain utama (pakzuh.online). `75.2.60.5` adalah IP load balancer Netlify.
- Ganti `NAMA-SITUS-KAMU.netlify.app` dengan alamat acak situs kamu di Netlify.
- Lalu di Netlify **Domain management → Add domain → `pakzuh.online`** biar Netlify menerbitkan SSL.
- Tunggu propagasi, HTTPS aktif otomatis.

---

## Bikin subdomain contoh (opsional, buat katalog)

Mau `kopi.pakzuh.online`, `laundry.pakzuh.online` sebagai contoh live buat calon klien?
1. Upload situs contoh ke Netlify (situs baru, drag & drop lagi).
2. Di situs itu: **Domain management → Add domain →** ketik `kopi.pakzuh.online`.
3. Kalau pakai **Cara A (Netlify DNS)**: subdomain langsung jadi otomatis.
   Kalau **Cara B**: tambah record **CNAME** `kopi` → `situs-contoh.netlify.app` di registrar.

---

## KHUSUS HOSTINGER — langkah persisnya

Login ke **https://hpanel.hostinger.com** → menu **Domains** → klik **pakzuh.online**
→ menu kiri **DNS / Nameservers**. Di situ ada 2 bagian: **DNS Records** dan **Nameservers**.

### Pilihan 1 (RECOMMENDED) — Serahkan DNS ke Netlify via ganti Nameserver
Paling mulus untuk domain utama + subdomain contoh + HTTPS otomatis.
1. Di Netlify: **Domain management → Add a domain →** ketik `pakzuh.online` → pilih **Set up Netlify DNS**.
   Catat **4 nameserver** yang Netlify kasih (mis. `dns1.p01.nsone.net` ... `dns4.p01.nsone.net`).
2. Di Hostinger (halaman DNS / Nameservers) → bagian **Nameservers** → klik **Change nameservers**.
3. Pilih **"Change nameservers"** (custom / kustom), lalu isi keempat kolom dengan nameserver Netlify tadi.
4. **Save**. Tunggu propagasi (15 menit–24 jam). Netlify pasang SSL otomatis → `https://pakzuh.online` jalan.

> Catatan: cara ini memindah pengelolaan DNS ke Netlify. Kalau nanti mau pakai email di
> domain ini (mis. admin@pakzuh.online), atur email routing-nya dari sisi Netlify/Cloudflare.

### Pilihan 2 — Tetap pakai DNS Hostinger, cukup ubah 2 record
Nameserver tetap Hostinger, tidak perlu diubah. Cukup edit record.
1. Di Netlify: **Domain management → Add a domain →** `pakzuh.online` (biar Netlify terbitkan SSL).
   Catat alamat situsmu, mis. `namasitusmu.netlify.app`.
2. Di Hostinger → bagian **DNS Records / Kelola DNS**:
   - Cari record **A** dengan Name `@` (bawaan Hostinger arahnya ke parkir) → **Edit** →
     ganti **Points to** jadi **`75.2.60.5`** → Save.
   - Cari record **CNAME** dengan Name `www` → **Edit** (atau tambah baru) →
     arahkan ke **`namasitusmu.netlify.app`** → Save.
   - Kalau ada record A/CNAME lama yang bentrok di `@` atau `www`, hapus yang lama.
3. Tunggu propagasi. Balik ke Netlify, tunggu status domain **"Netlify DNS/HTTPS"** hijau.

> Untuk pemula, **Pilihan 1 lebih gampang** karena Netlify menuntun & mengurus semuanya (termasuk
> subdomain contoh seperti `kopi.pakzuh.online`). Pilih Pilihan 2 kalau mau DNS tetap di Hostinger.

---

## Ceklist cepat
- [ ] Nomor WA, sosmed, & foto sudah diganti
- [ ] Folder `umkm-naik-kelas` sudah di-drag ke Netlify → situs .netlify.app tampil oke
- [ ] `pakzuh.online` ditambahkan di Netlify Domain management
- [ ] Nameserver (Cara A) atau A+CNAME record (Cara B) sudah diset di registrar
- [ ] Tunggu propagasi → `https://pakzuh.online` tampil dengan gembok HTTPS
