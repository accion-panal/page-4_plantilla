import { getProperties, getPropertiesForCustomUrl } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf, validationUF, validationCLP, ufToClp } from "../utils/getExchangeRate.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";
import apiCallMap from "./apiMapProp.js";
import paginationCall from "../utils/pagination.js";

//* borrar localStorage la primera vez.
localStorage.removeItem('globalFiltersUrl');

let defaultLimit = limitDataApi.limit;

function changeUrlImage(data) {
  return data.map(item => {
    // Reemplazar "\\" por "//" en la propiedad "image"
    item.image = item.image.replace(/\\/g, "//");
    return item;
  });
}

function ObjToStr(query) {
  //Operacion
  let operation = (query.operationType !== undefined && query.operationType !== null && query.operationType !== '') ? '&operationType=' + query.operationType : '';
  //Tipo de propiedad
  let typeOfProperty = (query.typeOfProperty !== undefined && query.typeOfProperty !== null && query.typeOfProperty !== '') ? '&typeOfProperty=' + query.typeOfProperty : '';
  //habitaciones
  let bedrooms = (query.bedrooms !== undefined && query.bedrooms !== null && query.bedrooms !== '') ? '&bedrooms=' + query.bedrooms : '';
  //banios
  let bathrooms = (query.bathrooms !== undefined && query.bathrooms !== null && query.bathrooms !== '') ? '&bathrooms=' + query.bathrooms : '';
  //estacionamiento
  let parkingLots = (query.covered_parking_lots !== undefined && query.covered_parking_lots !== null && query.covered_parking_lots !== '') ? '&covered_parking_lots=' + query.covered_parking_lots : '';
  //precio minimo
  let minPrice = (query.min_price !== undefined && query.min_price !== null && query.min_price !== '') ? '&min_price=' + query.min_price : '';
  //precio maximo
  let maxPrice = (query.max_price !== undefined && query.max_price !== null && query.max_price !== '') ? '&max_price=' + query.max_price : '';
  //superficie m2
  let surface_m2 = (query.surface_m2 !== undefined && query.surface_m2 !== null && query.surface_m2 !== '') ? '&surface_m2=' + query.surface_m2 : '';
  //comuna
  let commune = (query.commune !== undefined && query.commune !== null && query.commune !== '') ? '&commune=' + query.commune : '';
  //region
  let nameRegion = '';
  if (query.region !== undefined && query.region !== null && query.region !== '' && query.region !== '0') {
    nameRegion = '&region=' + query.region.replace(/\d+/, '').trim();
  }

  let filtersUrl = operation + typeOfProperty + bedrooms + bathrooms + parkingLots + minPrice + maxPrice + nameRegion + commune + surface_m2;
  localStorage.setItem('globalFiltersUrl', filtersUrl);
  localStorage.setItem('globalCurrentPage', 1);
  return filtersUrl;
}

function resetNumberPage() {
  return 1;
}


//Todo: Set loading
function setContainerLoading(isLoading){
  let spinner = `<div class="spinner-border" role="status" style="margin: 10px 0;"><span class="visually-hidden">Loading...</span></div>`;

  if(isLoading == true){
    let containerGrid = document.getElementById('container-propiedad');
    if (containerGrid !== null) {
        document.getElementById("container-propiedad").innerHTML = spinner
    }
    let containerList = document.getElementById('container-propiedad-list');
    if (containerList !== null) {
        document.getElementById("container-propiedad-list").innerHTML = spinner
    }
  }
}

function validateImage(image){
  if(image){
    if(image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg')){
      return `<img src=${image} alt="Image" class="img-fluid img-prop">`;
    }
    return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop">`;
  }
  else{
    return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop">`;
  }
}

function validateImageList(image){
  if(image){
    if(image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg')){
      return `<img src=${image} alt="Image" class="img-fluid img-prop-map">`;
    }
    return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop-map">`;
  }
  else{
    return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop-map">`;
  }
}



