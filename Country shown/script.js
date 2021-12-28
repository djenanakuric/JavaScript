'use strict';

// DOM selector
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


//function for contrys
const getCountryData = function (country) {

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();
console.log(request.responseText);
request.addEventListener('load', function() {
  console.log(request.responseText);

  const [data] = JSON.parse(request.responseText);
  console.log(data);

  const html = `<article class="count9ry">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div> 
        </article>`;
        
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
});

};
 
// call the function 
getCountryData('portugal');
getCountryData('usa');
getCountryData('cro');
