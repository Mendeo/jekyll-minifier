---
layout: js_minifier
---

'use strict';
//Тестовый скрипт
(function()
{
	'use strict';
	//Это обычный комментарий *, ( ) { }  тут буквы + = конец спецсимволов.
	
	function   bazF  (  x , t)
	{   
		return x   + 4   - t /   2;
	}
	let a = "qw";
	console.log(a  );
	let foo;
	console.log(3+1);
	if(4 >= 3 && 2 > 1){console.log("Ура!")}
	foo = {efef:"efef"};
	let bar = { num: 3 - 2   };
	let baz = { dfg: foo.test , num: 2 };
	const arr = [foo, bar, baz];
	var ion = 2 * 2;
	console.log(arr   + ion);
	ion = (ion=== 4 ? 3: 2);
	const verylongnameallwillbegoodfoobarbaz = 12;
	console.log( ion + verylongnameallwillbegoodfoobarbaz / ion);
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
	
	for (let ii = 0; i < arr.length; i++)
	{
		console.log(bazF(i,1));
	}

	function tyu(fih)
	{
		return fih(10,   -5);
	}
	let asd = {
		foo: "test " + bar.num  ,
		bar: 'test ' +  baz.num,
<<<<<<< HEAD
		baz: `test ${   bazF(   1,   4)   } и вот ещё ${  asd  }`
=======
		baz: `test ${bazF(   1,   4)  } - это круто, а ${tyu(bazF)  } - не очень`
>>>>>>> js-names
	};

	function ght(x)
	{
		return function (y)
		{
			return `${x + y} ${ion}`;
		}
	}
	function plus(x, y)
	{
		return x + y;
	}

	console.log(asd   );
	console.log(bazF(   10,   -5));
	console.log(tyu(bazF));
	console.log(ght(   10)(   5));
	console.log(plus(   10  ,   5));
})();