export default async function renderCall(QueryParams = undefined, NumberPagination = undefined, filtersUrlString = undefined) {
  console.log('%c==================', 'color:cyan');
  console.log('%cRender.js Render.js Render.js', 'color:cyan');
  //* INICIALIZACION DE VARIABLES
  setContainerLoading(true);
  const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
  let filtersUrl = '';
  let page1 = '';
  let pageCall = 1;

  //* Validar la cantidad de propiedades a visualizar
  let storedLimitProp = localStorage.getItem('LimitProp');
  if (storedLimitProp) {
    defaultLimit = storedLimitProp;
    page1 = NumberPagination;
  }

  console.log('QueryParams ', QueryParams);
  

  if (filtersUrlString) {
    filtersUrl = filtersUrlString;
  }
  else if (QueryParams) {
    filtersUrl = ObjToStr(QueryParams);
    page1 = resetNumberPage();
  }
  console.log(filtersUrl)

  
  if (NumberPagination) {
    pageCall = NumberPagination;
  }

  console.log('pageCall: ', pageCall);
  console.log('NumberPagination: ', NumberPagination);

  let response = await getPropertiesForCustomUrl(pageCall, defaultLimit, CodigoUsuarioMaestro, 1, companyId, realtorId, filtersUrl);
  //* Calcular la pagina maxima
  let maxPage = Math.ceil(response.meta.totalItems / response.meta.limit);
  //* Guardar en el localStorage
  localStorage.setItem('globalResponse', JSON.stringify(response));
  localStorage.setItem('maxPage', JSON.stringify(maxPage));
  console.log('max-page: ', maxPage);

  //! console log para saber el contenido del response despues del if
  console.log('response: ', response)

  //* Guardamos el data del response en una variable data 
  let data = response.data;
  console.log('data: ', data)

  //* Cambio del Uf
  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor;
  const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

  //! transformar valor del uf a int
  const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
  const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);

  //todo: Modificar url de image
  data = changeUrlImage(data);

  //todo: LLamamos a la funcion que muestra las cards
  showItems();
  paginationCall(page1);


  //todo: Filtros Extras
  const filtroSelect = document.getElementById('FilterPrice');

  if (filtroSelect.value === 'MayorMenor' || filtroSelect.value === 'MenorMayor'){
    handleFilterChange();
  }

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
        response.data = data.sort((a, b) => {
          const priceA = validationUF(a.currency.isoCode) ? ufToClp(a.price, ufValueAsInt) : a.price;
          const priceB = validationUF(b.currency.isoCode) ? ufToClp(b.price, ufValueAsInt) : b.price;
          return priceB - priceA;
        });
      } else {
        //* la data ordenada se guarda en response.data
        //* y se actualiza el localStorage de globalResponse
        response.data = data.sort((a, b) => {
          const priceA = validationUF(a.currency.isoCode) ? ufToClp(a.price, ufValueAsInt) : a.price;
          const priceB = validationUF(b.currency.isoCode) ? ufToClp(b.price, ufValueAsInt) : b.price;
          return priceA - priceB;
        });
      }
      console.log('dataOrdenadaResponse: ',response);
      //* Se llama al showItems para actualizar las cards
      showItems();
  }

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
                      <a href="/detalle_propiedad.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank">
                        ${validateImage(data.image)}
                      </a>
                    </div>
    
                    <div class="card-body">
                      <div class="principal-info">
                        <small>${data.types}/ ${data.operation}</small>
                        <a class="card-title textLimitClass" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" target="_blank">
                          ${data.title}
                        </a>
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
                        <p>UF: ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}  / CLP ${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price) : parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</p>
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
                      <a href="/detalle_propiedad.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank">
                        ${validateImageList(data.image)}
                      </a>
                    </div>
            
                    <div class="card-body">
                      <div class="principal-info">
                        <small>${data.types} / ${data.operation}</small>
                        <a class="card-title" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" target="_blank">
                        ${data.title}
                        </a>
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
                        <p>UF: ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)} / CLP ${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price) : parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</p>
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
