const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');
var unsplashImageLinks = document.getElementById('imageLinks');

document.getElementById("unsplashButtonImages").addEventListener('click', makeRequestImages);
document.getElementById("unsplashButtonCurated").addEventListener('click', makeRequestCurated);
// document.getElementById("unsplash-images-search-input").onkeypress = makeRequestImages;
function imageSearchReturn(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        makeRequestImages();
    }
}
function imageCuratedReturn(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        makeRequestCurated();
    }
}


function makeRequestImages() {
  var searchInput = document.getElementById('unsplash-images-search-input').value;
  var numberPerPage = document.getElementById('unsplash-images-search-number').value;
  console.log(document.getElementById('unsplash-images-search-input').value, 'input value');
  console.log(document.getElementById('unsplash-images-search-input').value, 'number value');

  if (document.getElementById('unsplash-images-search-input').value === ''){
    NGN.NET.get('https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage, (response) => {
      console.log(response)
      NGN.DOM.destroy('.imageSearchResults');
      NGN.DOM.destroy('.imageResultLinks');
      var json = JSON.parse(response.response);
      console.log(json);
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
        console.log(json[i]);
        unsplashImage.insertAdjacentHTML('beforeend', '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '</p><p><img src= ' + userProfilePictureSmall + '/></a></p><p> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURLSmall + '/><div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank>Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div><div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div><hr></div>');
        // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank>Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div>'
        // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div>'
      }

    })
  } else {
    NGN.NET.get('https://api.unsplash.com/search/photos/?client_id=' + YOUR_ACCESS_KEY + '&query=' + searchInput + '&per_page=' + numberPerPage + '', (response) => {
      console.log(response)
      NGN.DOM.destroy('.imageSearchResults');
      NGN.DOM.destroy('.imageResultLinks');
      var json = JSON.parse(response.response).results;
      console.log(json);
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
        console.log(imageID);

        unsplashImage.insertAdjacentHTML('beforeend', '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p><img id= ' + imageURLSmall + ' src =' + imageURLSmall + '/><div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank >Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div><div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div></div>')
        // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank >Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div>'
        // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div>'

        console.log(json[i])
      }
    })
  }
}

function makeRequestCurated() {

  var numberPerPage = document.getElementById('unsplash-curated-search-number').value;
  var orderedBy = document.getElementById('unsplash-curated-search-order').value;

  console.log(document.getElementById('unsplash-curated-search-number').value, 'number value');
  console.log(document.getElementById('unsplash-curated-search-order').value, 'curated label');


  NGN.NET.get('https://api.unsplash.com/photos/curated/?client_id=' + YOUR_ACCESS_KEY + '&per_page=' + numberPerPage + '&order_by=' + orderedBy, (response) => {
    console.log(response)
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

      unsplashImage.insertAdjacentHTML('beforeend', '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p><img id= ' + imageURLSmall + ' src =' + imageURLSmall + '/><div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank >Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div><div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div></div>')
      // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank>Full</a> | <a href = ' + imageURLRaw + ' target=blank>Raw</a> | <a href = ' + imageURLRegular + ' target=blank>Regular</a> | <a href = ' + imageURLSmall + ' target=blank>Small</a> | <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div>'
      // unsplashImage.insertAdjacentHTML += '<div class="imageResultLinks"> <a title="Download photo" href="https://unsplash.com/photos/' + imageID + '/download?force=true" rel="nofollow" download="" target="_blank"><button>Download</button></a></div>'

      console.log(json[i])
    }

  })

}
