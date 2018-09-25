# примитивы и объекты #
Сами примитивы не являются объектами и не содержат св-в и методов. Св-ва и методы содержит объект созданный фукнцией конструктором.  
Почему у массива можно установить св-во `length`, а у примитива (строки, созданную с помощью литерала) нельзя?  
Потому что объект, который создаётся при выполнении кода 
```javascript
  someString.length // например 10
```
является временным и после отработки св-ва уничтожается.
1. Создаётся новый **объект**: `new String('this is string')`
2. У **нового** объекта устанавливается свойство `length` со значением `10`
3. Созданный объект уничтожается

Тоже самое произойдёт, если попытаться присвоить примитиву **новые** св-ва или методы.  
```javascript
  const str = 'str';
  str.newProp = 'my new property';
  str.newMethod = function() {
    return 'my new method';
  };

  str.newProp; // undefined
  str.newMethod(); // Uncaught TypeError: str.newMethod is not a function
```
## Примитивные типы данных в js ##
Их всего 6:
- строки `'str', "str", \`str\` `
- числа `2, 0, 100.34`
- boolean `true` & `false`
- `undefined`
- `null`
- символы `Symbol()`

У строк, чисел и булеан есть как литерал, так и ф-ия. Пользоваться нужно только литералом. Потому как ф-ия вернёт объект-обёртку, а не значение.  
Если использовать фукнцию без кл.слова `new`, то будет осуществляться приведение типа.
Например:
```javascript
  // Приведение строки к числу
  let num = Number('20');
  typeof num; // "number"

  // Приведение числа к строке 
  let str = String(20);
  typeof str; // "string"

  // Приведение любого значения к типу boolean
  let bool1 = Boolean('str'); // true
  let bool2 = Boolean(0); // false

  typeof bool1; // "boolean"
  typeof bool2; // "boolean"
```
Пример кода для отсеивания фолси или труси вэлью
```javascript
  const falsyArr = ['', 0, null, 10, 'string', undefined, true, {a: 1}, false];
  const truthyArr = falsyArr.filter(Boolean);

  // Аналогично
  const truthyArr = falsyArr.filter(function (item) {
    return !!item; 
  });

  // С использование стрелочных функций из ES6
  const truthyArr = falsyArr.filter(item => !!item);
```

## Непосредственно объекты ##
Всё остальное является объектом. Массивы, функции, сами объекты.  
Пример, который добавляет св-ва и методы в функции.
```javascript
  const log = function(message) { console.log(log.transform()); };
  log.messages = ['first', 'second', 'third'];
  log.transform = function () {
    return log.messages.map(function(message) {
      return message + ' message';
    });
  };
  log(); // ["first message","second message","third message"]
```
В случае массива новое св-во не отобразится на `length`, а также не будет видно в `forEach`
```javascript
  const arr = [1, 2, 3, 4, 5];
  console.log(arr.length); // 5

  arr.newProp = 'awesome property';
  console.log(arr.length); // 5

  // свойство newProp не выводится в консоль
  arr.forEach(function(num) {
  console.log(num); // 1 2 3 4 5 
});
```