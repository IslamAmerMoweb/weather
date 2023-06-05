'use strict'
let btn = document.querySelector('button')
let inp = document.querySelector('input')
let news = []

btn.addEventListener('click', function () {
    getApi(inp.value)
})


async function getApi(inp) {
    if (inp == '') {
        inp = 'wsj.com'
    }
    let link = await fetch(`https://newsapi.org/v2/everything?q=${inp}&apiKey=776bc04012bd459399d1194b4581f420`)
    let newe = await link.json()
    news = newe.articles
    console.log(news);
    shownews()
}

getApi()

let x = document.querySelector('img')
let src = x.getAttribute('src')
src = 'image/puty.avif'
console.log(src);
function shownews() {
    let box = ''
    for (let i = 0; i < news.length; i++) {
        if (news[i].urlToImage === null) {
            news[i].urlToImage = `<img src="${src}" alt="">`
            document.querySelector('.row').innerHTML = `<img src="${src}" alt="">`
            console.log(news[i].urlToImage);
        } else {
            box += `
        <div class="col-4 mt-5">
            <div class="card">
            <a target="_blank" href="${news[i].url}"><img src="${news[i].urlToImage}" class="card-img-top" alt="photo"></a>
            <div class="card-body">
            <h5 class="card-title">${news[i].title}</h5>
            <p class="card-text">${news[i].content}</p>
            </div>
            </div>
        </div>
        `}
    }
    console.log(news.articles);
    document.querySelector('.row').innerHTML = box
    // console.log(box);
}