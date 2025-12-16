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
    const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            if (response.status === 404) {
                return fetch(`https://restcountries.com/v3.1/alpha/${country}`);
            }
            return response;
        })
        .then((response) => {
            if (response.status === 404) {
                throw new Error(`Country ${country} not found (404)`);
            }
            return response.json();
        })
        .then((data) => {
            return data[0];
        })
        .catch((err) => {
            console.error(err);
        })
    return request;
}
const getCountryAndNeighbour = function (country) {
    
    const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            renderCountry(data[0]);
            if (data[0]?.borders) {
                for (let country of data[0].borders) {
                    getCountry(country)
                        .then((data) => {
                            renderCountry(data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        });
};

const reverseGeocode = function (lat, long, api_key) {
    const request = fetch(`https://us1.locationiq.com/v1/reverse?key=${api_key}&lat=${lat}&lon=${long}&format=json&`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not complete reverse geocode request`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        }).catch((err) => {
            throw new Error(err);
        });
    return request;
}

const getCountryFromLatandLong = function (lat, long, api_key) {
    const request = reverseGeocode(lat, long, api_key)
    .then((data) => {
        return data.address.country;
    }).catch((err) => {
        throw new Error(err);
    });
    return request;
}

const api_key = "pk.f26417f130e2548fe27983b20141d55f";
const lat = 40.714224;
const long = -73.961452;

btn.addEventListener('click', function () {
    const country = getCountryFromLatandLong(lat, long, api_key).then((country) => {
        return getCountryAndNeighbour(country);
    }).catch((err) => {
        throw new Error(err);
    });
    btn.style.display = "none";
});