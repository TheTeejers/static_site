
const unsplash = {
  applicationId: "24539",
  secret: "ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
};

// var frontPage = 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f'
//
//
// $(document).ready(function(){
//   $.ajax({
//     method: 'GET',
//     data: '',
//     url: frontPage,
//     // type: 'default GET (Other values: POST)',
//     dataType: 'json',
//     // data: {param1: 'value1'},
//     success: onSuccess,
//     error: onError,
//   })
// });
// //
//
// function onSuccess(json){
//
//   var count = 0;
//   // var thumbnail = json.data.children[i].data.preview.images[0].source.url;
//   for(var i = 0; i < (json.length); i++){
//     var userLink = json[i].links.html;
//     var userName = json[i].user.name;
//     var imageURL = json[i].urls.small;
//
//     $('.postTitles').append('<div class="posts"> Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=blank>' + userName + '</a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a> <img src =' + imageURL + '</div>');
//     // console.log(json.data.children[i].data.url);
//     console.log(json[i].urls.raw);
//     console.log(json[i]);
//     // console.log(thumbnail)
//   }
// console.log('title count ' + i)
// }
//
//
//
// function onError (){
//   console.log('whoops');
// }


(function() {
  var httpRequest;
  document.getElementById("unsplashButton").addEventListener('click', makeRequest);

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    // httpRequest.open('GET', 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f');
    httpRequest.open('GET', 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f');
    httpRequest.send({
      applicationId: "24539",
      secret: "ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f",
      callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
    });
  }

  function alertContents() {

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var json = JSON.parse(httpRequest.responseText);
        var unsplashImage = document.getElementById('image');
        for (var i = 0; i < json.length; i++){
          var userLink = json[i].user.links.html;
          var userProfilePictureSmall = json[i].user.profile_image.small;
          var userName = json[i].user.name;
          var imageURL = json[i].urls.small;
          unsplashImage.innerHTML += '<div class="posts"><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURL + '/></div>'
          unsplashImage.innerHTML += '<div class="posts"><p class=imageCredit><a href=https://api.unsplash.com/search/photos/random target=_blank>try</a></p></div>'

          // console.log(userLink);
          console.log(json[i]);
          console.log(userLink)


        }
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
