const YOUR_ACCESS_KEY = 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f';
var unsplashImage = document.getElementById('image');

document.getElementById("unsplashButton").addEventListener('click', makeRequest);
function getvalue(t) {
   console.log(t.value);
}

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
        var imageURL = json[i].urls.small;
        unsplashImage.innerHTML += '<div class="posts"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURL + '/></div>';
        console.log(imageURL)
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
        var imageURL = json[i].urls.small;
        unsplashImage.innerHTML += '<div class="posts"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURL + '/></div>'

        console.log(json[i].imageURL)
      }
    })
  }
}


// (function() {
//   var httpRequest;
//   document.getElementById("unsplashButton").addEventListener('click', NGN.NET.get);
//   NGN.NET.get('https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f', (response) => {
// console.log(response)
// })
//
//   function makeRequest() {
//     // httpRequest = new XMLHttpRequest();
//     //
//     // if (!httpRequest) {
//     //   alert('Giving up :( Cannot create an XMLHTTP instance');
//     //   return false;
//     // }
//     httpRequest.onreadystatechange = alertContents;
//     // httpRequest.open('GET', 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f');
//     // // httpRequest.open('POST', 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f');
//     // httpRequest.send({
//     //   applicationId: "24539",
//     //   secret: "ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f",
//     //   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
//     // });
//
//     NGN.NET.post({
//       url: 'https://api.unsplash.com/photos/?client_id=ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f',
//       headers: {
//         Authorization: 'ee149b09b89a06de5d016c7bf0ead7971a1c667c2969a2535f9065b64ced909f'
//       }
//     }, (response) => {
//       console.log(response)
//     })
//   }
//
//   function alertContents() {
//
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//       if (httpRequest.status === 200) {
//         var json = JSON.parse(httpRequest.responseText);
//         var unsplashImage = document.getElementById('image');
//         for (var i = 0; i < json.length; i++){
//           var userLink = json[i].user.links.html;
//           var userProfilePictureSmall = json[i].user.profile_image.small;
//           var userName = json[i].user.name;
//           var imageURL = json[i].urls.small;
//           unsplashImage.innerHTML += '<div class="posts"><hr><p class=imageCredit>Photo by <a href=' + userLink + '?utm_source=hackathon_resources&utm_medium=referral target=_blank>' + userName + '<img src= ' + userProfilePictureSmall + '/></a> on <a href="https://unsplash.com/?utm_source=hackathon_resources&utm_medium=referral" target=blank>Unsplash</a></p> <img src =' + imageURL + '/></div>'
//           // unsplashImage.innerHTML += '<div class="posts"><p class=imageCredit><a href=https://api.unsplash.com/search/photos/random target=_blank>try</a></p></div>'
//
//           // console.log(userLink);
//           console.log(json[i]);
//           console.log(userLink)
//
//
//         }
//       } else {
//         alert('There was a problem with the request.');
//       }
//     }
//   }
// })();
