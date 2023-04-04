const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.querySelector(".container button");
const exchangeItem = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for(const country_code in countries) {
        //select default as english and hindi
        let selected;
        if(id == 0 && country_code=='en-GB') {
            selected = "selected";
        } else if(id == 1 && country_code=="hi-IN") {
            selected = "selected"
        }
        let option = `<option value=${country_code} ${selected}>${countries[country_code]}</option>`;
        //adding options inside select tags
        tag.insertAdjacentHTML("beforeend", option)
    } 
})

exchangeItem.addEventListener("click", () => {
    let temp = fromText.value;
    fromText.value = toText.value;
    toText.value = temp;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then((data) => {
        toText.value = data.responseData.translatedText;
    })
})

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                navigator.clipboard.writeText(toText.value);
            }
        }
        else {
            let utter;
            if(target.id == "from") {
                utter = new SpeechSynthesisUtterance(fromText.value);
                utter.lang = selectTag[0].value;
            }
            else {
                utter = new SpeechSynthesisUtterance(toText.value);
                utter.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utter);
        }
    })
})