'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const country = "germany";
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = function(data) {

    // Flag finder
    const flags = data?.flags || {};
    const flag_url =
        flags?.svg ??
        flags?.png ??
        flags?.jpg ??
        flags?.jpeg ??
        Object.values(flags)[0];
  
    // Name finder
    const names = data?.name || {};
    const name =
        names?.common ??
        names?.official ??
        Object.values(names)[0];

    // Find continents
    const continents = data?.continents ?? "No continent found";

    // Find population
    const population  = data?.population ?? "No population found";

    // Find languages
    const languages = data?.languages || {}
    const language =
        languages?.eng ??
        languages?.fra ??
        Object.values(languages)[0];

    // Find currency
    const currencies = data?.currencies || {}
    const currency = Object.values(currencies)[0];
    const currencyName =
        currency?.name ??
        Object.values(currency)[0];
    
    const html = `<article class="country">
            <img class="country__img" src="${flag_url}" />
            <div class="country__data">
                <h3 class="country__name">${name}</h3>
                <h4 class="country__region">${continents}</h4>
                <p class="country__row"><span>👫</span>${population}</p>
                <p class="country__row"><span>🗣️</span>${language}</p>
                <p class="country__row"><span>💰</span>${currencyName}</p>
            </div>
            </article>`;
    countriesContainer.insertAdjacentHTML('beforebegin', html);
    countriesContainer.style.opacity = 1;
}

const getCountry = function (country) {
    const request = fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data[0];
    })
    return request;
}
const getCountryAndNeighbour = function (country) {
    
    const request = fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response) {
        return response.json(); // we are creating another promise by returning the promise that was given to us from our fetch
    }).then(function(data) { //this is the response promised from return response.json()
        renderCountry(data[0]);
        if (data[0]?.borders) {
            for (let country of data[0].borders) {
                getCountry(country).then(function(data) {
                    renderCountry(data);
                });
            }
        }
    });
};

btn.addEventListener('click', function () {    
    getCountryAndNeighbour(country);
    btn.style.display = "none";
});

