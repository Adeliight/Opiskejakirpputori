// Esimerkki ilmoitukset siirretty tuotteet.json tiedostoon
const ilmoitusSailio = document.getElementById("ilmoitukset");

// Nykyinen käyttäjä localstoragesta
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function poistaIlmoitus(id) {
  let varmistus = confirm("Poistetaanko ilmoitus?");

  if (varmistus) {
    let tuotteet = JSON.parse(localStorage.getItem("tallennetutTuotteet"));

    let uusiLista = [];

    for (let i = 0; i < tuotteet.length; i++) {
      if (tuotteet[i].id != id) {
        uusiLista.push(tuotteet[i]);
      }
    }

    localStorage.setItem("tallennetutTuotteet", JSON.stringify(uusiLista));

    location.reload();
  }
}

function naytaIlmoitukset(lista) {
  if (!ilmoitusSailio) return;
  ilmoitusSailio.innerHTML = "";

  // Käy listan läpi ja lisää sivulle
  lista.forEach((tuote) => {
    const kortti = document.createElement("div");
    kortti.className = "tuote";

    kortti.innerHTML = `
      <h3>${tuote.otsikko}</h3>
      <p>${tuote.kuvaus}</p>
      <p class="hinta">${tuote.hinta}</p>
    `;

    // Jos käyttäjä on kirjautunut, lisätään poistonappi
    if (currentUser != null && tuote.userId === currentUser.id) {
      let nappi = document.createElement("button");
      nappi.innerText = "Poista ilmoitus";
      nappi.className = "poistaBtn";

      nappi.onclick = function () {
        poistaIlmoitus(tuote.id);
      };

      kortti.appendChild(nappi);
    }

    ilmoitusSailio.appendChild(kortti);
  });
}

function haeIlmoitukset() {
  fetch("tuotteet.json")
    .then(function (vastaus) {
      return vastaus.json();
    })
    .then(function (jsonData) {
      let omatIlmoitukset = JSON.parse(
        localStorage.getItem("tallennetutTuotteet"),
      );

      if (omatIlmoitukset == null) {
        omatIlmoitukset = [];
      }

      let kaikki = jsonData.concat(omatIlmoitukset);
      naytaIlmoitukset(kaikki);
    });
}

haeIlmoitukset();
