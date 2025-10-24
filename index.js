let dictionary = []

//fetch api
function fetchDictionary(query) {

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            // console.log("test")
            displayWord(data)
        })
        .catch(error => {
            console.error(error)
        })
}

function displayWord(data) {
    //should display the info for the fetched word

    const displayContainer = document.getElementById("display-results")

    const phoneticsText = data[0].phonetics
        .map(p => p.text)
        .filter(Boolean)
        .join(", ")

    //create element of the searched word, display all phonetics with it
    const itemName = document.createElement("ul")
    itemName.textContent = `${data[0].word} ${phoneticsText}`

    data.forEach(entry => {

        entry.meanings.forEach((meaning, i) => { //data.word.forEach or data.forEach?
            //gets all phonetics, displays them all at once, not with each version of the word

            const partOfSpeach = document.createElement("li")
            partOfSpeach.textContent = `Part of Speech ${i + 1}: ${meaning.partOfSpeech}`
            itemName.append(partOfSpeach);

            meaning.definitions.forEach((def, j) => {
                //gets the definition and displays it. 
                const definition = document.createElement("li")
                definition.textContent = `Definition ${j + 1}: ${def.definition}`

                if (def.synonyms !== undefined) {
                    const synonyms = document.createElement("li")
                    synonyms.id = "synonyms"
                    synonyms.textContent = def.synonyms
                    itemName.append(synonyms)
                    // console.log(def.synonyms)
                } else {
                    const synonyms = document.createElement("li")
                    synonyms.id = "no-synonym"
                    synonyms.textContent = "No available synonyms"
                    itemName.append(synonyms)

                }
                console.log(def.synonyms)
                itemName.append(definition)
            })


            displayContainer.append(itemName);

        })
    })

    //needs to make a separate definition card for each definition.
    //EX "record" has one card for a verb and one for a noun




}

const form = document.querySelector("#form");

function handleSubmit(event) {
    //should get the info for the fetched word and push to an array of objects?

    event.preventDefault();

    const userInput = document.getElementById("user-input").value

    //don't need an event listener inside handleSubmit... why? because of line 64?
    fetchDictionary(userInput)
}

document.addEventListener("DOMContentLoaded", () => {

    form.addEventListener('submit', handleSubmit)

});
