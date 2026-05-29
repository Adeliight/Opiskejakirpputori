const hakuKentta = document.getElementById("hakuKentta");
const hakuBtn = document.getElementById("hakuBtn");

function haeIlmoitukset() {
  const sana = hakuKentta.value.toLowerCase();

  let tulokset = [];

  for (let i = 0; i < kaikkiIlmoitukset.length; i++) {
    let tuote = kaikkiIlmoitukset[i];

    if (
      tuote.otsikko.toLowerCase().includes(sana) ||
      tuote.kuvaus.toLowerCase().includes(sana)
    ) {
      tulokset.push(tuote);
    }
  }

  naytaIlmoitukset(tulokset);
}

hakuBtn.addEventListener("click", haeIlmoitukset);

hakuKentta.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    haeIlmoitukset();
  }
});

logoutBtn.addEventListener("click", () => {
  window.location.reload();
});
