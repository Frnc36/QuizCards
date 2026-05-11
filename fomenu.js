export function kepMegjelenites(){
    let tanulo_kartyaElem = document.querySelector("#tanulo_kartya");
    let kvizElem = document.querySelector("#kviz");

    tanulo_kartyaElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/tanulokartyak.png" alt="tanulokartyak">`;

    kvizElem.innerHTML = `<img class="fomenu_kepek" src="Kepek/kviz.png" alt="kviz">`;
}
