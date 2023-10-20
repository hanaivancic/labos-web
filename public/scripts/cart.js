let cart = {};
const url = "/cart/getAll";
let mainGrid = document.getElementById("maindiv");
let kosarica = document.getElementById("kosarica");

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Neuspješan zahtjev");
    }
  })
  .then(data => {
    cart = JSON.parse(data);
    let broj = 0;
    for (let key in cart) {
        if (cart.hasOwnProperty(key)) {
        broj += cart[key];
        }
    }
    kosarica.textContent = broj;
    for (let key in cart) { 
        if (cart[key] != null && cart[key]!=0) {
            let prodDiv = document.createElement("div");
            prodDiv.className="red";
    
            let prodDiv1 = document.createElement("div");
            prodDiv1.className="prod";
            
            let prodDiv2 = document.createElement("div");
            prodDiv2.className = "kolk";
    
            let ime = document.createElement("i");
            ime.id = "ime";
            ime.textContent = key;
    
            let koliko = document.createElement("p");
            koliko.id = "koliko";
            koliko.textContent = cart[key];
    
            let plus = document.createElement("button");
            plus.textContent = "+";
            plus.id = "plus";
            plus.className = "promijeni";
    
            plus.addEventListener("click", () => {

                const url4 = "/cart/add/" + encodeURIComponent(key);

                fetch(url4, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        cart[key]++;

                        koliko.textContent = cart[key];
                            
                        if (isNaN(parseInt(kosarica.textContent))) {
                            kosarica.textContent = 1;
                        } else {
                            kosarica.textContent = parseInt(kosarica.textContent) + 1;
                        }
                    } else {
                        throw new Error("Neuspješan zahtjev");
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
            });
    
            let minus = document.createElement("button");
            minus.textContent = "-";
            minus.id = "minus";
            minus.className = "promijeni";
    
            minus.addEventListener("click", () => {
                const url5 = "/cart/remove/" + encodeURIComponent(key);

                fetch(url5, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        if (cart[key] != 0 && cart[key] != null) {
                            cart[key]--;
                            koliko.textContent = cart[key];
                            if (cart[key]==0) {
                                delete cart[key];
                                mainGrid.removeChild(prodDiv);
                            }
                                
                            kosarica.textContent = parseInt(kosarica.textContent) - 1;
                        }
                    } else {
                        throw new Error("Neuspješan zahtjev");
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
            });
    
            prodDiv1.appendChild(ime);
                
            prodDiv2.appendChild(minus);
            prodDiv2.appendChild(koliko);
            prodDiv2.appendChild(plus);
                
            prodDiv.appendChild(prodDiv1);
            prodDiv.appendChild(prodDiv2);
            mainGrid.appendChild(prodDiv);
        }
    }
  })
  .catch(error => {
    console.log(error.message);
  });

