(function(global, $) {

	// this allow to use greetr without needing to use the new keyword in app.js, creates a new object
	var Greetr = function(fistName, lastName, language) {
		return new Greetr.init(fistName,lastName, language)
	}

	//there variable will be hidden in the scope of this library and never accessible outside it because the whole library is an IIFE
	var supportedLangs = ['en', 'es'];
	var greetings = {
		en: 'Hello',
		es: 'Hola'
	};
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};
	var logMessages = {
		en: 'Logged in',
		es: 'Incicio sesion'
	};

	// add methods to the prototype to save memory instead of adding to each created object
	Greetr.prototype = {
		// this will refer to the calling object at execution time
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},
		validate: function() {
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},
		// retrieve messages from greetings object by using [] syntax to refer to properties
		formalGreeting: function() {
			return formalGreetings[this.language] + ' ' + this.fullName();
		},
		greet: function(formal) {
			var msg;
			// if undefined or null will be coerced to false
			if (formal) {
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}
			if (console) {
				console.log(msg);
			}
			// this refers to calling object at execution time, makes the method chainable
			// ex - object.greet(true).log
			return this;
		},
		log: function() {
			if (console) { 
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}
			return this;
		},
		setLang: function(lang) {
			this.language = lang;
			this.validate();
			return this;
		},
		HTMLGreeting: function(selector, formal) {
			if (!$) {
				throw 'jQuery not loaded';
			}
			if (!selector) {
				throw 'Missing jQuery selector';
			}
			var msg;
			if (formal) {
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}
			$(selector).html(msg);
			return this;
		}

	};

	// object is created here
	Greetr.init = function(firstName, lastName, language) {

		var self = this;
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';
		self.validate();

	}

	// trick borrowed from jQuery so we don't have to use the new keyword
	Greetr.init.prototype = Greetr.prototype;

	// attach Greetr and the shorthand G$ to the glodal object
	global.Greetr = global.G$ = Greetr

}(window, jQuery));