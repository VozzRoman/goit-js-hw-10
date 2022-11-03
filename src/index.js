import './css/styles.css';
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let valueCountries = 10;

const inputRefer = document.querySelector('#search-box');
const container = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
console.log(inputRefer);

inputRefer.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY) );

function onInput(e) {
	const searchCountry = e.target.value.trim();
	if (searchCountry === '') {
		return (container.innerHTML = ''),( info.innerHTML = '');
	}
	API.fetchCountries(searchCountry)
		.then(renderMarkUpCard)
		.catch(onError);
	
}

function renderMarkUpCard(countries) {
		container.innerHTML = '';
		info.innerHTML = '';
	if (countries.length === 1) {
		container.innerHTML = createMarkUpList(countries);
		info.innerHTML = crateMarkUpInfo(countries);
	} else if (countries.length >= valueCountries) {
		wrongType();
	} else {
		container.innerHTML = createMarkUpList(countries);
	}

}

function createMarkUpList(countries) {
				const markUpCardList = countries.map(card => {
		return `
				 <li>
					<div class="list__box">
					<img src="${card.flags.svg}" alt="" width="120" height="80">
					<h2 class="list__country">${card.name.official}</h2>
					</div>
				</li>`
				}).join(' ');
	return markUpCardList;
}

function crateMarkUpInfo(countries) {
		const markUpCardInfo = countries.map(card => {
			const valueLang = Object.values(card.languages)
			return `
					<p><span>Capital:</span> ${card.capital}</p>
					<p><span>Population:</span> ${card.population}</p>
					<p><span>Languages:</span> ${valueLang}</p>
			`
		}).join(' ');
	return markUpCardInfo;
}

function wrongType() {
	Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onError() {
	Notiflix.Notify.failure('"Oops, there is no country with that name"');
	
}


