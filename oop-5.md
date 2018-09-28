## Наследование ## 
*Нужно обозначить, что чел в статье использует паттерн `модуль` на каждый конструктор. Я пока не понимаю этого, поэтому делаю без него*  
**Задача** - сделать 3 класса игроков. Люди, орки, эльфы.  
**У всех** есть:
- здоровье;
- сила удара;
- опыт;
- умение ходить;
- умение бегать;
  
**Особенности**:  
Люди:
- строительство защитных сооружений;
  
Орки: 
- при виде красного цвет впадают в ярость и становяться в несколько раз сильнее;
  
Эльфы:
- из лука могут поражать на расстоянии;
  
Нужно 3 конструктора `Ork`, `Elf`, `Human`. Так как они имеют много общего и лишь некоторые отличия, то для этих целей нужен ещё один конструктор (`Character`), от которого уже отнаследуются `Ork`, `Elf`, `Human`.  
`Character` будет иметь несколько заданных св-в, которые передадим через объект.
```javascript
  var Character = function(settings){
    this.name = name;
    this.health = settings.health ||  100;
    this.strength = settings.strength  || 1;
    this.exp = settingd.exp || 0;
  }
```
Пропишем методы в *прототип* `Character`
```javascript
  Character.prototype.walk = function(num){
    console.log(this.name + " has walked " + num + " steps.");    
  }
  Character.prototype.run = function(num){
    console.log(this.name + " has run " + 2*num + " steps.")
  }
```
Создадим прототип для **человека**.
```javascript
  var Human = function(settings){};
  Human.prototype.build = function(buildingStrength){ 
      this.health += buildingStrength; 
  }
```
Получается, что все люди созданные через этот конструктор будут уметь строить защитные постройки, но всего остального, что есть у `Character` у них нет. Можно было бы прописать всё вручную, но это не наш метод.  
Вместо этого мы вызовем конструктор `Character` внутри конструктора `Human`.
```javascript
  var Human = function(settings){
    Character.apply(this, arguments)
  };
  Human.prototype.build = function(buildingStrength){ 
      this.health += buildingStrength; 
  }
```
Теперь можно создать человека со своими силой, опытом  и тэ дэ 
```javascript
  var human = new Human({
    name: 'Snow',
    exp: 40,
    strength: 25
  });
  console.log(human); // {"name":"Snow", "health":100, "exp":10, "strength":15}
```
Понятно что человек ещё может пользоваться методом `build`.
```javascript
  console.log(human.health); // 100
  human.build(10);           
  console.log(human.health); // 110
  human.build(120);
  console.log(human.health); // 230
```
С помощью `call` можно сделать то же самое.
```javascript
  var Human = function(settings){
    Character.call(this, settings);
  }
```
*Дальше идёт то, что я не очень понял поэтому просто скопипащу код.*  
Чтобы сделать наследование нужно вызвать `Character` через метод `apply` и переопределить прототип у `Human` а также `constructor` у `Human.prototype.constructor`.
```javascript
  var Human = (function() {
    var Human = function(settings) {
      Character.apply(this, arguments);
    };

    Human.prototype = Object.create(Character.prototype);
    Human.prototype.constructor = Character;

    Human.prototype.build = function(buildingStrength) {
      this.health += buildingStrength;
    };

    return Human;
  })();

var human = new Human({name: 'John', health: 10});

console.log(human.health); // 10
human.build(10);
console.log(human.health); // 20
human.walk(10); // John walked 10 steps
human.run(50);  // John ran 100 steps
```
Тоже самое проделаем с орками и эльфами.