const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.result');
const sound = document.getElementById('sound');
const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  let searchInp = document.getElementById('search').value;

  fetch(`${url}${searchInp}`)
    .then((res) => res.json())
    .then((data) => {
      result.innerHTML = ` 
      <div class="search--value">
          <h1>${searchInp}</h1>
          <button onClick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <small>${data[0].meanings[0].partOfSpeech} <span>/ ${
        data[0].phonetic || data[0].phonetics[1].text
      }  /</span></small>
        <div class="search--result">
          <p id="Example">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <h5 id="sample-example">
            ${data[0].meanings[0].definitions[0].example || ''}
          </h5>
        </div>`;

      sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class='error'>Couldn't find the word you're searching </h3>`;
    });
});

function playSound() {
  sound.play();
}
