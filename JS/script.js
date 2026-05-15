const hakuKentta = document.getElementById('hakuKentta');
const hakuBtn = document.getElementById('hakuBtn');

function suoritaHaku() {
    const hakusana = hakuKentta.value.toLowerCase().trim();
    
    const suodatetut = ilmoitukset.filter(tuote => 
        tuote.otsikko.toLowerCase().includes(hakusana) || 
        tuote.kuvaus.toLowerCase().includes(hakusana)
    );
    
    naytaIlmoitukset(suodatetut);
}

hakuBtn.addEventListener('click', suoritaHaku);

hakuKentta.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        suoritaHaku();
    }
});