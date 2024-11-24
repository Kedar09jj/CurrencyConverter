const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select ")
const toCurr = document.querySelector(".to select ")
const msg = document.querySelector(".msg");

// for (code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(currCode);
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal===""||amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${fromCurr.value}_${toCurr.value}.json`

    let responce = await fetch(URL);
    let data = await responce.json();
    
    let rate = data.rate;
    console.log(rate)
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`
});