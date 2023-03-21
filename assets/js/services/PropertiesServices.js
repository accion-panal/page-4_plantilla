import api from "./AuthencationServices.js"

export const getProperties = async( page = 1, limit = 10, realtorId = 5, statusId = 5, operationType = "", typeOfProperty = "", region = "", commune = "", min_price = 0, max_price = 10000000000000, covered_parking_lots = 1, bathrooms = 1, surface_m2 = "", bedrooms = 1) => {
  let {data} = await api.get(`properties?page=${page}&limit=${limit}&realtorId=${realtorId}&statusId=${statusId}&operationType=${operationType}&typeOfProperty=${typeOfProperty}&region=${region}&commune=${commune}&min_price=${min_price}&max_price=${max_price}&covered_parking_lots=${covered_parking_lots}&bathrooms=${bathrooms}&surface_m2=${surface_m2}&bedrooms=${bedrooms}`);
  return data;
}

export const getPropertiesForId = async( id , realtorId = 5, statusId = 5) => {
  let {data} = await api.get(`properties?id=${id}&realtorId=${realtorId}&statusId=${statusId}`);
  
  return data;
}