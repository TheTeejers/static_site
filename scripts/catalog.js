// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgJPuvNVsyuxureQzwKWKqvY1-ungo504",
  authDomain: "fenix-catalog-tj.firebaseapp.com",
  databaseURL: "https://fenix-catalog-tj.firebaseio.com",
  projectId: "fenix-catalog-tj",
  storageBucket: "fenix-catalog-tj.appspot.com",
  messagingSenderId: "1077431263544"
};
firebase.initializeApp(config);
var firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
const docRef = firestore.collection('fenix-projects');

// Define a project
var Project = new NGN.DATA.Model({
  autoid : false,

  fields:{
    projectName: null,
    projectAuthor: null,
    projectServerName: null,
    projectCallbackURL: null
  }
})

// Create a data entity representing a project
var catalog = new Project ({
  projectName: '',
  projectAuthor: '',
  projectServerName: '',
  projectCallbackURL: ''
})

// Monitor the data model for changes
catalog.on('field.update', function (change) {
  NGNX.REF.code.innerHTML = JSON.stringify(catalog.data, null, 2)
})

// DOM Convenience References
NGNX.REF.create('code', 'pre > code')
NGNX.REF.create('inputs', 'form input')
NGNX.REF.create('name', 'form [name="projectName"]')
NGNX.REF.create('author', 'form [name="projectAuthor"]')
NGNX.REF.create('server', 'form [name="projectServerName"]')
NGNX.REF.create('callbackURL', 'form [name="projectCallbackURL"]')
NGNX.REF.create('undoButton', 'button[name="undoButton"]')
NGNX.REF.create('addButton', 'button[name="addProject"]')
NGNX.REF.create('loadButton', 'button[name="loadProjects"]')

// Populate Form
var populateForm = function () {
  NGNX.REF.name.value = catalog.projectName
  NGNX.REF.author.value = catalog.projectAuthor
  NGNX.REF.server.value = catalog.projectServerName
  NGNX.REF.callbackURL.value = catalog.projectCallbackURL

}

populateForm()

// Monitor the form for changes
NGNX.REF.inputs.on('change', function (e) {
  // NGNX.REF.undoButton.element.classList.remove('hidden')
  catalog[e.target.name] = e.target.value
})

// Update the UI with initial data
NGNX.REF.code.innerHTML = JSON.stringify(catalog.data, null, 2)

NGNX.REF.undoButton.on('click', function (e) {
  console.log('undo')
  catalog.once('field.update', function () {
    console.log('heard', arguments)
    populateForm()
  })
  catalog.undo()
})

NGNX.REF.addButton.on('click', function (e) {
  docRef.add({
    projectName: catalog.projectName,
    projectAuthor: catalog.projectAuthor,
    projectServerName: catalog.projectServerName,
    projectCallbackURL: catalog.projectCallbackURL
  }).then(function() {
    console.log("Saved Project Name!");
  }).catch(function (error) {
    console.log('Got an error!', error);
  });
})

NGNX.REF.loadButton.on('click', function (e) {
  console.log('Load was clicked');
})


firestore.collection("fenix-projects").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let projectInfo = document.getElementById("catalogItems");
        projectInfo.innerHTML = `<p><a href="${doc.data().projectCallbackURL}"><img src="https://cdn.author.io/fenix/smallbadge.svg" alt="Import to Fenix"/></a></p>${projectInfo.innerHTML}`;
        projectInfo.innerHTML = `<p>Project URL: <a href= '${doc.data().projectCallbackURL}'>${doc.data().projectCallbackURL}</p>${projectInfo.innerHTML}`;
        projectInfo.innerHTML = `<p>Project Server:${doc.data().projectServerName}</p>${projectInfo.innerHTML}`;
        projectInfo.innerHTML = `<p>Project Author:${doc.data().projectAuthor}</p>${projectInfo.innerHTML}`;
        projectInfo.innerHTML = `<hr><p>Project Name:${doc.data().projectName}</p>${projectInfo.innerHTML}`;
    });
});



// hljs.initHighlightingOnLoad()
