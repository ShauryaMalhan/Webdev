var form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {params : {q : searchTerm}};
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    console.log(res.data);
    makeImage(res.data);
    form.elements.query.value = '';
})

const makeImage = (shows) => {
    for(let result of shows) {
        if(result.show.image){
            const val = result.show.image.medium
            const img = document.createElement('img');
            img.src = val;
            document.body.append(img);
        }
    }
}