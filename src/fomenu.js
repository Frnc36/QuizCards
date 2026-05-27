export function kepMegjelenites(){
    let tanulo_kartyaElem = document.querySelector("#tanulo_kartya");
    let kvizElem = document.querySelector("#kviz");

    tanulo_kartyaElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/tanulokartyak.png" alt="tanulokartyak">`;

    kvizElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/kviz.png" alt="kviz">`;

    //tanulókártya
    tanulo_kartyaElem.addEventListener("mouseenter", () => {
        tanulo_kartyaElem.innerHTML = `<div class="kartya_szoveg">
        <h1>Tanulókártyák</h1>
        <p>Tanulj gyorsan és rendszerezetten!<br>
        Interaktív kártyák segítenek
        az alapfogalmak és a haladó témák elsajátításában.
        Gyakorolj PHP, JavaScript és Java nyelveken,
        és építs stabil programozói tudást!</p>
        </div>`;
    });

    tanulo_kartyaElem.addEventListener("mouseleave", () => {
        tanulo_kartyaElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/tanulokartyak.png" alt="tanulokartyak">`;
    });

    //kvíz
    kvizElem.addEventListener("mouseenter", () => {
        kvizElem.innerHTML = `<a href="kvizTema.html">
        <div class="kartya_szoveg">
        <h1>Kvíz</h1>
        <p>Teszteld a tudásod kérdéseken keresztül!<br>
        Válassz a lehetőségek közül,
        és találd meg a helyes választ.
        A rendszer színnel jelzi,
        hogy jó vagy hibás választ adtál.
        </div></a>`;
    });

    kvizElem.addEventListener("mouseleave", () => {
        kvizElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/kviz.png" alt="kviz">`;
    });

}
