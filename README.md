# live-code-week-4

# Romawi Battle

**Romawi Battle** adalah sebuah aplikasi mini games RPG sederhana menggunakan **Express** dan **Sequelize**

Fokus pada fitur terlebih dahulu tampilan tidak harus sama seperti yang ditampilkan di demo.

Lakukan pengerjaan fitur sesuai dengan release yang diperintahkan oleh soal.

## Release 0

Install dependencies seperti: express, sequelize, dll. Inisialisasi project kalian menggunakan command yang disediakan oleh sequelize. Isi konfigurasi database, database **HARUS** diberi nama **zen_live_code_week_4**.

## Release 1
  Buatlah semua migration dengan spesifikasi sebagai berikut:

- Districts
  - districtName (string)
  - population (integer)

- Kingdoms
  - kingdomName (string)
  - nameOfKing (string)
  - DistrictId (integer)

- Soldiers
  - name (string)
  - attack (integer)

Relasi untuk table `Kingdoms` dan `Soldiers` adalah satu `Kingdom` dapat memiliki banyak `Soldier`, dan satu `Soldier` hanya boleh dibuat pada satu `Kingdom`. Kamu boleh menambahkan kolom baru untuk memenuhi relasi tersebut dan pikirkan table dan kolom apa yang harus ditambahkan, selain itu **HARUS** mengikuti requirement di atas.

Relasi untuk table `Kingdoms` dan `Districts` adalah satu `Kingdom` hanya boleh memiliki satu `District`dan satu `District` hanya boleh dimiliki oleh satu `Kingdom`.



## Relase 2

Buatlah dua (2) *migration* baru. Satu untuk menghapus kolom `population` pada `Districts` dan satu untuk menambahkan kolom `population` dengan type integer pada `Kingdoms` dengan defaultValue 4

## Release 3

#### Buat seed untuk table `Districts`

districtName: "Prontera"

districtName: "Payon"

districtName: "Morroc"

districtName: "Izlude"

districtName: "Geffen"

districtName: "Juno"

#### Buat seed untuk table `Kingdoms`

kingdomName: "Endless"

kingdomName: "Spartan"

kingdomName: "Rendezvous"

kingdomName: "Battle Leader"

kingdomName: "Kapak Merah"


## FEATURE
Removie memiliki fitur **CRU** dengan summary sebagai berikut:

| METHOD | ROUTE                          | DESCRIPTION                                                                              |
| ------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| GET    | `/kingdoms` | Tampilkan semua data `Kingdoms` sesuai dengan release 4 |
| GET    | `/kingdoms/:kingdomId` | menampilkan detail kingdom |
| POST   | `/kingdoms/:kingdomId`  | menguasai `District` |
| POST   | `/soldiers/:kingdomId`  | Membuat `Soldier` baru pada sebuah `Kingdom` |


ps: format routes **Harus Sama Persis**

## Release 4

Pada routing `/kingdoms` akan menampilkan semua data kingdom.

Data yang kamu harus tampilkan adalah:
- Nama Kingdom
- Link ke halaman detail

## Release 5

Pada routing `/kingdoms/:kingdomsId`. Pada halaman ini kamu akan menampilkan:
  - Detail data pada kingdom. Pada bagian data kingdom tampilkan:
    - Nama Kingdom
    - Jumlah Pasukan yang diambil dari relasi dengan Soldier (pikirkan bagaimana cara mengambil jumlah pasukan ini dan diimplementasikan di class method/instance method) dengan menambahkan kata 'pasukan'
    - Nama District yang dimiliki kingdom tersebut. Untuk nama district, jika `Kingdom` tersebut belum memiliki sebuah `District` maka tampilkan `unassigned`, jika sudah maka tampilkan nama districtnya. Pikirkan kira-kira untuk menyelesaikan kasus apakah menggunakan `class method`, `instance method`, ataupun `helpers`. (dilarang mengecek kondisi di .ejs atau routes)

  - Form untuk menambahkan soldier pada kingdom. Form berisi input type: (requirement form ini berlanjut di release 6)
    - Name
    - Attack

  - Form untuk menambahkan `district` ke Kingdom tersebut (GET DISTRICT). Form berisi: (requirement form ini berlanjut di release 7)
    - List District akan ditampilkan dengan type `radio button`
    - Apabila Kingdom tersebut sudah memiliki `District` list radio button sudah terpopulate sesuai `District` yang dimiliki oleh `Kingdom` tersebut


## Release 6

Routing dengan method POST `/soldiers/:kingdomId` akan membuat soldier baru sesuai dengan kingdomId. Berikut adalah requirement untuk feature add soldier:
  - Panjang karakter nama soldier yang diinput harus diantara 3 - 10
    * Tampilkan pesan `Name must between 3 and 10 characters` jika tidak memenuhi validasi diatas

  - Minimum attack soldier adalah 100
    * Tampilkan pesan `Minimum input attack is 100` jika tidak memenuhi validasi diatas

  - Maximum attack soldier yang diinput adalah 1000
    * Tampilkan pesan `Maximum input attack is 1000` jika tidak memenuhi validasi diatas

  - Total Maksimal Soldier dalam satu `Kingdom` adalah 20. Jadi apabila Kingdom Hacktiv8 sudah memiliki soldiers sebanyak 20, maka penambahan soldier akan gagal. Untuk pengecekan ini akan berjalan sebelum validasi-validasi diatas berjalan.

Jika berhasil menambahkan soldier maka akan di-redirect ke route `/kingdoms/:kingdomsId`


## Release 7

Routing dengan method POST `/kingdoms/:kingdomId` untuk mengambil alih sebuah `District` yang telah dipilih. `District` dapat diambil alih oleh `Kingdom` jika memenuhi requirement sebagai berikut:

  - Apabila district tersebut belum dimiliki oleh `Kingdom` manapun, maka `District` tersebut akan dikuasai secara langsung

  - Apabila `District` yang dipilih telah dimiliki oleh `Kingdom` yang lain, maka kedua `Kingdom` akan bertarung memperebutkan `District`. Kingdom yang memenangkan `District` adalah yang memiliki *totalAttack* (jumlah total attack semua pasukan/soldier) paling besar.

  Buatlah class method untuk mengecek District apakah telah dimiliki oleh `Kingdom` lain atau tidak

  - Jika `Kingdom` yang sedang merebut menang maka `District` akan berpindah ke Kingdom pemenang dan `Kingdom` lawan tidak memiliki `District`

  - Jika `Kingdom` yang sedang merebut kalah maka tampilkan pesan kepada user `Failed to get district`

## Release 8

  Pada Method GET di routing `/kingdoms` tambahkan beberapa data atau keterangan sebagai berikut: 
  - Sebuah warna pada table atau card dengan ketentuan sebagai berikut:
    - Jika kingdom tersebut tidak menguasai distrik maka warna pada row pada table atau card akan menjadi warna kuning

## Release 9

Tambahkan route dengan method GET `/soldiers` dimana pada routing ini kamu diminta untuk menampilkan Jumlah pasukan dari sebuah Kingdom beserta jumlah attack dari pasukan tersebut di *group* berdasarkan `Kingdom` masing-masing.

Syarat dari release ini adalah menggunakan static method findAll sekali saja pada `Soldier`

Hint: http://docs.sequelizejs.com/manual/tutorial/querying.html


## RELEASE 10
Tambahkan fitur order atau sorting ( boleh secara `ASC` atau `DESC`) pada routing `GET /soldiers` berdasarkan:
  - total attack
  - total soldiers
# live-code-4-phase-1
