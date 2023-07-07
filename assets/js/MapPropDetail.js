import apiCallMapDetail from "./propiedad/apiMapDetalle.js";
import { PropertyData } from './Data/userId.js';

const {CompanyId,realtorId} = PropertyData;

const url = window.location.search; 
const value = url.match(/\d+/)[0];

apiCallMapDetail(value,realtorId, 1, CompanyId);
