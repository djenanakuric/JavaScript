'use strict';

// DOM selector
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
    const html = `<article class="country" ${className}>
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
}
/*
//function for contrys
const getCountryData = function (country) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
    console.log(request.responseText);
    request.addEventListener('load', function () {
        console.log(request.responseText);

        const [data] = JSON.parse(request.responseText);
        console.log(data);
        renderCountry(data)

    });

};
*/
const getCountryData = function (country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
        .then(response => response.json())
        .then(data1 => {
            renderCountry(data1[0]);
            const neighbour = data1[0].borders[0];

            if (!neighbour) return;

            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
              
        })
        .then(response => response.json())
        .then(data1 => renderCountry(data1, 'neighbour'));
};


getCountryData('portugal');
/*
// call the function 
getCountryData('portugal');
getCountryData('usa');
getCountryData('cro'); */
