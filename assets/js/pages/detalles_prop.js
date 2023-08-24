import { PropertyData } from "../Data/userId.js";
import apiDetalleCall from "../Propiedades/apiDetalle.js";
// const getId = window.location.search;
// console.log(getId);
const url = window.location.search; 
const value = url.match(/\d+/)[0];
// console.log(url); 
// console.log(value); 
const {companyId,realtorId
} = PropertyData;
apiDetalleCall(value ,realtorId, 1, companyId);