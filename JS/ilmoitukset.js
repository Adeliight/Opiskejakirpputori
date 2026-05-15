// Ilmoitus esimerkkejä
const ilmoitukset = [
    { otsikko: "Kitaravahvistin", kuvaus: "Hyvässä kunnossa, nouto keskustasta", hinta: "50" },
    { otsikko: "Laskuharjoituskirja", kuvaus: "Matematiikka 1, muutama merkintä", hinta: "10" },
    { otsikko: "Kahvinkeitin", kuvaus: "Toimii kuin unelma", hinta: "15" },
    { otsikko: "Polkupyörä", kuvaus: "7-vaihteinen kaupunkipyörä", hinta: "120" }
];

// Kaikki olemassa olevat ilmoitukset
const ilmoitusSailio = document.getElementById('ilmoitukset');

function naytaIlmoitukset(lista) {
    if (!ilmoitusSailio) return;
    ilmoitusSailio.innerHTML = "";

    // Näyttää ilmoituksia sivulla
    lista.forEach(tuote => {
        const kortti = document.createElement('div');
        kortti.className = 'tuote';
        
        kortti.innerHTML = `
            <h3>${tuote.otsikko}</h3>
            <p>${tuote.kuvaus}</p>
            <p class="hinta">${tuote.hinta} €</p>
        `;
        ilmoitusSailio.appendChild(kortti);
    });
}

naytaIlmoitukset(ilmoitukset);