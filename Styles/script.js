const copiarBtn = document.querySelector('.copiar');
const descriptografarBtn = document.querySelector('.descriptografar');
const criptografarBtn = document.querySelector('.criptografar');
const input = document.querySelector("#mensagem");
const output = document.querySelector("#outmessage");
const noMessage = document.querySelector('.nomessage');
const active = document.querySelector('.active');
const dynamicComponents = [noMessage, active];
const buttons = [copiarBtn, descriptografarBtn, criptografarBtn];
var vogais = ['a', 'i', 'u', 'e', 'o'];
var codes = {
    "a": "o",
    "i": "rv",
    "u": "7rm",
    "e": "tak",
    "o": "mlj"
};

function fuiClicado() {
    alert('Fui clicado!');
};

function removerAcentos(e) {
    e.preventDefault();
    let texto = e.target.value;
    e.target.value = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toggleHidden(component) {
    component.classList.toggle('hidden');
};

function inputLowerCase(e) {
    e.preventDefault();
    e.target.value = e.target.value.toLowerCase();
}

function checkHidden(text) {
    let mainHidden = active.classList.contains('hidden');
    if (text == "") {
        if (!mainHidden) {
            dynamicComponents.forEach(toggleHidden);
        }
        return false;
    } else {
        if (mainHidden) {
            dynamicComponents.forEach(toggleHidden);
        }
        return true;
    }
}

function criptografar(e) {
    e.preventDefault();
    let descriptado = input.value;
    let encriptar = checkHidden(descriptado);

    if (encriptar) {
        let encriptado = "";

        for (let char of descriptado) {
            if (vogais.includes(char)) {
                char += codes[char]; 
            }
            encriptado += char;
        }

        output.value = encriptado;
    }
}

function descriptografar(e) {
    e.preventDefault();
    let encriptado = input.value;
    let descriptado = encriptado;

    for (let i in codes) {
        if (codes[i] == 'i') {
            let charCount = 0;
            let newString = "";
            for (let char of descriptado) {
                if (char == 'i' && descriptado[charCount - 1] == "a") {
                    char = "";
                }
                newString += char;
                charCount++;
            }
            descriptado = newString;
        } 
        else {
            descriptado = descriptado.replaceAll(codes[i], "");
        }
    }

    output.value = descriptado;
}

function copiar(e) {
    e.preventDefault();
    let text = output.value;
    navigator.clipboard.writeText(text);
}

criptografarBtn.addEventListener('click', criptografar);
descriptografarBtn.addEventListener('click', descriptografar);
copiarBtn.addEventListener('click', copiar);
input.addEventListener('input', inputLowerCase);
input.addEventListener('input', removerAcentos);