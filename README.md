# Jekyll Minifier

## Description
This scripts are designed to minify HTML and JavaScript when using Jekyll as a static site generator. The scripts are written purely in Liquid, so they do not require installation of additional gems and it is fully compatible with GitHub Pages.

Minification means:
* Delete comments.
* Remove unnecessary spaces, tabs and line breaks.
* If script cannot remove line breaks (lines in JavaScript or tags pre, script, textarea in html), then leave these places untouched.
* JavaScript minifier also renames variable names, function names and function parameters to short names.

### Features of the HTML minifier
The purpose of developing my own minifier was that the analogs did not satisfy my needs. For example, they broke my built-in JavaScript. In this minifier, you can specify which tags do not need to be minified. By default these are the script, pre, svg and textarea tags. JavaScript embedded in HTML will not minify at this time. You can also specify for which tags you want to remove indentation, but you cannot remove line breaks. In this case, the line break will be replaced with a space. By default, only the p tag is specified. If line breaks in div, a, td, span, etc. are important in your markup, then you can add these tags, but the spaces around these tags can disappear and, if these tags will be inside pre, then your markup can break.
You can adjust which tags need to be left intact, and where line breaks cannot be removed, in the first lines of the html_minifier.liquid file after the license text.

**Doesn't work with XHTML, because it removes trailing " / " in tags**

### Features of the JavaScript minifier
**JavaScript minifier renames variable names, function names and function parameters by default. This is still an experimental functional and therefore, some code may not be processed correctly. If you have errors in the code after minification with renaming, then this can be disabled globally in the first line after the license text in the js_minifier.liquid file (set the replaceNames variable to false). You can also disable renaming separately for each script (see below).**

**When the JavaScript minifier won't work:**
* If your code contains JavaScript strings containing comment characters "//", "/\*" and "\*/". An exception was made for the combination "://", because often url are stored in strings. For example the code
```javascript
const str = 'Hello wor//ld! ';
```
will not allow minification of JavaScript, and the code
```javascript
const str = 'https://example.com';
```
will not break minification.
* If the code contains comments containing comment characters "//", "/\*" and "\*/". Code like this will break minification:
```javascript
//const str = 'Hello wor//ld! ';
```
* If in the code there is an even number of spaces between the keyword (function, let, const, var, etc.) and the name. Code like this will break minification:
```javascript
function  foo(){}
```
And this code too:
```javascript
let  foo = 3;
```
In these examples, there are two spaces after "function" and after "let".
* If the lines contain unpaired characters " ' " or " " " or " ` ". For example, the following code will not work because of the apostrophe:
```javascript
const str = "You can't write this!";
```
However, an unpaired character can be escaped. This will still be valid JavaScript, which will work without minification and at the same time minification on it will be successful:
```javascript
const str = "Don\'t worry about it!";
```
If the characters " ' " or " " " or " ` " are paired in the string, then there will be no problems with minification:
```javascript
const str = 'You can write this: "Hello!".';
```
* And most **importantly**, the constructs in your code must ends with ";". If you are using a different coding pattern and do not use the ";" symbol, then this minifier will not work for you!
* Also, the minifier may not work if the names of your variables, functions or their parameters differ from the Latin symbols and simbols "_" and "$".

## How to use
1. Put html_minifier.liquid and js_minifier.liquid in the _layouts folder of your project. These files are located in the _layouts folder of the repository.
2. Specify the html_minifier layout in the html files in you project. For example, in most cases it is enough to put the following at the beginning of _layouts/default.html:
```
---
layout: html_minifier
---
```
If all your html files are based on the default template, then they are automatically will be minified.  

In the JavaScript files you want to minify, specify js_minifier layout:
```
---
layout: js_minifier
---
```
You can turn off the renaming of variable names, function names and function parameters in the specified script. This can be useful when variables are used globally in another scripts. To do this, you need to put replace_names: false in the header of the JavaScript file.
```
---
layout: js_minifier
replace_names: false
---
```

**Before publishing your site, be sure to check whether the minification was correct! Minifiers are being tested on my website, but perhaps there are unaccounted errors and something will go wrong for you.**