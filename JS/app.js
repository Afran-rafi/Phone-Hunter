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
        p.innerText = 'Error: Sorry!! Please Type Anything..';
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
            <button class="bg-yellow-300 py-1 px-4 rounded text-white mt-4">Details</button>
        </div>
        `
        card.appendChild(div);
    })
}