let brojac_proizvoda = {};
let proizvodi = [];
let ukbr = 0;


//dohvaćanje košarice sa servera
const url = "/cart/getAll";
fetch(url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Neuspješan zahtjev");
        }
    })
    .then(function(data) {
        brojac_proizvoda = data;


    })
    .catch(function(error) {
        console.log(error.message);
    });

for (const key in brojac_proizvoda) {
    if (brojac_proizvoda.hasOwnProperty(key)) {
        const vrijednost = brojac_proizvoda[key];
        ukbr += vrijednost;
    }
}



let kategorija_refresh;

let trenutna_kategorija = document.getElementById("kategorija");

kategorije("Pribor za jelo", 0);

let kat1 = document.getElementById("kat1");
let kat2 = document.getElementById("kat2");
let kat3 = document.getElementById("kat3");
let kat4 = document.getElementById("kat4");
let kat5 = document.getElementById("kat5");
let kat6 = document.getElementById("kat6");
let kat7 = document.getElementById("kat7");
let kat8 = document.getElementById("kat8");
let kat9 = document.getElementById("kat9");
let kat10 = document.getElementById("kat10");

kat1.onclick = () => {
    kategorije("Pribor za jelo", 0);
};

kat2.onclick = () => {
    kategorije("Tanjuri", 1);
};

kat3.onclick = () => {
    kategorije("Pića", 2);
};

kat4.onclick = () => {
    kategorije("Pomoćni pribor", 3);
};

kat5.onclick = () => {
    kategorije("Lampe", 4);
};

kat6.onclick = () => {
    kategorije("Zrcala", 5);
};

kat7.onclick = () => {
    kategorije("Soba", 6);
};

kat8.onclick = () => {
    kategorije("Čišćenje", 7);
};

kat9.onclick = () => {
    kategorije("Ukrasno", 8);
};

kat10.onclick = () => {
    kategorije("Aparatura", 9);
};

async function kategorije(ime_kategorije, broj_kategorije) {
    trenutna_kategorija.innerText = ime_kategorije;

    const url2 = "/home/getProducts/" + broj_kategorije.toString();
    fetch(url2)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Neuspješan zahtjev");
            }
        })
        .then(function(data) {
            proizvodi = data;

            kategorija_refresh = broj_kategorije;

            let container = document.querySelector('.flexcontainer');

            if (container === null) {
                console.error("Container element not found.");
                return;
            }


            container.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                let div = document.createElement("div");
                div.className = "picture";
                div.innerHTML = `
            <button class="pomocnakosara" id=${"k" + (i + 1)}><img class="kosaragumb" src=/images/cart.png alt="slikakosare"></button>
            <img class="slikepr" src= ${proizvodi[i].image} alt="${"slika" + (i + 1)}">
            <span class = brojproizvoda id=${"brojpr" + (i + 1)}></span>
            <span class = "opisslike" id=${"opis" + (i + 1)}>${proizvodi[i].name}</span>`;
                container.append(div);

                let dodajkosarica = document.getElementById("k" + (i + 1));
                dodajkosarica.onclick = () => {
                    const url_kosarica = '/cart/add/:' + proizvodi[i].name.toString();
                    fetch(url_kosarica)
                        .then(function(response) {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error("Neuspješan zahtjev");
                            }
                        })
                        .then(function(data) {
                            ukbr++;
                            let ukbroj = document.getElementById("brojukosarici");
                            ukbroj.textContent = ukbr;
                            let imeproizvoda = proizvodi[i].name;
                            let brpr = document.getElementById("brojpr" + (i + 1));

                            if (brojac_proizvoda.hasOwnProperty(imeproizvoda)) {
                                let pm = brojac_proizvoda[imeproizvoda];
                                brojac_proizvoda[imeproizvoda] = ++pm;
                                proizvodi[i].brojac += 1;
                                brpr.textContent = pm.toString();
                            } else {
                                brojac_proizvoda[imeproizvoda] = 1;
                                proizvodi[i].brojac = 1;
                                brpr.textContent = (proizvodi[i].brojac = 1).toString();
                            }

                        })
                        .catch(function(error) {
                            console.log(error.message);
                        });


                };
            }
        })
        .catch(function(error) {
            console.log(error);
        });

}






