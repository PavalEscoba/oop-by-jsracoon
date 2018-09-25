var onError = function() {
  var parentNode = this.element.parentNode;
  parentNode.classList.add('has-error');
  parentNode.classList.remove('has-success');
  parentNode.querySelector('.help-block').textContent = 'Ошибка: ' + this.message;
};

var onSuccess = function() {
  var parentNode = this.element.parentNode;
  parentNode.classList.add('has-success');
  parentNode.classList.remove('has-error');
  parentNode.querySelector('.help-block').textContent = 'Ура! Всё прошло хорошо, ваши данные полность валидные.';
};