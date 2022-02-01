document.addEventListener("DOMContentLoaded", function () {
//création de mes section de "Si j'étais ... Je serais..."
    //lier le data.json
    fetch('data.json').then(function (response) {
        response.json().then(function (data) {
            data.forEach(function afficheAnalogie(resultat) {
                document.querySelector('#list-analogies').innerHTML += "<section class=\"sec\" id=" + resultat.id + "><h1>Si j’étais " + resultat.analogie + ", je serais" + resultat.Valeuranalogie + ".</h1><img src=" + resultat.img + " alt=\"\" class=\"image\"><p class=\"justify\"> " + resultat.justify + " </p><a href=" + resultat.down + "  class=\"down\"><img src=\"img/down.png\"/></a></section>";
            })
        })
    });

//fenêtre modale
    var overlay = document.getElementById("overlay");

    document.querySelector("#show-modal-btn").addEventListener("click", () => {
        overlay.style.display = "block";
    });

    document.querySelector("#close-modal-btn").addEventListener("click", () => {
        overlay.style.display = "none";
    });

//mentions légales
    document.querySelector('.volet-invisible').addEventListener('click', function (click) {
        //création du déroulement
        document.querySelector('.volet-invisible').animate([{ height: '12em' }], { duration: 800 })
        setTimeout(function () {
            window.scrollTo(0, document.body.clientHeight);
        }, 2);
        //fixation du déroulement(le volet invisible devient 100% visible)
        setTimeout(function () {
            document.querySelector('.volet-invisible').classList.replace('volet-invisible', 'volet-visible')
                ;
        }, 800);
    });

    document.querySelector('.volet-invisible').addEventListener('click', function (click) {
        //cachée le volet
        document.querySelector('.volet-visible').animate([{ height: '3em' }], { duration: 800 })
        //fixation du déroulement(le volet visible devient 100% invisible)
        setTimeout(function () {
            document.querySelector('.volet-visible').classList.replace('volet-visible', 'volet-invisible')
                ;
        }, 800);
    });

//création d'une section quand on clique sur un button 
    document.querySelector('#sub').addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#you').innerHTML += "<section class=\"sec\"><h1>Si j’étais " + document.querySelector("#analogie").value + ", je serais " + document.querySelector("#valeurAnalogie").value + ".<img src=" + document.querySelector("#imganalogie").value + " alt='' class='img'></h1><p class=\"justify\"> " + document.querySelector("#arganalogie").value + " </p></section>";
//API
        fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=amezir.messaoud&courriel=" + document.querySelector("#mail").value + "&message=Si j'étais " + document.querySelector("#analogie").value + ",je serais " + document.querySelector("#valeurAnalogie").value + "Parce que " + document.querySelector("#arganalogie").value).then(function (response) {
            response.json().then(function (data) {
                if (data.status == "success") {
                    document.querySelector("#message").innerHTML = "Votre message a bien été reçu";
                } else {
                    document.querySelector("#message").innerHTML = "Problème : votre message n'a pas été reçu";
                }
            })
        })
    });
});