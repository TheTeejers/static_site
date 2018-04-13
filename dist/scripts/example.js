// Define a person
var Person = new NGN.DATA.Model({
  autoid: true,

  fields: {
    firstname: null,
    lastname: null,
    title: {
      type: String
    },
    gender: {
      type: String,
      enum: ['m', 'f']
    },
    dob: Date
  },

  virtuals: {
    age: function () {
      var diff = Date.now() - this.dob.getTime()
      var ms = new Date(diff) // miliseconds from epoch
      return Math.abs(ms.getUTCFullYear() - 1970)
    }
  }
})

// Create a data entity representing a person
var employee = new Person({
  firstname: 'John',
  lastname: 'Doe',
  title: 'Developer',
  gender: 'm',
  dob: new Date('1980-01-01')
})

// Monitor the data model for changes
employee.on('field.update', function (change) {
  NGNX.REF.code.innerHTML = JSON.stringify(employee.data, null, 2)
  NGNX.REF.code.innerHTML += '\n\nAge: ' + employee.age
})

// DOM Convenience References
NGNX.REF.create('code', 'pre > code')
NGNX.REF.create('inputs', 'form input')
NGNX.REF.create('fn', 'form [name="firstname"]')
NGNX.REF.create('ln', 'form [name="lastname"]')
NGNX.REF.create('title', 'form [name="title"]')
NGNX.REF.create('gender', 'form [name="gender"]')
NGNX.REF.create('undoButton', 'button')

// Populate Form
var populateForm = function () {
  NGNX.REF.fn.value = employee.firstname
  NGNX.REF.ln.value = employee.lastname
  NGNX.REF.title.value = employee.title

  if (employee.gender === 'm') {
    NGNX.REF.gender.element[0].checked = true
  } else {
    NGNX.REF.gender.element[1].checked = true
  }
}

populateForm()

// // Monitor the form for changes
NGNX.REF.inputs.on('change', function (e) {
  NGNX.REF.undoButton.element.classList.remove('hidden')
  employee[e.target.name] = e.target.value
})

// Update the UI with initial data
NGNX.REF.code.innerHTML = JSON.stringify(employee.data, null, 2)
NGNX.REF.code.innerHTML += '\n\nAge: ' + employee.age

NGNX.REF.undoButton.on('click', function (e) {
  console.log('undo')

  employee.once('field.update', function () {
    console.log('heard', arguments)
    populateForm()
  })

  employee.undo()
})

// hljs.initHighlightingOnLoad()
