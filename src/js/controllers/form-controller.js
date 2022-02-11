import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js'
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
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
}

function handleInputNumberChange(e) {
    if (e.target.value == "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
}

async function handleInputCepChange(e) {
    const cep = e.target.value;
    try {
        const address = await addressService.findByCep(cep);
        
        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address;
    
        setFormError("cep", "");
        state.inputNumber.focus();
    } catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        
        setFormError("cep", "Informe um CEP válido!");
    }
}

function handleInputNumberKeyup(e) {
    state.address.number = e.target.value;
}

function handleBtnSaveClick(e) {
    e.preventDefault();

    const errors = addressService.getErrors(state.address);

    const keys = Object.keys(errors);

    if (keys.length > 0) {
        /* Classic Function
        for(let i = 0; i < keys.length; i++) {
            console.log(keys[i], errors[keys[i]])
            setFormError(keys[i], errors[keys[i]])
        } */

        // Arrow function
        keys.forEach(key => {
            setFormError(key, errors[key]);
        }); 
    } else {
        listController.addCard(state.address);
        clearForm();
    }
}

function handleBtnClearClick(e) {
    e.preventDefault();
    clearForm();
};

function clearForm() {
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity = "";

    setFormError("cep", "")
    setFormError("number", "");

    state.address = new Address();

    state.inputCep.focus();
};

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}