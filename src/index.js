import Auth from "@utils/Auth.js";
import Form from "@utils/Form.js";
import Modal from "@utils/Modal.js";
import Piezas from "@utils/Piezas.js";
import User from "@utils/Users.js";
import Sectores from "@utils/Sectores.js";
import { isValidForm } from "@utils/Tools.js";
import ApiGoogleSheet from "@utils/ApiGoogleSheet.js";
import ConstGoggleSheet from "@utils/ConstGoggleSheet.js";
import '@styles/main.css';
const DataForm = {}
const API_KEY = process.env.API_KEY;
const CLIENT_ID = process.env.CLIENT_ID;
const main = async () => {
  const auth = await Auth(API_KEY, CLIENT_ID);
  if (auth) {
    render();
    document.getElementById("search").addEventListener("click", findProduct);
  }
};
const render = async () => {
  let content = document.getElementById("content");
  content.innerHTML = Form();
  try {
    /* Ingresar nombre por email */
    let newUser = new User();
    let user = await newUser.getUserByEmail();
    if (user) {
      document.querySelector(
        '[name="solicita"]'
      ).value = `${user.apellido} ${user.nombre}`;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    /* Ingresa sectores */
    let sectores = await Sectores();
    let sectoresProductivos = sectores.filter((item) => {
      return (
        item.area === "Ingeniería" ||
        item.area === "Procesos" ||
        item.area === "Producción" ||
        item.area === "Servicios"
      );
    });
    let sector = document.querySelector('[name="sector"]');
    sectoresProductivos.map((item) => {
      sector.innerHTML += `<option value="${item.sector}">${item.sector}</option>`;
    });
  } catch (e) {
    console.log(e);
  }
};
const findProduct = async () => {
  let codigo = document.querySelector('[name="codigo"]');
  codigo = codigo.value.trim().toLocaleUpperCase();
  if (codigo.value != "") {
    let btnSubmit = document.querySelector('[title="submit"]');
    /* Mostrar modal */
    let newModal = new Modal({
      title: "Validando requerimientos",
      content: "Validando código de pieza ingresado",
    });
    newModal.openModal();
    let newPiezas = new Piezas();
    let isValidCod = await newPiezas.isValidCod(codigo);
    if (isValidCod) {
      let data = await newPiezas.getDataByCod(codigo);
      document.querySelector('[name="descripcion"]').value = data.descripcion;
    } else {
      document.querySelector('[name="descripcion"]').value = "";
      btnSubmit.setAttribute("disabled", "");
      console.log("Código no encontrado");
    }
    newModal.closeModal();
    btnSubmit.removeAttribute("disabled");
    btnSubmit.addEventListener("click", sendForm);
  }
};
const sendForm = async (event) => {
  let form = document.querySelector("form");
  let valid = isValidForm(event, form);
  if (valid) {
    let newModal = new Modal({
      title: "Enviando Solicitud",
      content: "Se estan enviando los datos para su procesamiento",
    });
    let inputsData = form.querySelectorAll('[name]');
    inputsData.forEach(item => {
        DataForm[item.name] = item.value
    })
    console.log(DataForm)
    newModal.openModal();
    const sheetId = ConstGoggleSheet.reg_Solicitud.sheetId;
    const range = ConstGoggleSheet.reg_Solicitud.range.Requisicion
    const newRegister = new ApiGoogleSheet({range:range, sheetId: sheetId});
    
    let response = await newRegister.postData(DataForm);
    console.log(response)
    newModal.closeModal() 
  }
};
window.addEventListener("load", main);
