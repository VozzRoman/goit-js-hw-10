

const MAIN__LINK = "restcountries.com/v3.1/name/";
const FILTER__LINK = "fields=name,capital,currencies,population,languages,flags";
function fetchCountries(name) {
	return fetch(`https://${MAIN__LINK}${name}?${FILTER__LINK}`)
		.then(response => {
			return response.json()
		});
} 

export default { fetchCountries };