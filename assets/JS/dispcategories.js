const getProducts = async () => {
    const param = new URLSearchParams(window.location.search);
    const category = param.get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
};

const displayProducts = async () => {

    const data = await getProducts();
    const result = data.products.map((product) => {
        return `
        <div class='product'>
        <img src="${product.thumbnail}" alt="${product.description}" />
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        </div>
        `;
    }).join('');
    document.querySelector(".products .row").innerHTML = result;
    
};

displayProducts();
