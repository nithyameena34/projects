const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const  closeBtn = lightBox.querySelector(".uil-times");
const  downloadImgBtn = lightBox.querySelector(".uil-import");

const apikey = "t9La7Y2Cte5dYEDqALLTiOi7WAMW4YFUBVnTwBgw80bB74Gx8NtJGVuc";
const per_Page = 20;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
    fetch(imgURL).then(res => res.blob()).then(file =>{
       const a = document.createElement("a");
       a.href = URL.createObjectURL(file);
       a.download = new Date().getTime();
       a.click();
    }).catch(() => alert("failed to download image..."));
}

const showLightbox = (name, img) => {
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img",img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}
 
const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick="showLightbox('${img.photographer}','${img.src.large2x}')">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}')">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
     loadMoreBtn .innerHTML = "loading..."; 
     loadMoreBtn .classList.add("disabled"); 
    fetch(apiURL,{ 
        headers: { Authorization: apikey }
    }).then(res => res.json()).then(data => { 
        generateHTML(data.photos);
        loadMoreBtn .innerHTML = "load more"; 
        loadMoreBtn .classList.remove("disabled");
    }).catch(() => alert ("failed to load images!"));
}

const loadMoreImages = () => {
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${per_Page}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${per_Page}`: apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    if(e.target.value === "") return searchTerm = null;
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
       getImages (`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${per_Page}`);

    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${per_Page}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn .addEventListener("click", hideLightbox);
 downloadImgBtn .addEventListener("click", (e) => downloadImg(e.target.dataset.img));
