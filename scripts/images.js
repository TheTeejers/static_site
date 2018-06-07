const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');
var unsplashImageLinks = document.getElementById('imageLinks');
var zipImageList = document.getElementById('images-to-be-zipped');



let searchInput = document.getElementById('unsplash-images-search-input')
let numberPerPage = document.getElementById('unsplash-images-search-number').value
let endpointRandom = 'https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage
let endpointSearch = 'https://api.unsplash.com/search/photos/?client_id=' + YOUR_ACCESS_KEY + '&query=' + searchInput.value + '&per_page=' + numberPerPage + ''
let id = `image_${image.id}`





var imageZipListArray = ["red", "blue", "red", "green"];
var cleanedUpImageZipListArray = [];
var imageZipList = document.getElementById('images-to-be-zipped');

document.getElementById("unsplashButtonImages").addEventListener('click', makeRequestImages);
// document.getElementById("unsplashButtonCurated").addEventListener('click', makeRequestCurated);

// console.log(imageZipListArray, 'before button click');


function imageSearchReturn(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        makeRequestImages();
    }
}
function imageCuratedReturn(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        makeRequestCurated();
    }
}


function populateImageZipList() {
  for (var i = 0; i < imageZipListArray.length; i++) {
    imageZipList.insertAdjacentHTML('beforeend', '<li><img src=' + imageZipListArray + '/></li>');
    console.log("this is it", imageZipListArray[i])
  }
}

const ImagesStore = new NGN.DATA.Store({
  model: ImageModel
})

ImagesStore.on('clear', () => {
      imageSearchResult.innerHtml = ''
      console.log("firing");
})

ImagesStore.on('load', () => {
  if (!searchInput.value) {
    makeRequestImages(ImagesStore.data)
  }
})

function makeRequestImages (images) {




        let tasks = new NGN.Tasks()
        ImagesStore.data.forEach(image => {


          tasks.add(`Render image ${image.id}`, next => {

            unsplashImage.insertAdjacentHTML('beforeend', `<div id="image_${image.id}" class="imageSearchResults">
              <hr />
              <p class="imageCredit">
                Photo by <a href="${image.user.links.html}?utm_source=hackathon_resources&utm_medium=referral" target="_blank">${image.user.name}</a>
              </p>
              <p>
                <img src="${image.user.profile_image.small}"/>
              </p>
              <p>
                on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target="_blank">Unsplash</a>
              </p>
              <img src="${image.urls.small}" />
              <div>
                <a title="Download photo" href="https://unsplash.com/photos/${image.id}/download?force=true">
                  <button>Download</button>
                </a>
                <button class="addToZipFileButton">Add to .Zip File</button>
              </div>
              <hr />
            </div>`)
            let id = `image_${image.id}`
            NGN.DOM.guaranteeDirectChild(unsplashImage, `#${id}`, () => {
              let element = document.getElementById(id)
              let zipAddButton = element.querySelector('.addToZipFileButton')

              zipAddButton.addEventListener('click', () => {

                imageZipListArray.push(image.urls.thumb);
                // for(var i = imageZipListArray.length-1; i--;){
                // 	if (imageZipListArray[i] === "red") imageZipListArray.splice(i, 1);
                // }
                zipImageList.insertAdjacentHTML('beforeend', `<hr><li id="zipImage_${image.id}" class="zipImageListItem"><img src=${image.urls.thumb}/>
                  <button id="removeFromZipList_${image.id}" class="removeFromZipFileButton">Remove</button>
                  <hr>
                </li>`);
                console.log("Current Image Array");
                console.log(imageZipListArray);
                console.log(images);
                // NGN.DOM.guaranteeDirectChild(unsplashImage, `#${id}`, () => {
                //
                //   let element = document.getElementById(id)
                //   let button = element.querySelector('.removeFromZipFileButton')
                //   button.addEventListener('click', () => {
                //     for(var i = imageZipListArray.length-1; i--;){
                //       if (imageZipListArray[i] === "red") imageZipListArray.splice(i, 1);
                //     }
                //     console.log("Current Image Array")
                //     console.log(imageZipListArray);
                //     console.log(images)
                //   })
                // })
              })
              next()
            })

          })
        })
        tasks.on('complete', () => {
          console.log('Initial Image Array:')
          console.log(imageZipListArray)
          // Do the stuff you want to do next now that imageZipListArray is populated
        })
        tasks.run(true)


    // } else {
    //
    //
    //     let tasks = new NGN.Tasks()
    //     ImagesStore.data.forEach(image => {
    //       tasks.add(`Render image ${image.id}`, next => {
    //
    //         unsplashImage.insertAdjacentHTML('beforeend', `<div id="image_${image.id}" class="imageSearchResults">
    //           <hr />
    //           <p class="imageCredit">
    //             Photo by <a href="${image.user.links.html}?utm_source=hackathon_resources&utm_medium=referral" target="_blank">${image.user.name}</a>
    //           </p>
    //           <p>
    //             <img src="${image.user.profile_image.small}"/>
    //           </p>
    //           <p>
    //             on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target="_blank">Unsplash</a>
    //           </p>
    //           <img src="${image.urls.small}" />
    //           <div>
    //             <a title="Download photo" href="https://unsplash.com/photos/${image.id}/download?force=true">
    //               <button>Download</button>
    //             </a>
    //             <button class="addToZipFileButton">Add to .Zip File</button>
    //           </div>
    //           <hr />
    //         </div>`)
    //         let id = `image_${image.id}`
    //         NGN.DOM.guaranteeDirectChild(unsplashImage, `#${id}`, () => {
    //           let element = document.getElementById(id)
    //           let button = element.querySelector('.addToZipFileButton')
    //           button.addEventListener('click', () => {
    //
    //
    //             imageZipListArray.push(image.urls.thumb)
    //             zipImageList.insertAdjacentHTML('beforeend', `<hr><li id="zipImage_${image.id}" class="zipImageListItem"><img src=${image.urls.thumb}/>
    //               <button id="removeFromZipList_${image.id}" class="removeFromZipFileButton">Remove</button>
    //               <hr>
    //             </li>`);
    //             console.log("Current Image Array")
    //             console.log(imageZipListArray);
    //             console.log(images)
    //           })
    //           next()
    //         })
    //       })
    //     })
    //     tasks.on('complete', () => {
    //       console.log('Initial Image Array:')
    //       console.log(imageZipListArray)
    //
    //       // Do the stuff you want to do next now that imageZipListArray is populated
    //     })
    //     tasks.run(true)
    //
    // }


  let searchInput = document.getElementById('unsplash-images-search-input')
  let numberPerPage = document.getElementById('unsplash-images-search-number').value
  let endpointRandom = 'https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage
  let endpointSearch = 'https://api.unsplash.com/search/photos/?client_id=' + YOUR_ACCESS_KEY + '&query=' + searchInput.value + '&per_page=' + numberPerPage + ''
  let id = `image_${image.id}`
  NGN.NET.json(endpointRandom, (err, images) => {

    if (err) {
      throw err
    }

    ImagesStore.load(images)


  })
  NGN.NET.json(endpointSearch, (err, images) => {
    if (err) {
      throw err
    }


    ImagesStore.load(images)
  })
}
