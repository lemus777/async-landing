const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9k0tTsh_qStx0HPuPftSsg&part=snippet%2Cid&order=date&maxResults=5';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a68d95631bmshfaf9ccf6592d1aep14f504jsn9c5ebe7cfa6c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async() => {
    try {
        const videos = await fetchData(API); 
        // atención a los encapsulamientos de let view, hay comillas francesas dentro de las comillas francesas
        // los datos dentro de los ${} se sacan de la api elegida, hay que fijarse en la estructura, porque puede variar. La vemos haciendo el test en la página de rapidapi.com. El html sale del html pregenerado que tenemos en index.html
        let view = ` 
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0,4).join()}   
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();