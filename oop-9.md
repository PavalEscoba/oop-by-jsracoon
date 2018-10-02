# ES-6 Classes ##
Предыдущие главы пока пропущены. Там о дескрипторах, реализация библиотеки. И я ещё не разобрался с другими вещами (как передавать несколько аргументов и в наследуюмый класс и класс-наследник).  
Итак, перейдём к **ООП** в **classes** in es6.  
Три кита ООП - *инкапсуляция*, *наследование* и *полиморфизм*.
## Инкапсуляция ##
*И.* осуществляется засчёт паттерна *модуль*, который реализован в `js` за счёт `iife`. В ES-6 также добавилась возможность реализовать приватные переменные за счёт [блочных областей видимости](http://jsraccoon.ru/es6-block-scoped-declarations);
К тому же есть прекрасная [статья](https://habr.com/company/plarium/blog/278377/) от разработчика мобильных и браузерных игр Plarium на Хабре, где вопросы приватных переменных и функций в ES-6 рассматриваются довольно подробно.
## Наследование ##
В JS реализовано прототипное наследование, при котором внесённые изменения в родителя отображаются и на детях. Всё равно, если бы мать накрасила губы, а вместе с ней губы покраснели у дочери.  
Пример с семьёй попугаев.  
Код:
```javascript
// Дед попугай с двумя лапами
  var ParrotGrandFather = function(){};
  ParrotGrandFather.prototype = {
    species: "Parrot",
    paws: 2
  }
  // Отец попугай унаследовал всё у деда
  var ParrotFather = function(){};
  ParrotFather.prototype = Object.create(ParrotGrandfather.prototype);
  // Сын попугай унаследовал всё у отца
  var ParrotSon = function(){};
  ParrotSon.prototype = Object.create(ParrotFather.prototype);
  //Создадим объекты.
  var grandfather = new ParrotGrandfather();
  var father = new ParrotFather()
  var son = new ParrotSon(); 

  console.log(grandfather.species, father.species, son.species);
  // Parrot Parrot Parrot - все попугаи!

  // Дед меняет количество лап
  ParrotGrandfather.prototype.paws++;
  console.log(grandfather.paws, father.paws, son.paws);
  // 3 3 3 - у каждого теперь по 3 лапы

  // Отец меняет вид
  ParrotFather.prototype.species = 'eagle';
  console.log(grandfather.species, father.species, son.species);
  // Parrot eagle eagle - дед остался попугаем, отец и сын стали орлами

  // Сын уменьшил количество лап
  ParrotSon.prototype.paws--;
  console.log(grandfather.paws, father.paws, son.paws);
  // 3 3 2 - дед и отец остались при своих трёх лапах

  // Дед решил стать чайкой
  ParrotGrandfather.prototype.species = "seagull";
  console.log(grandfather.species, father.species, son.species);
  // seagull eagle eagle - дед чайка, отец и сын орлы
```
Здесь важно отметить следующий факт, что отец-попугай не стал чайкой потому что его прототип в случае `ParrotFather.prototype = Object.create(ParrotGrandfather.prototype);` был не дедовский прототип, а **пустой объект**, с прототипом `ParrotGrandfather.prototype`, а не **напрямую**.  
Т.е. отец как бы стал чайкой, только при этом он перезаписал себя в орлы и перекрыл тем самым дедовскую чайковость.  
Вывод: в JS прототипное наследование *динамическое*, где всё можно менять на лету.

## Полиморфизм ## 
Полиморфизм предлагается рассмотреть на стандартных, встроенных конструкторов как то `String, Array, Object ...`  
Вот если вас спросят: “Чем число 42 отличается от массива [4, 2] и что у них общего?” Общее то, что они наследуют от предка одинаковые методы. Например метод `toString`, унаследованный от Object.
И это кочующий из статьи в статью пример с несчастным `toString`, который можно переопределить. И чем ниже он определён, тем быстрее его найдут и исполнят.  
Как утверждается это и является полиморфизмом в JS.
Более подробно предлагается читать [тут](https://toster.ru/q/119265)

## Собственно class ## 
Собственно вот мы и перешли к класам. Напишем простой пример реализации конструктора и прототипа в так скажем классовой нотации и в обычной.
```javascript
  class Person{
    constructor(name){
      this.name = name;
    }
    sayName(){
      console.log(`Person ${name} said his name`);
    }
  }
  const john = new Person("John");
  john.sayName(); // Person John said his name
```
Обычная ES-5 нотация
```javascript
  function Person(name){
    this.name = name;
  }
  Person.prototype.sayName = function(){
    console.log('Person ' + this.name + ' said his name');
  }
```
- Создавая класс, вы пользуетесь блоком кода (всё, что находится между `{` и `}`), внутри которого объявляете, всё, что хотите видеть в прототипе.
- Запись `class Person` означает, что будет создана функция конструктор `Person` (всё точно так же, как и в `ES5`)
- Свойство `constructor` используется для обозначения того, что будет происходить непосредственно в самом конструкторе.
- Все методы для класса используют краткую запись, которую мы обсуждали ранее в [статье](http://jsraccoon.ru/es6-object-literal) про расширение литерала объектов.  
**Особенности:**
- вызываем только с `new`
- классы не подымаются (нет `hoisting`)
  
Наследование реализуется за счёт *синтаксического сахара* в виде директивы `extends`
```javascript
  class GreatPerson extends Person{
    constructor(name, phrase){
      super(name);
      this.phrase = phrase;
    }
    sayPhrase(){
      console.log(`${this.name} says: "${this.phrase}"`)
    }
  }
  const jane = new Person('Jane', 'Hello, World!');
  jane.sayName(); // Person Jane said his name
  jane.sayPhrase(); // Jane says: "Hello, World!"
```
`super` в данном случае заменяет строчку с `apply` из предыдущего синтаксиса.
```javascript
  var GreatPerson = function(name, phrase) {
    // Пердача всех аргументов в конструктор родителя
    Person.apply(this, arguments);
    
    // или только одного
    Person.call(this, name);
    
    // запись новых свойств
    this.phrase = phrase;
  };
```
