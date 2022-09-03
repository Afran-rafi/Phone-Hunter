const searchField = () => {
    const input = document.getElementById('input-field');
    const value = input.value.toLowerCase();
    input.value = '';

    if (value == 'oppo' || value == 'samsung' || value == 'iphone') {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
            .then(res => res.json())
            .then(data => getProduct(data.data))
    }

    else if (value == '') {
        const error = document.getElementById('error')
        error.textContent = '';
        const p = document.createElement('p');
        p.classList.add('error-msg')
        p.innerText = 'Error: Sorry!! Please Typing Anything..';
        error.appendChild(p);
    }

    else {
        const error = document.getElementById('error')
        error.textContent = '';
        const p = document.createElement('p');
        p.classList.add('error-msg')
        p.innerText = 'Error: Sorry!! No Phones Found..';
        error.appendChild(p);
    }
}

const getProduct = (products) => {
    const card = document.getElementById('card-sec');
    card.textContent = '';
    products.slice(0, 20).map(product => {
        const { image, phone_name, brand, slug } = product
        const div = document.createElement('div');
        div.classList.add('bdr')
        div.innerHTML = `
        <div class="flex justify-center">
            <img src="${image}" alt="">
        </div>
        <div class="text-center">
            <h1 class="text-2xl">${phone_name}</h1>
            <p class="text-xl">${brand}</p>
            <button onclick="productDetailsApi('${slug}')" class="bg-yellow-300 py-1 px-4 rounded text-white mt-4">Details</button>
        </div>
        `
        card.appendChild(div);
    })
}

const productDetailsApi = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => productDetails(data.data))
}

const productDetails = (phone) => {
    const { image, brand, name, releaseDate, } = phone;
    const { chipSet, displaySize, memory, storage, } = phone.mainFeatures;
    const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = phone.others;

    const details = document.getElementById('details-sec');
    details.textContent = '';
    const div = document.createElement('div');
    div.classList.add('details')
    div.innerHTML = `
        <div class='flex justify-center items-center'>
            <img class="h-[400px] w-[300px]" src="${image}" alt="">
        </div>
        <div>
            <h1 class='font-bold text-2xl'>About Phone:-</h1>
            <p>Name: ${name}</p>
            <p>Brand: ${brand}</p>
            <p>ReleaseData: ${releaseDate}</p>
            <hr>
            <h1 class='font-bold text-2xl'>Main Features:</h1>
            <p>ChipSet: ${chipSet}</p>
            <p>DisplaySize: ${displaySize}</p>
            <p>Memory: ${memory}</p>
            <p>Storage: ${storage}</p>
            <hr>
            <h1 class='font-bold text-2xl'>Others:</h1>
            <p>Bluetooth: ${Bluetooth}</p>
            <p>GPS: ${GPS}</p>
            <p>NFC: ${NFC}</p>
            <p>Radio: ${Radio}</p>
            <p>USB: ${USB}</p>
            <p>WLAN: ${WLAN}</p>
            <hr>
            <h1 class='font-bold text-2xl'>Sensors:</h1>
            <p>${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]},${phone.mainFeatures.sensors[2]}
            ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}, ${phone.mainFeatures.sensors[5]} </p >
        </div >
    `
    details.appendChild(div);
}