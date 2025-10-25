let favorites = []

//fetch api
function fetchDictionary(query) {

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            displayWord(data)
        })
        .catch(error => {
            errorMessage = document.createElement("p")
            errorMessage.textContent = `Failed to load request. Please check spelling or try again later.`;

            displayContainer.append(errorMessage)

            console.error('Error fetching data', error)
        })
}

//declared globally so it can be cleared upon new search
const displayContainer = document.getElementById("display-results")

//!!favorites button not functional
function displayWord(data) {
    //displays the info for the fetched word

    //display the fetched word as a header
    const wordHeader = document.createElement("h2")
    wordHeader.textContent = `${data[0].word}`
    displayContainer.append(wordHeader);

    //favorites button
    const favoritesBtn = document.createElement("button")
    favoritesBtn.textContent = "Add to Favorites"
    favoritesBtn.addEventListener("click", () => {
        favorites.push[displayContainer]
        console.log(favorites)
    })
    displayContainer.append(favoritesBtn)


    data.forEach(entry => {

        entry.phonetics.forEach(phon => {
            //display phonetic text
            if (phon.text) {
                const phoneticText = document.createElement("p")
                phoneticText.textContent = phon.text //.join(", ")
                displayContainer.append(phoneticText)
            }

            //display a button for phonetic audio
            if (phon.audio) {
                const phoneticAudioBtn = document.createElement("button")
                phoneticAudioBtn.textContent = "play audio"
                phoneticAudioBtn.addEventListener("click", () => {
                    new Audio(phon.audio).play()
                })
                displayContainer.append(phoneticAudioBtn)
            }
        })


        entry.meanings.forEach((meaning, i) => { //data.word.forEach or data.forEach?
            //gets all phonetics, displays them all at once, not with each version of the word

            //container for each definition card
            const meaningBlock = document.createElement("div")
            meaningBlock.id = "meaning-block"

            //part of speech as a title element
            const partOfSpeach = document.createElement("h3")
            partOfSpeach.textContent = `Part of Speech ${i + 1}: ${meaning.partOfSpeech}`
            meaningBlock.append(partOfSpeach);

            //definition list
            const defList = document.createElement("ul")
            meaning.definitions.forEach((def, j) => {

                //gets the definition and displays it. 
                const definition = document.createElement("li")
                definition.innerHTML = `<strong>Definition ${j + 1}:</strong> ${def.definition}`

                //handles display of examples
                if (def.example) {
                    const defExample = document.createElement("p")
                    defExample.id = "example"
                    defExample.textContent = `Example: ${def.example}`
                    definition.append(defExample)
                } else {
                    const defExample = document.createElement("p")
                    defExample.id = "no-example"
                    defExample.textContent = "Example: No available example"
                    definition.append(defExample)
                }

                //handles display of synonyms
                if (def.synonyms && def.synonyms.length > 0) {
                    const synonyms = document.createElement("p")
                    synonyms.id = "synonyms"
                    synonyms.textContent = `Synonyms: ${def.synonyms.join(", ")}`
                    definition.append(synonyms)
                    // console.log(def.synonyms)
                } //else {
                //     const synonyms = document.createElement("p")
                //     synonyms.id = "no-synonym"
                //     synonyms.textContent = "Synonyms: No available synonyms"
                //     definition.append(synonyms)

                // }

                defList.append(definition)

            })
            meaningBlock.append(defList)

            if (meaning.synonyms && meaning.synonyms.length > 0) {
                const synonyms = document.createElement("p")
                synonyms.id = "synonyms-list"
                synonyms.innerHTML = `<strong>Synonyms:</strong> ${meaning.synonyms.join(", ")}`
                meaningBlock.append(synonyms)
            }
            if (meaning.antonyms && meaning.antonyms.length > 0) {
                const antonyms = document.createElement("p")
                antonyms.id = "antonyms-list"
                antonyms.innerHTML = `<strong>Antonyms:</strong> ${meaning.antonyms.join(", ")}`
                meaningBlock.append(antonyms)
            }

            displayContainer.append(meaningBlock);

        })
    })
}

const form = document.querySelector("#form");

function handleSubmit(event) {
    event.preventDefault();

    const userInput = document.getElementById("user-input").value

    //don't need an event listener inside handleSubmit... why? because of line 151?
    fetchDictionary(userInput)

    //clears screen after each search
    displayContainer.innerHTML = ""
}

document.addEventListener("DOMContentLoaded", () => {

    form.addEventListener('submit', handleSubmit)

});
