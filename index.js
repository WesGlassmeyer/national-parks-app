'use strict';

const apiKey = 'ZU17pO1kqyw4TUACVh8xXz1XLcu0bBv5I24clF9Q';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the data array
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )
    };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(searchState, maxResults) {
  const apiFormat = "&api_key=" + apiKey
  const stateQuery = "statecode=" + searchState + "&"
  const limitQuery = "limit=" + maxResults
  const url = searchURL + stateQuery + limitQuery + apiFormat;

 fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
   getNationalParks(searchState, maxResults);
  });
}

$(watchForm);