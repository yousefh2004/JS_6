const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/categories');
    return data;
};

const displayCategories = async () => {
    const categories = await getCategories();
    const result = categories.map((category) => {
        return `
        <div class='category'>
        <h2>${category.name}</h2>
        <a href="dispcategories.html?category=${category.name}">Details</a>
        </div>
        `;
    }).join('');
    document.querySelector(".products .row").innerHTML = result;
    
};






const getProducts = async (page = 1) => {
    const skip = ( page - 1 ) * 20;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    return data;
};

const displayProducts = async (page) => {
    const data = await getProducts(page);
    const numberofpages = Math.ceil(data.total/20)
    const result = data.products.map((product) => {
        return `
        <div class='product'>
        <img src="${product.thumbnail}" alt="${product.description}" class='images'/>
        <h2>${product.title}</h2>
        <span>${product.price}</span> $
        </div>
        `;
    }).join('');

    document.querySelector(".products .roww").innerHTML = result;
    let paginationLinks =``
    if(page==1){
        paginationLinks += `<li class="page-item"><button class="page-link">&laquo;</button></li>`
    }else{
    paginationLinks = `<li class="page-item"><button onclick=displayProducts('${page-1}') class="page-link" >&laquo;</button></li>`
    }
    for(let i=1;i<numberofpages+1;i++){
        paginationLinks += `<li class="page-item ${i==page?'active':''}"><button onclick=displayProducts('${i}')  class="page-link" >${i}</button></li>`;
    }
    if(page==numberofpages){
        paginationLinks += `<li class="page-item"><button class="page-link">&raquo;</button></li>`
    }else{
    paginationLinks += `<li class="page-item"><button onclick=displayProducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`;
    }
    document.querySelector(".pagination").innerHTML= paginationLinks
    modal();
}

const countdown = () => {
    const countdowndate = new Date ("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countdowndate - now ;
    const days = Math.floor(distance/86400000);
    const hours = Math.floor((distance%86400000)/3600000);
    const minutes = Math.floor(((distance%(1000*60*60)))/60000);
    const seconds = Math.floor(((distance%(1000*60)))/1000);

    document.querySelector("#days").textContent=days;
    document.querySelector("#hours").textContent=hours;
    document.querySelector("#minutes").textContent=minutes;
    document.querySelector("#seconds").textContent=seconds;
}

setInterval( ()=>{
    countdown();
},1000)
displayCategories();
displayProducts();

function modal(){
    const modal = document.querySelector(".my-modal");
    const Closebtn = document.querySelector(".close-btn");
    const Rightbtn = document.querySelector(".right-btn");
    const Leftbtn = document.querySelector(".left-btn");
    const images = Array.from(document.querySelectorAll(".images"));
    let currenti=0;
    images.forEach (function(img) {
        img.addEventListener("click",function(e){
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src",e.target.src)

            const currentimg = e.target;
             currenti = images.indexOf(currentimg);
        })

           
        })
        Closebtn.addEventListener("click",function(){
            modal.classList.add('d-none');
        })

        Rightbtn.addEventListener("click",function(){
            currenti++;
            if(currenti>=images.length){
                currenti=0;
            }
           const src= images[currenti].src;
           modal.querySelector("img").setAttribute("src",src)
        })
        Leftbtn.addEventListener("click",function(){
            currenti--;
            if(currenti<0){
                currenti=images.length-1;
            }
            const src= images[currenti].src;
            modal.querySelector("img").setAttribute("src",src)
        })

        document.addEventListener("keydown",function(e){
            if(e.code=='ArrowRight'){
                currenti++;
                if(currenti>=images.length){
                    currenti=0;
                }
               const src= images[currenti].src;
               modal.querySelector("img").setAttribute("src",src)
            }
        })

        document.addEventListener("keydown",function(e){
            if(e.code=='ArrowLeft'){
                currenti--;
                if(currenti<0){
                    currenti=images.length-1;
                }
                const src= images[currenti].src;
                modal.querySelector("img").setAttribute("src",src)
            }else if(e.code=='Escape'){
                modal.classList.add('d-none');
            }
        })
    }
