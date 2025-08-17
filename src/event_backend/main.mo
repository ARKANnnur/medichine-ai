import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Text "mo:base/Text";

persistent actor {
  // Tipe lokasi
  public type Lokasi = {
    lat : Float;
    lon : Float;
  };

  // Tipe data Obat
  public type Obat = {
    nama : Text;
    harga : Nat;
  };

  // Tipe data Apotek dengan daftar obat
  public type Apotek = {
    nama : Text;
    alamat : Text;
    lokasi : Lokasi;
    daftarObat : [Obat];
  };

  // Penyimpanan data apotek
  stable var daftarApotek : [Apotek] = [];

  // Fungsi untuk menambahkan apotek baru
  public func tambahApotek(
    nama : Text,
    alamat : Text,
    lat : Float,
    lon : Float,
  ) : async Bool {
    // cek dulu apakah apotek dengan nama ini sudah ada
    for (a in daftarApotek.vals()) {
      if (Text.toLowercase(a.nama) == Text.toLowercase(nama)) {
        return false; // apotek sudah ada, jangan tambah
      };
    };

    let apotekBaru : Apotek = {
      nama = nama;
      alamat = alamat;
      lokasi = { lat = lat; lon = lon };
      daftarObat = [];
    };
    daftarApotek := Array.append(daftarApotek, [apotekBaru]);
    return true;
  };

  // Fungsi untuk menambahkan obat ke apotek tertentu
  public func tambahObat(
    namaApotek : Text,
    namaObat : Text,
    harga : Nat,
  ) : async Bool {
    var updated = false;
    var newDaftar : [Apotek] = Array.map<Apotek, Apotek>(
      daftarApotek,
      func(a) {
        if (a.nama == namaApotek) {
          // cek apakah obat dengan nama sama sudah ada
          for (o in a.daftarObat.vals()) {
            if (Text.toLowercase(o.nama) == Text.toLowercase(namaObat)) {
              updated := false; // obat sudah ada, skip
              return a;
            };
          };

          updated := true;
          return {
            a with daftarObat = Array.append(a.daftarObat, [{ nama = namaObat; harga = harga }])
          };
        } else {
          return a;
        };
      },
    );
    daftarApotek := newDaftar;
    return updated; // true kalau berhasil ditambahkan, false kalau duplikat / apotek tidak ditemukan
  };

  // Fungsi untuk mengambil semua data apotek beserta obat
  public query func getApotek() : async [Apotek] {
    return daftarApotek;
  };

  // Fungsi untuk mengambil daftar obat di apotek tertentu
  public query func getObatByApotek(namaApotek : Text) : async [Obat] {
    for (apotek in daftarApotek.vals()) {
      if (apotek.nama == namaApotek) return apotek.daftarObat;
    };
    return [];
  };

  // Fungsi untuk mengambil semua obat beserta nama apoteknya
  public query func getObat() : async [{ apotek : Text; obat : Obat }] {
    var result : [{ apotek : Text; obat : Obat }] = [];
    for (apotek in daftarApotek.vals()) {
      for (o in apotek.daftarObat.vals()) {
        result := Array.append(result, [{ apotek = apotek.nama; obat = o }]);
      };
    };
    return result;
  };

  public query func searchObat(namaObat : Text) : async [{
    apotek : Text;
    alamat : Text;
    obat : Obat;
  }] {
    var result : [{ apotek : Text; alamat : Text; obat : Obat }] = [];
    let namaLower = Text.toLowercase(namaObat);

    for (apotek in daftarApotek.vals()) {
      for (o in apotek.daftarObat.vals()) {
        if (Text.contains(Text.toLowercase(o.nama), #text namaLower)) {
          result := Array.append(
            result,
            [{ apotek = apotek.nama; alamat = apotek.alamat; obat = o }],
          );
        };
      };
    };
    return result;
  };

  public func tambahApotekDenganObat(
    namaApotek : Text,
    alamat : Text,
    lat : Float,
    lon : Float,
    namaObat : Text,
    harga : Nat,
  ) : async () {
    // 1️⃣ tambah apotek baru
    let _ = await tambahApotek(namaApotek, alamat, lat, lon);

    // 2️⃣ tambah obat pertama ke apotek baru
    let _ = await tambahObat(namaApotek, namaObat, harga);
  };

};
// Fungsi untuk mencari obat berdasarkan nama (case sensitive)
