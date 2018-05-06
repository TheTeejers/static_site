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

var savedImages = localStorage.getItem('stored_images');
var imagesInCart = JSON.parse(savedImages)

const ImagesStore = new NGN.DATA.Store({
  model: ImageModel
})

const CartStore = new NGN.DATA.Store({
  model: ImageModel
})
// console.log(CartStore.records, "CartStore.data before");
// console.log(CartStore.data);
// console.log(imagesInCart, "images in cart");
// console.log(CartStore.records, "CartStore.records  on click 1")
// console.log(CartStore.data, "CartStore.data  on click 1")

CartStore.on('record.create', (record) => {
  renderZipImage(record)
  localStorage.setItem('stored_images', getCartData());
})

// console.log(CartStore.data, "CartStore.data  on click 4")

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

if (savedImages !== null) {
  // console.log(JSON.parse(savedImages), "JSON.parse(savedImages)")
  console.log(imagesInCart, "imagesInCart")
  // console.log(CartStore.data)

  CartStore.load(JSON.parse(savedImages));
  // console.log(CartStore.data)
}
// console.log(CartStore.records[1].links.download, "CartStore.data before");
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
              imageDownload: image.links.download
          }, template => {

              imageBin.insertAdjacentHTML('beforeend', template)
              NGN.DOM.guaranteeDirectChild(imageBin, `#${id}`, () => {
                let element = document.getElementById(id)
                let zipAddButton = element.querySelector('.addToZipFileButton')
                // for (var i = 0; i < CartStore.data.length; i++) {
                //   console.log(CartStore.data[i].links.download)
                //
                // }
                zipAddButton.addEventListener('click', () => {
                  // console.log(image.links.download)
                  // if (CartStore.data[i].links.download = image.links.download) {
                  //   console.log('worked')
                  // }
                  CartStore.add(image)

                  // console.log(imagesInCart.length, "imagesInCart before")
                  // console.log(CartStore.data.length, "CartStore.data before");
                  // console.log(CartStore.data, "CartStore.data before");
                  // console.log(CartStore.data[1].links.download, "CartStore.data before")
                  // console.log(image.links.download, "CartStore.data before 1111")
                  //
                  // console.log(imagesInCart.length, "imagesInCart after")
                  // console.log(CartStore.data, "CartStore.data after");
                  // console.log(CartStore.records.length, "CartStore.data after")
                  // console.log(CartStore.data.length, "CartStore.data before");

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

// function to put images into the 'cart' and also adds the 'remove' button as well as giving it functionality
function renderZipImage(record){
  // console.log(imagesInCart)
  // console.log(ImagesStore)
  // console.log(record.links.download)
  // for (var i = 0; i < imagesInCart.length; i++){
  //   console.log(imagesInCart[i].id)
  //   if (record.links.download === imagesInCart[i].links.download){
  //     console.log('nope')
  //   } else {
  //     console.log('yup')
  //   }
  // }

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
  console.log(document.getElementById(`cartZipImage_${record.id}`))
  NGN.DOM.destroy(document.getElementById(`cartZipImage_${record.id}`))
}

function getCartData() {
  return JSON.stringify(CartStore.records.map(record => {
    var data = record.data;
    data.id = record.id;
    return data;
  }))
}

// console.log(CartStore.records)

var imgLinks=CartStore.records;

function zipCartFiles() {
  console.log(imgLinks.length)
  // var zip = new JSZip();
  // zip.file("Hello.txt", "Hello World\n");
  // var img = zip.folder("images");
  // img.file("new.jpeg", src='https://unsplash.com/photos/LJAU2ouA8tk/download?force=true');
  // zip.generateAsync({type:"blob"})
  // .then(function(content) {
  //     saveAs(content, "example.zip");
  // });

  var zip=new JSZip();
  for(var i=0; i<imgLinks.length; i++)
    {
    console.log(imgLinks[i].links.download)
    JSZipUtils.getBinaryContent(imgLinks[i].links.download, function (err, data) {
        if(err) {
          alert("Problem happened when download img: " + imgLinks[i].links.download);
          console.log("Problem happened when download img: " + imgLinks[i].links.download);
          deferred.resolve(zip); // ignore this error: just logging
          // deferred.reject(zip); // or we may fail the download
        } else {
          console.log('this far')
          zip.file("picture"+i+".jpg", data, {binary:true});
          // deferred.resolve(zip);
        }
     });
    }
  var content = zip.generateAsync({type:"blob"});
  saveAs(content, "downloadImages.zip");
}
