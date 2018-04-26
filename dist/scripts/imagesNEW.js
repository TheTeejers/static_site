const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
let numberPerPage = document.getElementById('unsplash-images-search-number').value
const searchInput = document.getElementById('unsplash-images-search-input')
const searchButton = document.getElementById("unsplashButtonImages")
const imageBin = document.getElementById('imageDisplayArea')
const endpoints = {
  random: `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${numberPerPage}`,
  search: `https://api.unsplash.com/search/photos/?client_id=${YOUR_ACCESS_KEY}&query=${searchInput.value}&per_page=${numberPerPage}`
}


const ImagesStore = new NGN.DATA.Store({
  model: ImageModel
})

ImagesStore.on('load', () => {
  renderImages(ImagesStore.data)
})

searchButton.addEventListener('click', evt => {
  let numberPerPage = document.getElementById('unsplash-images-search-number').value
  let endpoint =  searchInput.value ? endpoints.search : endpoints.random
  fetchImages(endpoint, images => {
    ImagesStore.load(images)
  })
})

function fetchImages (endpoint, callback) {
  NGN.NET.json(endpoint, (err, images) => {
    if (err) {
      throw err
    }
    callback && callback(images)
    console.log("testing")
  })
}

function renderImages (images) {
  console.log(images)
  let tasks = new NGN.Tasks()
  images.forEach(image => {

    tasks.add(`Rendering image ${image.id}`, next => {
      console.log(numberPerPage)

      console.log(image)

      let id = `image_${image.id}`

      NGN.NET.template('templates/image.html', {
              id,
              imageUrl: image.urls.small
          }, template => {
              imageBin.insertAdjacentHTML('beforeend', template)
              NGN.DOM.guaranteeDirectChild(imageBin, `#${id}`, next)
          })

    })
  })

  tasks.on('complete', () => {
    tasks.on('complete', () => NGN.BUS.emit('images.rendered'))
  })
  tasks.run(true)
}
