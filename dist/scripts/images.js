const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');
var unsplashImageLinks = document.getElementById('imageLinks');

document.getElementById("unsplashButton").addEventListener('click', makeRequest);
// document.getElementById("downloadButton").addEventListener('click', getDownload);

console.log(document.getElementById('unsplash-search-input').value, 'yo')
function makeRequest() {
  var searchInput = document.getElementById('unsplash-search-input').value;
  var numberPerPage = document.getElementById('unsplash-search-number').value;
  console.log(document.getElementById('unsplash-search-input').value, 'input value');
  console.log(document.getElementById('unsplash-search-input').value, 'number value');
  if (document.getElementById('unsplash-search-input').value === ''){
    NGN.NET.get('https://api.unsplash.com/photos/random/?client_id=' + YOUR_ACCESS_KEY + '&count=' + numberPerPage, (response) => {
      console.log(response)
      var json = JSON.parse(response.response);
      for (var i = 0; i < json.length; i++) {
        var userLink = json[i].user.links.html;
        var userProfilePictureSmall = json[i].user.profile_image.small;
        var userName = json[i].user.name;
        var imageURLSmall = json[i].urls.small;
        unsplashImage.innerHTML += '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURLSmall + '/><button type="button" name="downloadButton id="downloadButton">Download</button></div>';
        console.log(imageURLSmall)
      }
    })
  } else {
    NGN.NET.get('https://api.unsplash.com/search/photos/?client_id=' + YOUR_ACCESS_KEY + '&query=' + searchInput + '&per_page=' + numberPerPage + '', (response) => {
      console.log(response)
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

        unsplashImage.innerHTML += '<div class="imageSearchResults"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURLSmall + '/><button type="button" name="downloadButton id="downloadButton">Download</button></div>'
        unsplashImage.innerHTML += '<div class="imageResultLinks"> <a href = ' + imageURLFull + ' target=blank>Full</a> <a href = ' + imageURLRaw + ' target=blank>Raw</a> <a href = ' + imageURLRegular + ' target=blank>Regular</a> <a href = ' + imageURLSmall + ' target=blank>Small</a> <a href = ' + imageURLThumb + ' target=blank>Thumb</a></div>'

        console.log(json[i])
      }
    })
  }
}
