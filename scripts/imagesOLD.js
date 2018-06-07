const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');
var unsplashImageLinks = document.getElementById('imageLinks');
var zipImageList = document.getElementById('images-to-be-zipped');


var imageZipListArray = ["red", "blue", "red", "green"];
var cleanedUpImageZipListArray = [];
var imageZipList = document.getElementById('images-to-be-zipped');


function populateImageZipList() {
  for (var i = 0; i < imageZipListArray.length; i++) {
    imageZipList.insertAdjacentHTML('beforeend', '<li><img src=' + imageZipListArray + '/></li>');
    console.log("this is it", imageZipListArray[i])
  }
}


document.getElementById("unsplashButtonImages").addEventListener('click', makeRequestImages);
document.getElementById("unsplashButtonCurated").addEventListener('click', makeRequestCurated);

console.log(imageZipListArray, 'before button click');

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

function makeRequestImages () {
  let searchInput = document.getElementById('unsplash-images-search-input')
  let numberPerPage = document.getElementById('unsplash-images-search-number').value
  let endpointRandom = 'https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage
  let endpointSearch = 'https://api.unsplash.com/search/photos/?client_id=' + YOUR_ACCESS_KEY + '&query=' + searchInput.value + '&per_page=' + numberPerPage + ''
  let id = `image_${image.id}`

  if (!searchInput.value) {
    NGN.NET.json(endpointRandom, (err, images) => {
      if (err) {
        throw err
      }
      NGN.DOM.destroy('.imageSearchResults')
      NGN.DOM.destroy('.imageResultLinks')
      let tasks = new NGN.Tasks()
      images.forEach(image => {
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
              NGN.DOM.guaranteeDirectChild(unsplashImage, `#${id}`, () => {
                let element = document.getElementById(id)
                let button = element.querySelector('.removeFromZipFileButton')
                button.addEventListener('click', () => {
                  for(var i = imageZipListArray.length-1; i--;){
                    if (imageZipListArray[i] === "red") imageZipListArray.splice(i, 1);
                  }
                  console.log("Current Image Array")
                  console.log(imageZipListArray);
                  console.log(images)
                })
              })
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
    })

  } else {
    NGN.NET.json(endpointRandom, (err, images) => {
      if (err) {
        throw err
      }
      NGN.DOM.destroy('.imageSearchResults')
      NGN.DOM.destroy('.imageResultLinks')
      let tasks = new NGN.Tasks()
      images.forEach(image => {
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
            let button = element.querySelector('.addToZipFileButton')
            button.addEventListener('click', () => {
              imageZipListArray.push(image.urls.thumb)
              zipImageList.insertAdjacentHTML('beforeend', `<hr><li id="zipImage_${image.id}" class="zipImageListItem"><img src=${image.urls.thumb}/>
                <button id="removeFromZipList_${image.id}" class="removeFromZipFileButton">Remove</button>
                <hr>
              </li>`);
              console.log("Current Image Array")
              console.log(imageZipListArray);
              console.log(images)
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
    })
  }

}


// function makeRequestImages () {
//   let searchInput = document.getElementById('unsplash-images-search-input')
//   let numberPerPage = document.getElementById('unsplash-images-search-number').value
//   let endpoint = 'https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage
//   if (!searchInput.value) {
//     NGN.NET.json(endpoint, (err, images) => {
//       if (err) {
//         throw err
//       }
//       NGN.DOM.destroy('.imageSearchResults')
//       NGN.DOM.destroy('.imageResultLinks')
//       let tasks = new NGN.Tasks()
//       images.forEach(image => {
//         tasks.add(`Render image ${image.id}`, next => {
//           unsplashImage.insertAdjacentHTML('beforeend', `<div id="image_${image.id}" class="imageSearchResults">
//             <hr />
//             <p class="imageCredit">
//               Photo by <a href="${image.user.links.html}?utm_source=hackathon_resources&utm_medium=referral" target="_blank">${image.user.name}</a>
//             </p>
//             <p>
//               <img src="${image.user.profile_image.small}"/>
//             </p>
//             <p>
//               on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target="_blank">Unsplash</a>
//             </p>
//             <img src="${image.urls.small}" />
//             <div>
//               <a title="Download photo" href="https://unsplash.com/photos/${image.id}/download?force=true">
//                 <button>Download</button>
//               </a>
//               <button class="addToZipFileButton">Add to .Zip File</button>
//             </div>
//             <hr />
//           </div>`)
//           let id = `image_${image.id}`
//           NGN.DOM.guaranteeDirectChild(unsplashImage, `#${id}`, () => {
//             let element = document.getElementById(id)
//             let button = element.querySelector('.addToZipFileButton')
//             button.addEventListener('click', () => {
//               imageZipListArray.push(image.urls.thumb)
//               console.log("Current Image Array")
//               console.log(imageZipListArray);
//             })
//             next()
//           })
//         })
//       })
//       tasks.on('complete', () => {
//         console.log('Initial Image Array:')
//         console.log(imageZipListArray)
//         // Do the stuff you want to do next now that imageZipListArray is populated
//       })
//       tasks.run(true)
//     })
//   }
// }
//




function makeRequestCurated() {

  var numberPerPage = document.getElementById('unsplash-curated-search-number').value;
  var orderedBy = document.getElementById('unsplash-curated-search-order').value;

  console.log(document.getElementById('unsplash-curated-search-number').value, 'number value');
  console.log(document.getElementById('unsplash-curated-search-order').value, 'curated label');


  NGN.NET.get('https://api.unsplash.com/photos/curated/?client_id=' + YOUR_ACCESS_KEY + '&per_page=' + numberPerPage + '&order_by=' + orderedBy, (response) => {
    console.log(response);
    NGN.DOM.destroy('.imageSearchResults');
    NGN.DOM.destroy('.imageResultLinks');
    var json = JSON.parse(response.response);
    console.log(json.length);
    for (var i = 0; i < json.length; i++) {
      var userLink = json[i].user.links.html;
      var userProfilePictureSmall = json[i].user.profile_image.small;
      var userName = json[i].user.name;
      var imageURLFull = json[i].urls.full;
      var imageURLRaw = json[i].urls.raw;
      var imageURLRegular = json[i].urls.regular;
      var imageURLSmall = json[i].urls.small;
      var imageURLThumb = json[i].urls.thumb;
      var imageID = json[i].id;

      unsplashImage.insertAdjacentHTML('beforeend', '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '</p><p><img src= ' + userProfilePictureSmall + '/></a></p><p> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURLSmall + '/> <div> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a> <button id="addToZipFileButton">Add to .Zip File</button></div><hr></div>');




    }

  })

}

// var zip = new JSZip();
// zip.file("Hello.txt", "Hello World\n");
// var img = zip.folder("images");
// img.file("smile.gif", imgData, {base64: true});
// zip.generateAsync({type:"blob"})
// .then(function(content) {
//     // see FileSaver.js
//     saveAs(content, "example.zip");
// });
