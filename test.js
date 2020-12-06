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
	console.log(arr  );
	arr.forEach(s    =>   s.text    =   'Hello "world"');
		/* Это многострочный
	комментарий *, ( ) { } // тут буквы + =,
	в котором должны сохраниться все переносы строк*/
	const address = "https://example.com";
	const addres2 = 'https://example2.com';
	const str = "I can\'t write this";
	console.log(str  );
	var hjk = 28;

	foo = 'Это однострочная строка    /* jfiejff */ function jrt(wer) со спец символами *, ( ) { } тут буквы + ';
	
	foo = `Это многострочный
	текст, в котором должны *, ( ) { } тут буквы + 
	сохраниться все переносы и табуляции.`;

	function   bazF  (  x , t)
	{   
		return x   + 4   - t /   2;
	}
	

	function tyu(fih)
	{
		return fih(10,   -5);
	}
	let asd = {
		foo: "test " + bar.num  ,
		bar: 'test ' +  baz.num,
		baz: `test ${bazF(   1,   4)} - это круто, а ${tyu(bazF)} - не очень`
	};

	function ght(x)
	{
		return function (y)
		{
			return x + y
		}
	}

	console.log(asd   );
	console.log(bazF(   10,   -5));
	console.log(tyu(bazF));
	console.log(ght(   10)(   5));
})();