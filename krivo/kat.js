let but = 0;

let cart = {};

function getCartData() {
  const url = "/cart/getAll";

  fetch(url)
    .then(response => {
      // Provjerite statusni kod odgovora
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Neuspješan zahtjev");
      }
    })
    .then(data => {
      cart = JSON.parse(data);
      console.log(cart);
    })
    .catch(error => {
      console.log(error.message);
    });

    const url2 = "/home/getCategories";
    
  fetch(url2)
  .then(response => {
    // Provjerite statusni kod odgovora
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Neuspješan zahtjev");
    }
  })
  .then(data => {
    categories = data;
    kat.textContent = categories[but].name;
    cate.appendChild(kat);
  })
  .catch(error => {
    console.log(error.message);
  });


  let id = 0;

  const url3 = "/home/getProducts/0";
  fetch(url3)
  .then(response => {
    // Provjerite statusni kod odgovora
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Neuspješan zahtjev");
    }
  })
  .then(data => {
    products = data;
    for (let i of products) {
      generateProdDiv(id, i);
      id++;
    }
  })
  .catch(error => {
    console.log("Greska");
  });
}


function generateProdDiv(id, prod) {
    let kosarica = document.getElementById("kosarica");
    let broj = 0;
    for (var key in cart) {
        if (cart.hasOwnProperty(key)) {
            broj += cart[key];
        }
    }
    kosarica.textContent = broj;

    let prodDiv = document.createElement("div");
    prodDiv.id = id;
    prodDiv.className = "prodContainer";

    let picture = document.createElement("picture");
    picture.className="picture";

    let imgTag = document.createElement("img");
    imgTag.src = prod.image;
    imgTag.className = "pic";

    let number = document.createElement("p");
    number.className="number";
    if (cart[prod.name]!=null && cart[prod.name]!=0) {
        number.textContent = cart[prod.name];
    }

    let btn = document.createElement("button");
    btn.className = "btn";
    let slika = document.createElement("img");
    slika.className="dodaj";
    slika.src = "images/cart.jpg";
    btn.appendChild(slika);

    btn.addEventListener("click",
        () => {
            const url4 = "/cart/add/" + encodeURIComponent(prod.name);

            fetch(url4, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
                // Provjerite statusni kod odgovora
                if (response.ok) {
                  if (cart[prod.name] == null) {
                    cart[prod.name] = 1;
                  } else  {
                      cart[prod.name] = cart[prod.name] + 1;
                  }
      
                  if (isNaN(parseInt(kosarica.textContent))) {
                      kosarica.textContent = 1;
                  } else {
                      kosarica.textContent = parseInt(kosarica.textContent) + 1;
                  }
      
                  number.textContent = cart[prod.name];
                } else {
                  throw new Error("Neuspješan zahtjev");
                }
            })
            .catch(error => {
              console.log(error.message);
            });
        }
    );

    let name = document.createElement("p");
    name.textContent = prod.name;
    name.className = "proizvod";
    name.id="n";

    picture.appendChild(imgTag);
    picture.appendChild(btn);
    picture.appendChild(number);

    prodDiv.appendChild(picture);
    prodDiv.appendChild(name);
    
    mainGrid.appendChild(prodDiv);
}

function pozovi(but) {
    let mainGrid = document.getElementById("maindiv");
    let cate = document.getElementById("kat");
    while (mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    }
    while (cate.firstChild) {
        cate.removeChild(cate.firstChild);
    }
    let kat = document.createElement("z");
    kat.textContent = categories[but].name;
    cate.appendChild(kat);

    let id = 0;
    let products = [];
    const url3 = "/home/getProducts/" + JSON.stringify(but);
    fetch(url3)
    .then(response => {
        // Provjerite statusni kod odgovora
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Neuspješan zahtjev");
        }
    })
    .then(data => {
        products = data;
        for (let i of data) {
          generateProdDiv(id, i);
          id++;
        }
    })
    .catch(error => {
      console.log("Greska");
    });
}



let mainGrid = document.getElementById("maindiv");

let cate = document.getElementById("kat");

let kat = document.createElement("z");

let products = [];

let categories = [];

// Pozivajte funkciju getCartData prilikom učitavanja stranice
document.addEventListener("DOMContentLoaded", getCartData);



const young = document.getElementById("young");
young.addEventListener("click", function () {
    pozovi(0);
});

const new1 = document.getElementById("new");
new1.addEventListener("click", function () {
    pozovi(1);
});

const fantasy = document.getElementById("fantasy");
fantasy.addEventListener("click", function () {
    pozovi(2);
});

const romcom = document.getElementById("romcom");
romcom.addEventListener("click", function () {
    pozovi(3);
});

const mistery = document.getElementById("mistery");
mistery.addEventListener("click", function () {
    pozovi(4);
});

const thriller = document.getElementById("thriller");
thriller.addEventListener("click", function () {
    pozovi(5);
});

const classic = document.getElementById("classic");
classic.addEventListener("click", function () {
    pozovi(6);
});

const kids = document.getElementById("kids");
kids.addEventListener("click", function () {
    pozovi(7);
});

const popular = document.getElementById("popular");
popular.addEventListener("click", function () {
    pozovi(8);
});

const school = document.getElementById("school");
school.addEventListener("click", function () {
    pozovi(9);
});
