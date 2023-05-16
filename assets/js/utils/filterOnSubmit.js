import { getPropertiesOnForm } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";
 

const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      covered_parking_lots 
    );
  };

  let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    covered_parking_lots: "",
  }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }



  
document.getElementById('operationType').addEventListener('change',(element) =>{
    console.log(element.target.value)
    query.operationType = element.target.value;
    // const _operationType = operationType.length > 0 ? operationType : false;
    // return element.target.value;
    
 })
 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // return element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = element.target.value;  
 console.log(element.target.value)
      // return element.target.value;
})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  
    // return element.target.value;

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
  
  })
  
// document.getElementById("surface_m2").addEventListener( "change", (element) => {
//      query.surface_m2= element.target.value;
  
//   })

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})


document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/propiedad.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&surface_m2=${query.surface_m2}&bedrooms=${query.bedrooms}`
	);
});




 document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("total-prop").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-propiedad").innerHTML = filtred.data.map((data) => 
        `<div class="col-lg-4 col-md-6 col-sm-6" >
          <div class="property-item">
            <div class="bg-success property-item-img">
              <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                ><img
                  class="img-fluid imgPropsCard" style="height:270px !important;"
                  src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "img/Sin.png"}"
                  alt=""
              /></a>
            </div>

            <div class="card-body">
              <div class="principal-info">
                <small>${data.types}/ ${data.operation}</small>
                <a class="card-title" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                  >${data.title}</a
                >
                <p>
                  <i class="bi bi-pin-map"></i> ${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile
                </p>
              </div>
              <div class="secundary-info">
                <small>REF: ${data.id}</small>
                <div>
                  <span>
                    <i class="fa-sharp fa-solid fa-bed"></i>${data.bedroom != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}
                  </span>
                  <span>
                    <i class="fa-sharp fa-solid fa-toilet"></i>${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}
                  </span>
                </div>
              </div>
              <div class="more-info">
                <p>UF: ${clpToUf(data.price, ufValueAsNumber)}  / CLP ${parseToCLPCurrency(data?.price)}</p>
              </div>
            </div>
          </div>
        </div>`).join("");

  document.getElementById("container-propiedad-list").innerHTML = filtred.data.map((data) => `
  <div class="col-property-item col-lg-12 col-sm-12" >
          <div class="property-item flex-row align-items-center">
            <div class="bg-success property-item-img">
              <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                ><img
                  class="img-fluid imgPropsList"
                  src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "img/Sin.png"}"
                  alt=""
              /></a>
            </div>
    
            <div class="card-body">
              <div class="principal-info">
                <small>${data.types} / ${data.operation}</small>
                <a class="card-title" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                  >${data.title}</a
                >
                <p>
                  <i class="bi bi-pin-map"></i>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile
                </p>
              </div>
              <div class="secundary-info">
                <small>REF: ${data.id}</small>
                <div>
                  <span>
                    <i class="fa-sharp fa-solid fa-bed"></i>${data.bedroom != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}
                  </span>
                  <span>
                    <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}
                  </span>
                </div>
              </div>
              <div class="more-info">
                <p>UF: ${clpToUf(data.price, ufValueAsNumber)} / CLP ${parseToCLPCurrency(data?.price)}</p>
              </div>
            </div>
          </div>
        </div> `
        ).join("");     


	}, 3000);

  

    
   
  })
