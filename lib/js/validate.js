var Validator = (function(){
  'use strict';

  var Validate = function(element, options){
    this.element = element;
    this.option = options;

    this.value = this.element.value.trim();// удаляет пробелы в строке
    this.length = this.value.length;
    this.rules = this.options.rules;
    this.messages = this.options.messages;
  }
  return Validate;
})();

var settings = {
  rules: {
    min: 8,
    max: 50,
    match: 'email'
  },
  messages: {
    min: 'Поле должно содержать больше 8 символов',
    max: 'Поле не должно содержать больше 50 символов',
    match: 'Поле должно содержать валидный адрес электронной почты'
  },
  onError: function(){console.log('Валидация провалена');},
  onSuccess: function() {console.log('Валидация прошла успешно');}
};
var email = document.getElementById('email');
var emailValidation  = new Validator(email, settings);

/* Validate.prototype.required = function () {
  return this.length > 0;
}
Validate.prototype.min = function(param) {
  return this.length >= param;
}
Validate.prototype.max = function (param) {
  return this.length <= 0;
}
var regExps = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  numbers: /^\d+(\.\d{1,2})?$/,
  digits: /[0-9]*$/,
  letters: /[a-z][A-Z]*$/
};

Validate.prototype.match = function(param) {
  var re = regExps[param];
  return re.test(this.value);
}; */

var fn = Validate.prototype; // сохраним прототип в переменную и таким образом уменьшим всю предыдущую запись.
fn.required = function() { return this.length > 0; };
fn.min = function(param) { return this.length >= param; };
fn.max = function(param) { return this.length <= param; };
fn.match = function(param) { return regExps[param].test(this.value); };
fn.validate  = function () {
  this.value = this.element.value.trim();
  this.length = this.value.length;
  
  for(rule in rules){
    var param = this.rules[rule];
  }
}