'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req,res){
    response.ok('Aplikasi Rest Api Berjalan', res)
}

exports.tampilSemuaMahasiswa = function (req,res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error)
        }else {
            response.ok(rows, res, fields)
        }
    })
}

exports.tampilBerdasarkanId = function(req, res){
    let id = req.params.id
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], 
        function(error, rows, fields){
            if(error){
                console.log(error)
            }else{
                response.ok(rows, res)
            }
        }
    )
}