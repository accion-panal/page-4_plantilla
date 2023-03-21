// import { getProperties } from "../services/PropertiesServices.js";

// let query = {}

// //Guardo referencia a todos los inputs del filtro
// document.getElementById("typeOfOperation").addEventListener( "change", (element) => {
//   query.typeOperation = element.target.value;
// });

// document.getElementById("typeOfProperty").addEventListener( "change", () => {
//   query.typeOfProperty = element.target.value;
// });

// document.getElementById("region").addEventListener( "change", () => {
//   query.region = element.target.value;
// });

// document.getElementById("commune").addEventListener( "change", () => {
//   query.commune = element.target.value;
// });

// document.getElementById("min_price").addEventListener( "change", () => {
//   query.min_price = element.target.value;
// });

// document.getElementById("max_price").addEventListener( "change", () => {
//   query.max_price = element.target.value;
// });

// document.getElementById("bathrooms").addEventListener( "change", () => {
//   query.bathrooms = element.target.value;
// });

// document.getElementById("bedrooms").addEventListener( "change", () => {
//   query.bedrooms = element.target.value;
// });

// document.getElementById("surface_m2").addEventListener( "change", () => {
//   query.surface_m2 = element.target.value;
// });

// //Referencia al boton de buscar para comenzar la busqueda al hacer click
// document.getElementById("buscar").addEventListener( "click", async() => {
//   console.log('asdas');
//   let {typeOperation, typeOfProperty, region, commune, min_price, max_price, bathrooms, bedrooms, surface_m2} = query;
//   //Paso por paramentro todos los valores de input para ser llamados en servicion 
//   let {data} = await getProperties(1, 10, typeOperation, typeOfProperty, region, commune, min_price, max_price, bathrooms, bedrooms, surface_m2)

//   //Aqui agregamos nuestra plantilla y cada elemento encontrado en la busqueda anterior se generara un card y seteara los datos correspondientes
//   //(Esta debe ser modifiquica de acuerdo a la plantilla requirada)

//   //Referencia al contenedor donde se mapearan los elementos
//   document.getElementById('container-cards').innerHTML = data.map(({image, title, commune, city, isoCode, price, surface_m2, bedrooms, bathrooms,coveredParkingLots}) => 
//     //Plantilla a ingresar (independiente a la plantilla) recordar ingresar los datos
//     `<div class="col-4 mt-3">
//       <div class="card" style="width: 100%;height: 100%; margin: 0 auto;">
//         <a href="propiedad.html" style="color: gray">
//         <span class="uf-item-price">Venta</span>
//         <div class="image-wrapper">
//           <img src="${image}"  class="card-img-top" alt="...">
//         </div>
//         <div class="card-body">
//           <h5 class="card-title text-bold">${title}</h5>
//           <p class="card-text mb-0"><i class="fa-solid fa-location-dot"></i>${city}, ${commune} </p>
//           <p class="card-text" style="font-weight: bold ;">${isoCode} $ ${price}</p>
//           <hr style="border-bottom: 3px solid black;" />
//           <div class="d-flex justify-content-around">
//             <p style="font-weight: bold;">M&sup2 ${surface_m2}</p>
//             <p><i class="fa-solid fa-bed"></i> ${bedrooms}</p>
//             <p><i class="fa-solid fa-toilet"></i> ${bathrooms}</p>
//             <p><i class="fa-solid fa-car"></i> ${coveredParkingLots}</p>
//           </div>
//         </div>
//       </a>
//       </div>
//     </div>`
//   ).join('') 
// });