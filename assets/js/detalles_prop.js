import apiDetalleCall from "./propiedad/apiDetalle.js";
// const getId = window.location.search;
// console.log(getId);
const url = window.location.search; 
const value = url.match(/\d+/)[0];
// console.log(url); 
// console.log(value); 




apiDetalleCall(value, 1, 1);