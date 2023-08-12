
import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../propiedad/apiMapProp.js";

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    }
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data
    let data = response.data;
    console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        console.log(selectedValue);
        console.log(data);
        console.log(response);

        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

  //Todo: Set loading
  function setContainerLoading(isLoading){
    let spinner = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;

    if(isLoading == true){
        let containerGrid = document.getElementById('container-propiedad');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad").innerHTML = spinner
        }
        let containerList = document.getElementById('container-propiedad-list');
        if (containerList !== null) {
            document.getElementById("container-propiedad-list").innerHTML = spinner
        }
        let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            document.getElementById("div-map-section").innerHTML = spinner
        }
    }
  }

  //todo: Cantidad de limite en las propiedades
  const filtroLimit = document.getElementById('FilterLimit');
  filtroLimit.addEventListener('change', handleLimitChange);
  async function handleLimitChange() {
    setContainerLoading(true);
    try {
        //* el segundo digito es el limit
        response = await getProperties(1, filtroLimit.value, CodigoUsuarioMaestro, 1, companyId, realtorId);

        //* setear variables
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        //* Guardar vaariables en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        localStorage.setItem('countPage', JSON.stringify(1));
        localStorage.setItem('LimitProperties', filtroLimit.value);
        
        //* Actualizar variables
        data = response.data;
        //* llamar funciones para actualizar visualmente.
        data = data.map(item => {
            // Reemplazar "\\" por "//" en la propiedad "image"
            item.image = item.image.replace(/\\/g, "//");
            return item;
        });
        
        paginationCall();
        showItems();
    } catch (error) {
        console.error('Error in handleLimitChange:', error);
    }
  }

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        data = data.map(item => {
            // Reemplazar "\\" por "//" en la propiedad "image"
            item.image = item.image.replace(/\\/g, "//");
            return item;
        });
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-propiedad');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad").innerHTML = data.map(data =>`
            <div class="col-lg-4 col-md-6 col-sm-6" style="overflow: hidden;">
                  <div class="property-item">
                    <div class="bg-success property-item-img" style="overflow:hidden">
                      <a href="/detalle_propiedad.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop">`}
                        </a>
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
            `).join("");
        };

        let containerList = document.getElementById('container-propiedad-list');
        if (containerList !== null) {
        document.getElementById('container-propiedad-list').innerHTML = data.map(data =>
                  `	<div class="col-property-item col-lg-12 col-sm-12"  style="overflow: hidden;" >
                  <div class="property-item flex-row align-items-center">
                  <div class="bg-success property-item-img" style="max-width: 40%; max-height: 30%; height:auto !important">
                      <a href="/detalle_propiedad.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid  img-prop-map">`}
                        </a>
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
                </div>
              ` ).join("");
        }

        let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        };
    };
}
