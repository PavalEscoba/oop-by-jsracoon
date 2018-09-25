## прототипы ##
В прототипе храняться методы работы с каждым отдельным объектом.
```javascript
  console.dir([].__proto__);
  // То же самое, что и
  console.dir(Array.prototype);
```
Потренируемся.
```javascript
  const Animal = function(name, species, sound){
    this.name = name;
    this.species = species;
    this.sound = sound;
  }
```
Добавим в прототип метод "говорения".
```javascript
  Animal.prototype.speak = function(){
    return this.name + " says " + this.sound; + "!";
  }
```
Создадим несколько экземпляров
```javascript
  const cat = new Animal('Wizard', 'Cat', 'Meow');
  const dog = new Animal('Pancho', 'Dog', 'Woof');
  const fox = new Animal('Oliver', 'Fox', '????');
```
В самих объектах нет функции `speak`, но есть объекты могут пользоваться этим методом.  
Процесс поиска 
- сначала в самом объекте;
- если нет, то выше по `__proto__`
Проверим прототипы у примитивов, массива и нашего Животного.
```javascript
  // Прототипы для чисел
console.dir((10).__proto__); // Number
console.dir((10).__proto__.__proto__); // Object

// Прототипы для строк
console.dir('str'.__proto__); // String
console.dir('str'.__proto__.__proto__); // Object

// Прототипы для объектов
console.dir([].__proto__); // Array
console.dir([].__proto__.__proto__); // Object

// Прототипы для созданной нами функции-конструктора Animal
console.dir(cat.__proto__); // Animal
console.dir(cat.__proto__.__proto__); // Object
```
Обычные методы например `toString` можно переопределить одном из уровней.
Например:  
сначала посмотрим обычное поведение
```javascript
  const cat = new Animal('Wizard', 'Cat', 'Meow');
  const dog = new Animal('Pancho', 'Dog', 'Woof');

  cat.toString = function() {
    return this.species + ' ' + this.name;
  };

  console.log(cat.toString()); // Cat Wizard
  console.log(dog.toString()); // "[object Object]"
```
Сейчас переопределим на уровне *прототипа* **Животного** и на уровне экземпляра **кота**
```javascript
  Animal.prototype.toString = function() {
    return 'This is ' + this.species + ' ' + this.name;
  };

  cat.toString = function() {
    return this.species + ' ' + this.name;
  };

  const cat = new Animal('Wizard', 'Cat', 'Meow');
  const dog = new Animal('Pancho', 'Dog', 'Woof');
  const fox = new Animal('Oliver', 'Fox', '????');

  console.log(cat.toString()); // Cat Wizard
  console.log(dog.toString()); // This is Dog Pancho
  console.log(fox.toString()); // This is Fox Oliver
```
Два способа записи в прототип. Хороший и плохой:
```javascript
  Animal.prototype.toString = function() { /* code here */ }; // good enough
  // ...
  Animal.prototype = {
    speak: function() {} // bad. very bad
```