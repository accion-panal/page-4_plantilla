import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

export default async function apiCall() {
  const response = await getProperties(1, 10, 0, 1, 1);
  const data = response.data;

  const buttons = document.getElementById("buttons");

  let btnNext;
  let btnPrev;

  console.log(data);

  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor;
  const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

  const filtroSelect = document.getElementById('FilterPrice');
  filtroSelect.addEventListener('change', handleFilterChange);
  showItems();

  function handleFilterChange() {
    const selectedValue = filtroSelect.value;
    console.log(selectedValue);
    console.log(data);
  
    let dataOrdenada;
  
    if (selectedValue === 'MayorMenor') {
      /* console.log('La opción seleccionada es MayorMenor'); */
      dataOrdenada = data.sort((a, b) => b.price - a.price);
    } else {
      /* console.log('La opción seleccionada es Menor mayor'); */
      dataOrdenada = data.sort((a, b) => a.price - b.price);
    }
    console.log(dataOrdenada);
    showItems();
  }

  document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas
	</span>`;


  function showItems() {
    document.getElementById("container-propiedad").innerHTML = data.map(data =>
     `<div class="col-lg-4 col-md-6 col-sm-6" >
                  <div class="property-item">
                    <div class="bg-success property-item-img">
                      <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                        ><img
                          class="img-fluid imgPropsCard"
                          src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "img/Sin.png"}"
                          alt=""
                      /></a>
                    </div>
    
                    <div class="card-body">
                      <div class="principal-info">
                        <small>${data.types}/ ${data.operation}</small>
                        <a class="card-title textLimitClass" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
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
                </div>
     `
  ).join("");

//   btnNext = response.meta.nextPageUrl
//     ? `<button class="btn page-item" data-url=${response.meta.nextPageUrl}>
//         <a class="page-link">
//           <i class="fa-sharp fa-solid fa-arrow-right "></i>
//         </a>
//       </button>`
//     : "";

//   btnPrev = response.meta.lastPageUrl
//     ? `<button class="btn page-item" data-url=${response.meta.lastPageUrl} >
//         <a class="page-link" href="">
//           <i class="fa-sharp fa-solid fa-arrow-left"></i>
//         </a>
//       </button>
// `
//     : "";

//   buttons.innerHTML = btnPrev + " " + btnNext;

  document.getElementById("container-propiedad-list").innerHTML = data
    .map(data => `<div class="col-property-item col-lg-12 col-sm-12" >
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
                <i class="fa-sharp fa-solid fa-bed"></i>${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}
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
    // buttons.addEventListener('click', (e) => {
    //   if(e.target.classList.contains('btn')){
    //     let value= e.target.dataset.response;
    //     apiCall(value)
        
    //   }
    // })
  }
  
}


