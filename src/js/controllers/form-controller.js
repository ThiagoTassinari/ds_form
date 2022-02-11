import Address from '../models/address.js';

//Função construtora para representar qual o tipo do estado do módulo
function State() {
    this.address = new Address();
    
    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;
    
    this.errorCep = null;
    this.errorNumber = null;
 
    this.btnSave = null;
    this.btnClear = null;
}

// Instaciei um objeto com nossa função construtora State()
const state = new State();

// Inicializa todos os valores do estado dentro da função init
export function init() {
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
}

handleInputNumberChange((e) => {
    if (e.target.value == "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
})

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}