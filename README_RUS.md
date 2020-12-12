# Jekyll Minifier

## Описание
Cкрипты разработаны для минификации HTML и JavaScript при использовании Jekyll в качестве генератора статических сайтов. Скрипты написаны полностью на Liquid, поэтому не требуют установки дополнительных модулей и полностью совместимы с GitHub Pages.  

Под минификацией понимается:
* Удаление комментариев.
* Удаление ненужных пробелов, табуляций и переносов строк.
* Если нельзя удалять переносы строк (строки в JavaScript или теги pre, script, textarea в HTML), то оставить эти места нетронутыми.
* Минификатор JavaScript также проводит переименование переменных, названий функций и их параметров на короткие имена.

### Особенности минификатора HTML
Целью разработки собственного минификатора явилось то, что аналоги не удовлетворяли моим запросам. Например портили мне встроенный JavaScript. В данном минификаторе можно указать какие теги не нужно минифицировать. По умолчанию - это теги script, pre, svg и textarea. Т.е. на данный момент встроенный в HTML разметку JavaScript минифицироваться не будет. Также можно указать для каких тэгов нужно удалять отступы, но нельзя удалять переносы строк. В этом случае перенос строки будет заменяться пробелом. По умолчанию указан только тэг p. Если у вас в разметке важны переносы строк в div, a, td, span и т.д, то можно добавить и эти тэги, но смотрите что выйдет в итоге, т.к., пробелы вокруг этих тэгов пропадут или например, если эти тэги будут внутри pre, то ваша разметка может поехать.  
Скорректировать какие теги нужно оставлять интактными, а где нельзя удалять переносы строк можно в первых строчках скрипта после текста лицензии.

**Не работает с XHTML, т.к. убирает концевые "/" в тэгах**  

### Особенности минификатора JavaScript
**Минификатор JavaScript по умолчанию переименовывает названия переменных, функций, параметров функций. Это пока экспериментальный фцнкционал и поэтому, какой-то код может неправильно обработаться. Если у вас возникают ошибки в коде после минификации с переименованием, то это можно отключить глобально в первой строке после текста лицензии в файле js_minifier.liquid (переменную replaceNames поставить в false). Так же отключить переименование можно отдельно для каждого скрипта (см. ниже).**

**Когда не будет работать минификатор JavaScript:**
* Если в коде есть JavaScript строки, содержащие символы комментария "//", "/\*" и "\*/". Исключение сделано для сочетания "://", т.к. часто в строках хранят адреса. Т.е. код
```javascript
const str = 'Hello wor//ld! ';
```
непозволит минифицировать JavaScript, а код
```javascript
const str = 'https://example.com';
```
никак не повредит минификации.
* Если в коде есть комментарии, содержащие символы комментария "//", "/\*" и "\*/". Такой код сломает минифкатор:
```javascript
//const str = 'Hello wor//ld! ';
```
* Если в коде между ключевым словом (function, let, const, var и др.) и именем находится чётное число пробелов. Такой код сломает минифкатор:
```javascript
function  foo(){}
```
И такой код тоже:
```javascript
let  foo = 3;
```
Здесь после function и после let идёт два пробела.
* Если в строках будут непарные символы " ' " или " " " или " ` ". Например, следующий код не пройдёт из-за апострофа:
```javascript
const str = "I can't write this!";
```
Однако, непарный символ можно экранировать. Это будет всё ещё валидный JavaScript, который будет работать и без минификации и одновременно минификация на нём не сломается:
```javascript
const str = "I can\'t write this!";
```
Если в строке указанные символы парные, то никаких проблем с минификацией не возникнет:
```javascript
const str = 'I can write this: "Hello!".';
```
* И самое **главное**, конструкции в Вашем коде должны заканчиваться ";". Если вы применяете другой паттерн написания кода, и не пользуетесь символом ";", то на данный момент этот минификатор для Вас работать не будет.

## Как использовать
1. Поместите html_minifier.liquid и js_minifier.liquid в папку _layouts вашего проекта. Эти файлы находятся в папке _layouts репозитория.
2. Укажите в html файлах проекта шаблон html_minifier. Например, в большинстве случаев достаточно в начало _layouts/default.html поместить следующее:
```
---
layout: html_minifier
---
```
Если все ваши html файлы основаны на шаблоне default, то в этом случае они автоматически минифицируются.  

В JavaScript файлах, которые вы хотите минифицировать укажите:
```
---
layout: js_minifier
---
```
Можно выключить в заданном скрипте переименование имён переменных и функций. Это может быть полезно, когда переменные используются глобально, например в другом скрипте. Для этого нужно указать replace_names: false в заголовке JavaScript файла.
```
---
layout: js_minifier
replace_names: false
---
```

**Перед публикацией Вашего сайта обязательно проверяйте правильно ли прошла минификация! Минификаторы тестируются на моём сайте, но возможно существуют неучтённые ошибки и у Вас что-то пойдёт не так.**
