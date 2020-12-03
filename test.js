---
layout: js_minifier
---
'use strict';
//Тестовый скрипт
(function()
{
	'use strict';
	//Это обычный комментарий *, ( ) { }  тут буквы + = конец спецсимволов.
	let foo = {};
	let bar = { num: 3 - 2   };
	let baz = { dfg: foo.test , num: 2 };
	const arr = [foo, bar, baz];
	arr.forEach(s    =>   s.text    =   'Hello "world"');
		/* Это многострочный
	комментарий *, ( ) { } // тут буквы + =,
	в котором должны сохраниться все переносы строк*/
	const address = "https://example.com";
	const addres2 = 'https://example2.com';
	const str = "I can\'t write this";
	console.log(str  );

	foo = 'Это однострочная строка    /* jfiejff */ со спец символами *, ( ) { } тут буквы + ';
	
	foo = `Это многострочный
	текст, в котором должны *, ( ) { } тут буквы + 
	сохраниться все переносы и табуляции.`;

	function   bazF  (  x , t)
	{   
		return x   + 4   - t /   2;
	}
	
	let asd = {
		foo: "test " + bar.num  ,
		bar: 'test ' +  baz.num,
		baz: `test ${bazF(   1,   4)}`
	};
	
	console.log(asd   );
	console.log(bazF(   10,   -5));
})();