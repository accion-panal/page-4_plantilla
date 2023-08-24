import apiCallMapDetail from "../Propiedades/apiMapDetalle.js";
import { PropertyData } from '../Data/userId.js';

const {companyId,realtorId} = PropertyData;

const url = window.location.search; 
const value = url.match(/\d+/)[0];

apiCallMapDetail(value,realtorId, 1, companyId);