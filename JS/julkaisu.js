// Ilmoitusten lisääminen lomakkeen kautta
const julkaisu = document.getElementById("julkaiseBtn");
const lomake = document.getElementById("lomake");

// Ilmoituksen tiedot
const otsikkoSyote = document.getElementById("otsikko");
const kuvausSyote = document.getElementById("kuvaus");
const hintaSyote = document.getElementById("hinta");

function lisaaJulkaisu(tapahtuma) {
  tapahtuma.preventDefault();

  let tuotteenHinta = hintaSyote.value.trim();

  // Jos hintaa ei ole määritelty, automaattisesti oletetaan että tuote on ilmainen
  if (tuotteenHinta === "") {
    tuotteenHinta = "Ilmainen";
  } else {
    tuotteenHinta = tuotteenHinta + " €";
  }

  const uusiIlmoitus = {
    otsikko: otsikkoSyote.value,
    kuvaus: kuvausSyote.value,
    hinta: tuotteenHinta,
  };

  let olemassaOlevat =
    JSON.parse(localStorage.getItem("tallennetutTuotteet")) || [];
  olemassaOlevat.push(uusiIlmoitus);
  localStorage.setItem("tallennetutTuotteet", JSON.stringify(olemassaOlevat));

  if (lomake) {
    lomake.reset();
  }
  window.location.href = "index.html";
}

lomake.addEventListener("submit", lisaaJulkaisu);
