import Tema from "./Tema.js";



export function megjelenit(elem, tema) {
    if (!elem || !tema) return;

    elem.innerHTML = `
        <a href="${tema.getNev()}.html">
            <div class="kartya_szoveg">
                <h1>${tema.getNev()}</h1>
                <p>Kattints a ${tema.getNev()} kvízhez</p>
            </div>
        </a>
    `;
}

