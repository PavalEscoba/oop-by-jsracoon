# функции конструкторы #
Функция конструктор создаёт объекты
```javascript
  const Manager = function(name, sales){
    this.name = name;
    this.sales = sales;
    this.sale = function(thing){
      this.sales += 1;
      return "Manager" + this.name + "sold" + thing;
    }
  }
```
Создадим несколько менеджеров.
```javascript
  const john = new Manager("John", 10);
  const mary = new Manager("Mary", 120);
```
В `Manager` создаётся объект, в котором можно обращаться к внутренней информации конкретного объекта через `this`.  
Rогда вы вызываете любую функцию с оператором new, вы подразумеваете, что будет создан новый объект, к которому можно обратиться с помощью ключевого слова this внутри функции.  
Также в ф-ии-конструкторе нет `return`. Потому что при использовании `new` возвращается **новый** объект. Но что-либо возвратить можно, если в этом есть необходимость.
```javascript
  const Manager = function(name, sales) {
  this.name = name;
  this.sales = sales;
  this.sell = function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  };
  return {prop: 'Prop of new object'};
};

const john = new Manager('John', 10);
console.log(john); // {"prop":"Prop of new object"}
```
Также при создании нового объекта этому объекту обязательно присваивается св-во **constructor**.
```javascript
  const john = new Manager('John', 10);

  console.log(john.constructor); // function Manager(name, sales) { ... };
  console.log(john.constructor.name); // Manager
  console.log(john instanceof Manager); // true
```
Таким образом, с помощью свойства constructor можно получить, как саму функцию-конструктор, так и её имя.  
Но при таком подходе мы всё равно создаём функции в каждом отдельном объекте.  
Чтобы этого избежать у каждой фунции есть свой прототип.
```javascript
  const Manager = function(name, sales) {
    this.name = name;
    this.sales = sales;
  };

  Manager.prototype.sell = function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  };

  const john = new Manager('John', 10);
  const mary = new Manager('Mary', 120);

  console.log(john.sales, mary.sales); // 10 120
  john.sell('Apple');      // Manager John sold Apple
  mary.sell('Pomegrade');  // Manager Mary sold Pomegrade
  console.log(john.sales, mary.sales); // 11 121
```
`prototype` является просто объектом, поэтому в него можно записывать несколько методов обычным способом.
```javascript
  Manager.prototype = {
    sell: function(thing) {
      this.sales += 1;
      return 'Manager ' + this.name + ' sold ' + thing;
    },
    speak: function(word) {
      return this.name + ' says ' + word;
    }
  };

const john = new Manager('John', 10);
const mary = new Manager('Mary', 120);

john.sell('Apple'); // Manager John sold Apple
mary.speak('Hello!'); // Mary says Hello!
```

