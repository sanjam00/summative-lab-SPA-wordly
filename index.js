let dictionary = []

//fetch api
function fetchDictionary(query){

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then ((response) => response.json())
    .then (data => {
        console.log(data)
        console.log("test")
        displayWord(data)
    })
    .catch(error => {
        console.error(error)
    })
}

function displayWord(data){
    //should display the info for the fetched word

    const displayContainer = document.getElementById("display-results")
    

    //needs to make a separate definition card for each definition.
    //EX "record" has one card for a verb and one for a noun
    data[0].meanings.forEach((content) =>{ //data.word.forEach or data.forEach?
        const itemName = document.createElement("ul")
        itemName.textContent = `${data[0].word} ${data[0].phonetic}` 

        const origin1 = document.createElement("li")
        origin1.textContent = content.origin

        // const meanings = document.createElement("ul")
        const partOfSpeach = document.createElement("li")
        partOfSpeach.textContent = content.partOfSpeech

        const definition = document.createElement("li")
        definition.textContent = content.definitions[0].definition

        itemName.append(origin1, partOfSpeach, definition);
        displayContainer.append(itemName);

    })

    
    
}

const form = document.querySelector("#form");

function handleSubmit(event){
    //should get the info for the fetched word and push to an array of objects?

    event.preventDefault();

    const userInput = document.getElementById("user-input").value

    //don't need an event listener inside handleSubmit... why? because of line 64?
    fetchDictionary(userInput)
}

document.addEventListener("DOMContentLoaded", () => {
  
  form.addEventListener('submit', handleSubmit)

});
