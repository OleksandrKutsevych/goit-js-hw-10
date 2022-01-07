import Notiflix from 'notiflix';
const SETTINGS = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?${SETTINGS}`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
