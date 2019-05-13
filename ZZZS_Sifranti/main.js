// DOM REFERENCE
let pokazi_btn = document.getElementById("pokazi_btn");
let tbody = document.getElementById("tbody");
let skupine_select = document.getElementById("skupine");
let pocisti_tabelo_btn = document.getElementById("pocisti_tabelo_btn");
let isci_input = document.getElementById("isci_input");

// XML MODELI
let skupina_mtp;
let vrste_mtp;
let skupine_mtp;
let trajnostne_dobe_mtp;
let cenovni_standard_mtp;

// FUNKCIJE

// Inicializiraj xml model in opcije select drop-downa 'skupine'.
function initialize() {
  fetch("./sifrant.xml")
    .then(response => response.text())
    .then(response_text => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(response_text, "text/html");
      // console.log(xmlDoc);

      skupina_mtp = xmlDoc.getElementsByTagName("skupinasifrantov_mtp");

      vrste_mtp = skupina_mtp[0].children[0];
      skupine_mtp = skupina_mtp[0].children[1];
      trajnostne_dobe_mtp = skupina_mtp[0].children[2];
      cenovni_standard_mtp = skupina_mtp[0].children[3];

      console.warn("Model inicializiran. Polnim drowdown.");
      pokazi_skupine(skupine_mtp);
      console.log("Dropdown inicializiran");

      /*
  console.log(skupine_mtp);
  console.log(vrste_mtp);
  console.log(trajnostne_dobe_mtp);
  console.log(cenovni_standard_mtp);
  */
    });
}

// Napolni skupine dropdown select list
function pokazi_skupine(skupine_zapisi) {
  let zapisi = skupine_zapisi.getElementsByTagName("ZAPIS");
  for (const zapis of zapisi) {
    let value = zapis.children[0].innerText;
    let text = zapis.children[1].innerText;
    let option = document.createElement("option");
    option.value = value;
    option.text = text;
    skupine_select.add(option);
  }
}

// Pokaže pripomočke določene skupine v tabeli (ali vse, če parameter skupine ni podan)
function pokazi_tabelo(p_sifraskumpt) {
  console.log("pokazi tabelo started");
  // Pridobi obe HTML kolekciji zapisov iz nadrejene HTML kolekcije (skupin in vrst pripomočkov)
  let zapisi_vrste_mtp = vrste_mtp.getElementsByTagName("ZAPIS");

  // Pridobi vrednosti
  for (const zapis of zapisi_vrste_mtp) {
    let nazivpodskumtp1 = "brez podskupine";

    let sifraskumtp = zapis.getElementsByTagName("nsoct:sifraskumtp")[0]
      .innerText;

    let nazivskumtp = getSkupinaNaziv(sifraskumtp);

    let sifravrsmtp = zapis.getElementsByTagName("nsoct:sifravrsmtp")[0]
      .innerText;

    if (zapis.getElementsByTagName("nsoct:nazivpodskumtp1")[0]) {
      nazivpodskumtp1 = zapis.getElementsByTagName("nsoct:nazivpodskumtp1")[0]
        .innerText;
    }

    let nazivvrsmtp = zapis.getElementsByTagName("nsoct:nazivvrsmtp")[0]
      .innerText;
    let opispoobzdra = zapis.getElementsByTagName("nsoct:opispoobzdra")[0]
      .innerText;
    let veljaod = zapis.getElementsByTagName("nsoct:veljaod")[0].innerText;

    // Napolni tabelo z vrednostmi glede na pogoje
    if (p_sifraskumpt != "vse") {
      if (sifraskumtp != p_sifraskumpt) {
        continue;
      } else {
      izpisi_vrstico(sifravrsmtp, nazivskumtp, nazivpodskumtp1, nazivvrsmtp, opispoobzdra, veljaod);
      }
    } else if (p_sifraskumpt === "vse") {
      izpisi_vrstico(sifravrsmtp, nazivskumtp, nazivpodskumtp1, nazivvrsmtp, opispoobzdra, veljaod);
    }
  } // End glavni for loop
} // End funkcije pokazi_tabelo

function pocisti_tabelo() {
  tbody.innerHTML = "";
}

function izpisi_vrstico(p_sifravrsmtp,
                       p_nazivskumtp,
                       p_nazivpodskumtp1,
                       p_nazivvrsmtp,
                       p_opispoobzdra,
                       p_veljaod) {

let row = document.createElement("tr");
row.innerHTML = `
<td>${p_sifravrsmtp}</td>
<td>${p_nazivskumtp}</td>
<td>${p_nazivpodskumtp1}</td> 
<td>${p_nazivvrsmtp}</td>
<td>${p_opispoobzdra}</td>
<td>${p_veljaod}</td>`;
tbody.append(row);
}

// Pridobi lookup vrednost za opis skupine, glede na šifro pripomočka
function getSkupinaNaziv(p_sifra) {
  let nazivskumtp;
  let zapisi_skupine_mtp = skupine_mtp.getElementsByTagName("ZAPIS");
  for (const zapis of zapisi_skupine_mtp) {
    let sifraskumtp = zapis.getElementsByTagName("nsoct:sifraskumtp")[0].innerText;
    if (p_sifra === sifraskumtp) {
      nazivskumtp = zapis.getElementsByTagName("nsoct:nazivskumtp")[0].innerText;
    }
  }
  return nazivskumtp;
}

function onSkupineChanged() {
  console.log("Select list changed.");
  let value = this.options[this.selectedIndex].value;
  pocisti_tabelo();
  pokazi_tabelo(value);
}

function onSearch(p_value) {
  let zapisi_vrste_mtp = vrste_mtp.getElementsByTagName("ZAPIS");
  let zapisi_array = Array.from(zapisi_vrste_mtp);

  let my_regex = new RegExp(p_value, 'gi');
  let filtered_array = zapisi_array.filter(zapis => {
      let value = zapis.getElementsByTagName("nsoct:nazivvrsmtp")[0].innerText.toUpperCase();
      return value.match(my_regex);
  });

  console.log(filtered_array);

  pocisti_tabelo();

  for (const zapis of filtered_array) {
      let naziv = zapis.getElementsByTagName("nsoct:nazivvrsmtp")[0].innerHTML;
      naziv = naziv.replace(p_value.toUpperCase(), "<span style='color:red;'>" + p_value.toUpperCase() + "</span>");

      console.log(naziv);

      izpisi_vrstico('la', 'la', 'la', naziv, 'bla', 'bla' );
      }
}

// Event Listenerji
skupine_select.addEventListener("change", onSkupineChanged);
pocisti_tabelo_btn.addEventListener("click", pocisti_tabelo);

isci_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    if (!vrste_mtp) {
      alert("Podatki prazni, najprej uvozi podatke");
      this.value = "";
    } else {
      onSearch(this.value);
    } 
  }
});