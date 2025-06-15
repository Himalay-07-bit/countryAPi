let center = document.querySelector(".center")
let second = document.querySelector(".second")
let country = document.getElementById("country")

function create(key, value) {
    let itemDiv = document.createElement("div")
    itemDiv.classList.add("item")

    let keyDiv = document.createElement("div")
    keyDiv.classList.add("key")
    keyDiv.innerHTML = key

    let valueDiv = document.createElement("div")
    valueDiv.classList.add("value")
    if (key === "Flags") {
        let img = document.createElement("img")
        img.src = value
        valueDiv.appendChild(img)
    }
    else if (key === "Maps") {
        let a = document.createElement("a")
        a.href = value
        a.innerHTML = "Click to Open Google Maps"
        a.target = "_blank"
        valueDiv.appendChild(a)
    }
    else
        valueDiv.innerHTML = value
        itemDiv.appendChild(keyDiv)
        itemDiv.appendChild(valueDiv)
        second.appendChild(itemDiv)
}

function getAPIData() {
    let request = new XMLHttpRequest()
    let name = country.value !== "" ? country.value : "Bharat"
    request.open("get", "https://restcountries.com/v3.1/name/" + name)
    request.send()
    request.addEventListener("load", () => {
        center.removeChild(second)
        second = document.createElement("div")
        second.classList.add("second")
        center.appendChild(second)
        JSON.parse(request.responseText).forEach(data => {
            create("Name", data.name.official)
            create("Capital", data.capital)
            create("Flags", data.flags.png)
            create("Population", data.population)
            create("Area", data.area)
            create("Independent", data.independent)
            create("UN Member", data.unMember)
            create("Landlocked", data.landlocked)
            create("Borders", data.borders)
            create("Maps", data.maps.googleMaps)
            create("Region", data.region)
            create("Subregion", data.subregion)
            create("Continents", data.continents)
            let gap = document.createElement("div")
            gap.style.height = "100px"
            second.appendChild(gap)
        });
    })
}
getAPIData()