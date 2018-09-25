# Объекты #
Создание объекта через литерал
`var obj = {}`
Доваление свойств и методов, как и чтение их может быть осуществлено через точку или через квадратные скобки.
```javascript
 obj.newProp = 'just a string'
 obj[newMethod] = function(){  
  console.log('Hello!');  
}
```
## Итерация по св-вам ##
Итерация по св-вам осуществаляется с помощью цикла `for...in`.
```javascript
  var husband = {
    name: 'Paval',
    surname: 'Miatlitski',
    age: 32,
    email: 'paval.escoba@gmail.com'
  }
  for(let key in husband){
    console.log(key + ': ' + husband[key])
  }
```
В данном случае использовать можно только доступ через квадратные скобки, иначе будет обращение к св-ву `key`, которого нет в объекте.
## Object.keys##
Можно воспользоваться методом `Object.keys()`, чтобы получить массив всех ключей объекта. 
```javascript
  var husband = {
    name: 'Paval',
    surname: 'Miatlitski',
    age: 32,
    email: 'paval.escoba@gmail.com'
  }
  var objArr = Object.keys(husband) //'name', 'surname', 'age', 'email'
```
А потом пройтись по ним перебирающим методом.
```javascript
  keys.forEach(function(key){
    console.log(key + ": " + husband[key])
  })
```
Функция для получения `values` тем же образом.
```javascript
  var values = keys.map(function(key){
    return husband[key];
  })
```
## this ##
Разберём в след. главе.
Главное `this` всегда содержит ссылку на объект, в котором находится. В данном примере `this` ссылается на объект `obj`.