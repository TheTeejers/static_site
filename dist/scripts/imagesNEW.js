const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');
let numberPerPage = document.getElementById('unsplash-images-search-number');
const searchInput = document.getElementById('unsplash-images-search-input');
const searchButton = document.getElementById("unsplashButtonImages");
var unsplashImageLinks = document.getElementById('imageLinks');
const imageBin = document.getElementById('imageDisplayArea');
const endpoints = {
  get random(){
    return `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${numberPerPage.value}`
  },
  get search () {
    return  `https://api.unsplash.com/search/photos/?client_id=${YOUR_ACCESS_KEY}&query=${searchInput.value}&per_page=${numberPerPage.value}`
  }
};
let endpoint =  searchInput.value ? endpoints.search : endpoints.random
let imagesReturnedContainer = document.getElementsByClassName('imagesReturnedContainer');
var zipImageList = document.getElementById('images-to-be-zipped');
const downloadZipFileButton = document.getElementById('downloadZipFileButton');

var imageZipListImageArray = [];
var JSONReadyImages = JSON.parse(localStorage.JSONReadyImages || null) || {};

const ImagesStore = new NGN.DATA.Store({
  model: ImageModel
})

const CartStore = new NGN.DATA.Store({
  model: ImageModel
})

CartStore.on('record.create', (record) => {
  console.log(record.data);
  console.log(record.links.actual_download);
  renderZipImage(record);
  localStorage.setItem('stored_images', getCartData());
})

CartStore.on('record.delete', (record) => {
  console.log(record.data);
  // renderZipImage(record);

  unRenderZipImage(record)
  localStorage.setItem('stored_images', getCartData());
})

CartStore.on('load', () => {
  CartStore.records.forEach(record => {
    renderZipImage(record)
  })
})

var savedImages = localStorage.getItem('stored_images');
if (savedImages !== null) {

  console.log(JSON.parse(savedImages))
  CartStore.load(JSON.parse(savedImages));
}

ImagesStore.on('load', () => {
  renderImages()
})

ImagesStore.on('reload', () => {
  renderImages()
})

ImagesStore.on('clear', () => {
  clearImageBin()
})

searchButton.addEventListener('click', e => {
  fetchImages(searchInput.value ? endpoints.search : endpoints.random, images => {
		if (ImagesStore.recordCount > 0) {
			return ImagesStore.reload(images.results || images)
		}
    ImagesStore.load(images.results || images)
  })
})

searchInput.addEventListener('keydown', e => {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      fetchImages(searchInput.value ? endpoints.search : endpoints.random, images => {
        ImagesStore.load(images.results || images)
      })
    }
})



var zip = new JSZip();
// create a file
zip.file("hello.txt", "Hello[p my)6cxsw2q");
// oops, cat on keyboard. Fixing !
zip.file("hello.txt", "Hello World\n");

// create a file and a folder
zip.file("nested/hello.txt", "Hello World\n");
// same as
zip.folder("nested").file("hello.txt", "Hello World\n");












function clearImageBin() {
  imageBin.innerHTML = ''
}

function fetchImages (endpoint, callback) {
  NGN.NET.json(endpoint, (err, images) => {
    if (err) {
      throw err
    }
    callback && callback(images)
  })
}

function renderImages (images) {
  imageBin.innerHTML=''
  let tasks = new NGN.Tasks()

  ImagesStore.records.forEach(image => {
    tasks.add(`Rendering image ${image.id}`, next => {
      let id = `image_${image.id}`

      NGN.NET.template('templates/image.html', {
              id,
              imageUrl: image.urls.full,
              userName: image.user.name,
              profileName: image.user.username,
              imageID: image.id,
              imageDescription: image.description,
          }, template => {

              imageBin.insertAdjacentHTML('beforeend', template)
              NGN.DOM.guaranteeDirectChild(imageBin, `#${id}`, () => {
                let element = document.getElementById(id)
                let zipAddButton = element.querySelector('.addToZipFileButton')
                zipAddButton.addEventListener('click', () => {
                  CartStore.add(image)
                })
              })
            next()
      })
    })
  })

  tasks.on('complete', () => {
    tasks.on('complete', () => NGN.BUS.emit('images.rendered'))
  })
  tasks.run(true)
}

function savedImage(obj) {
  JSONReadyImages.obj = obj;
}

// function to put images into the 'cart' and also adds the 'remove' button as well as giving it functionality
function renderZipImage(record){
    zipImageList.insertAdjacentHTML('beforeend', `<div id="allCart"><div id="cartZipImage_${record.id}"><hr><li id="zipImage_${record.id}" class="zipImageListItem"><img src=${record.urls.thumb}/>
      <button id="removeFromZipList_${record.id}" class="removeFromZipFileButton" imageRecordID="${record.id}">Remove</button>
      <hr>
    </li></div></div>`);
    NGN.DOM.guaranteeDirectChild(zipImageList, `#removeFromZipList_${record.id}`, (err, button) => {
      button.addEventListener('click', () => {
        var record = CartStore.find(button.getAttribute('imageRecordID'))
        CartStore.remove(record)
      })
    })
}

function unRenderZipImage(record) {
  console.log(document.getElementById(`allCart`))
  NGN.DOM.destroy(document.getElementById(`allCart`))
}

function getCartData() {
  return JSON.stringify(CartStore.records.map(record => {
    var data = record.data;
    data.id = record.id;
    return data;
  }))
}
