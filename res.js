"use strict"; //biar ketat kodenya tidak salah

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};

exports.oknested = (values, res) => {
  const hasil = values.reduce((akumulasikan, item) => {
    if (akumulasikan[item.nama]) {
      const group = akumulasikan[item.nama];
      if (Array.isArray(group.matakuliah)) {
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
    } else {
      akumulasikan[item.nama] = item;
    }
    return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };

  res.json(data);
  res.end();
};
