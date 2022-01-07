import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

let refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  let country = refs.countryInput.value.trim();
  console.log('country', country);
  if (country === '') {
    clearList();
    return;
  }
  fetchCountries(country).then(countries => {
    console.log(countries);
    clearList();
    if (countries === undefined) {
      return;
    }
    if (countries.length === 1) {
      //розмітка з однією країною
      refs.countryList.style.display = 'none';
      renderCountryCard(countries);
    } else if (countries.length <= 10) {
      // markup from 2 to 9 countries
      refs.countryList.style.display = 'flex';
      renderCountriesListMrkup(countries);
    } else {
      //alert then too march countries
      manyMatchesFound(countries);
    }
  });
}

function clearList() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryCard(country) {
  let countryMarkup = country.map(({ name, flags, capital, population, languages }) => {
    return `
      <div class='country-info__head'>
        <img class='country-list__flag' src='${flags.svg}' alt='${
      name.official
    }' width='30' height='30' />
       <h1 class='country-list__title'>${name.official}</h1>
      </div>
      <p><b>Capital: </b>${capital}</p>
      <p><b>Population: </b>${population}</p>
      <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>
    `;
  });
  return refs.countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
}

function renderCountriesListMrkup(countries) {
  let listMarkup = countries
    .map(({ name, flags }) => {
      return `<li class='country-list__item'>
              <img class='country-list__flag' src='${flags.svg}' alt='flag of ${name.official}' width='30' height='30' />
              <h2 class='country-list__name'>${name.official}</h2>
            </li>`;
    })
    .join('');
  return refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
}

function manyMatchesFound() {
  return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}
