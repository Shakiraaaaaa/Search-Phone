//search phone
const searchPhone = () => {
    const showPhone = document.getElementById('show-phone');
    showPhone.innerHTML = ""
    const searchField = document.getElementById('search-field')
    const searchFieldValue = searchField.value
    //console.log(searchFieldValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status == false) {
                document.getElementById("error-massage").style.display = "block"
            } else {
                displayPhone(data.data.slice(0, 20))
                document.getElementById("error-massage").style.display = "none"
            }
        }

        )
    searchField.value = ""
    const PhoneDetail = document.getElementById("phone-detail")
    PhoneDetail.innerHTML = ""
}


//display phone
const displayPhone = phones => {
    const showPhone = document.getElementById("show-phone")
    showPhone.innerHTML = ""
    phones.forEach(phone => {
        const div = document.createElement("div")
        div.classList.add("col-md-4")
        div.innerHTML = `
        <div class="card phone-card" >
                    <img src="${phone.image}" class="phone-image" alt="...">
                    <div class="card-body">
                      <h5><span>Phone-Name:</span> ${phone.phone_name}</h5>
                      <h5><span>Brand:</span> ${phone.brand}</h5>
                      <button onclick="displayPhoneDetail('${phone.slug}')" class=" search-btn">see datail</button>
                    </div>
                  </div>
        `
        showPhone.appendChild(div)
    });
}

//show phone detail

const displayPhoneDetail = details => {
    scrollTo(this)

    const detailUrl = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(detailUrl)
        .then(res => res.json())
        .then(data => showPhoneDetail(data.data))
}
const showPhoneDetail = brand => {
    // console.log(brand)
    const PhoneDetail = document.getElementById("phone-detail")
    PhoneDetail.innerHTML = ""
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="card phone-card" >
                <img src="${brand.image}" class="phone-detail-images card-img-top w-25" alt="...">
                <div class="card-body">
                  <p>Brand: <span>${brand.brand}</span></h4>
                  <p>Phone name: <span>${brand.name}</span</h4>
                  <p>Release Date: <span>${brand.releaseDate ? brand.releaseDate : 'comming soon...'}</span</p>
                  <p>Display Size: <span>${brand.mainFeatures.displaySize}</span</p>
                  <p>Memory: <span>${brand.mainFeatures.memory}</span</p>
                  <p>Storage: <span>${brand.mainFeatures.storage}</span</p>
                  <h4>Sensors</h4>
                  <p><span>${brand.mainFeatures.sensors}</span</p>
                  <h4>Others</h4>
                  <p>Bluetooth: <span>${brand.others.Bluetooth}</span</p>
                  <p>GPS: <span>${brand.others.GPS}</span</p>
                  <p>NFC: <span>${brand.others.NFC}</span</p>
                  <p>Radio: <span>${brand.others.Radio}</span</p>
                  <p>USB: <span>${brand.others.USB}</span</p>
                  <p>WLAN: <span>${brand.others.WLAN}</span</p>
                  <p>Slug: <span>${brand.slug}</span</p>
                </div>
              </div>
    `
    PhoneDetail.appendChild(div)
}