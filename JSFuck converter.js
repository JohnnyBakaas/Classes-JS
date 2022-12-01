class rot8000 {
  constructor() {
    const valid_code_points = JSON.parse(
      '{"33":true,"127":false,"161":true,"5760":false,"5761":true,"8192":false,"8203":true,"8232":false,"8234":true,"8239":false,"8240":true,"8287":false,"8288":true,"12288":false,"12289":true,"55296":false,"57344":true}'
    );
    const BMP_SIZE = 0x10000;
    this.rotlist = {};
    var hiddenblocks = [];
    var startblock = 0;
    var validintlist = [];
    var currvalid = false;

    for (var key in valid_code_points) {
      if (valid_code_points.hasOwnProperty(key)) {
        if (valid_code_points[key] == true)
          hiddenblocks.push({
            start: startblock,
            end: parseInt(key) - 1,
          });
        else startblock = parseInt(key);
      }
    }

    for (var i = 0; i < BMP_SIZE; i++) {
      if (valid_code_points[i] !== undefined) {
        currvalid = valid_code_points[i];
      }
      if (currvalid) validintlist.push(i);
    }
    var rotatenum = Object.keys(validintlist).length / 2;

    for (var i = 0; i < validintlist.length; i++) {
      this.rotlist[String.fromCharCode(validintlist[i])] = String.fromCharCode(
        validintlist[(i + rotatenum) % (rotatenum * 2)]
      );
    }

    this.rotate = function (convstring) {
      var outstring = "";
      for (var count = 0; count < convstring.length; count++) {
        if (this.rotlist[convstring[count]] === undefined) {
          outstring += convstring[count];
          continue;
        }
        outstring += this.rotlist[convstring[count]];
      }
      return outstring;
    };
  }
}

let alfabet =
  "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ1234567890 !?_-,.:;{}";

//9b38d34fdbd3344ba9eafdf4848272e0

//Fasit = P

const faktiskKey = "9b38d34fdbd3344ba9eafdf4848272e0";

const funetverdi = [];

const forventet = [
  31840, 31806, 31854, 31932, 31799, 31821, 31809, 31756, 68, 31773, 31758,
  31816, 31837, 31823, 20, 31763, 31759, 31820, 31768, 65, 31771, 31766, 31763,
  20, 31809, 31992, 31812, 31814, 31833, 31813, 31823, 31926,
];
let otputMaksin = "";
for (let i = 0; i < faktiskKey.length; i++) {
  let key = faktiskKey.charAt(i);
  for (let j = 0; j < alfabet.length; j++) {
    let secret = alfabet.charAt(j);
    const rot = new rot8000();
    const rotted = rot.rotate(secret).split("");

    const zipped = Array(secret.length);
    rotted.forEach(function (r, k) {
      zipped[k] = r.charCodeAt(0) ^ key.charCodeAt(k % key.length);
    });
    if (zipped[0] === forventet[i]) {
      console.log(secret);
      otputMaksin += secret;
      funetverdi.push(forventet[i]);
      break;
    }
  }
}

console.log(otputMaksin);

let dif = forventet.filter((v) => !funetverdi.includes(v));
console.log(dif);
