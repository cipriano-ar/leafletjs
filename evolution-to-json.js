// Function for storing data
function person() {
	var name = 'Cipriano Mazzieri';
	var email = 'cmazzieri@gmail.com';
	var website = 'cmazzieri.com';
}

// Function for storing data (same as above)
var person = function() {
	var name = 'Cipriano Mazzieri';
	var email = 'cmazzieri@gmail.com';
	var website = 'cmazzieri.com';
};

// In order to reference variables outside of the function, turn person into an object
var person = function() {
	this.name = 'Cipriano Mazzieri';
	this.email = 'cmazzieri@gmail.com';
	this.website = 'cmazzieri.com';
};

// The same object can be written like this
{'person':{
	'name' : 'Cipriano Mazzieri',
	'email' : 'cmazzieri@gmail.com',
	'website' : 'cmazzieri.com'
}}