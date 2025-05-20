"use strict";

var response = require("./res");
var connection = require("./koneksi");
const conn = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi Rest Api Berjalan", res);
};

exports.tampilSemuaMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res, fields);
    }
  });
};

exports.tampilBerdasarkanId = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?", [id], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.tambahMahasiswa = (req, res) => {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query("INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)", [nim, nama, jurusan], (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.ok("Berhasil tambah Mahasiswa", res);
    }
  });
};

exports.ubahMahasiswa = (req, res) => {
  var id = req.body.id_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query("UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?", [nim, nama, jurusan, id], (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.ok("berhasil ubah data", res);
    }
  });
};

exports.hapusMahasiswa = (req, res) => {
  var id = req.body.id_mahasiswa;
  connection.query("DELETE FROM mahasiswa WHERE id_mahasiswa=?", [id], (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.ok("berhasil hapus data", res);
    }
  });
};

exports.tampilGroupMataKuliah = function (req, res) {
  connection.query(
    "SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.oknested(rows, res);
      }
    }
  );
};
