---
layout: js_minifier
---

(function()
{
	'use strict';
	let d = new Date();
	d.setUTCDate(4);
	d.setUTCMonth(11);
	d.setUTCFullYear(2021);
	d.setUTCHours(7);
	d.setUTCMinutes(34);
	d.setUTCSeconds(38);
	d.setUTCMilliseconds(0);
	const container = document.createElement('div');
	const timer = document.createElement('span');
	document.getElementsByTagName('body')[0].appendChild(container);
	container.appendChild(timer);
	container.style = 'display: flex; flex-direction: row; justify-content: flex-end;';
	container.className = 'post';
	timer.style = 'width: 22rem;';
	showTime();
	
	function showTime()
	{
		let diff = d.getTime() - Date.now();
		let days = Math.floor(diff / 86400000);
		let aux = days * 86400000;
		let hours = Math.floor((diff - aux) / 3600000);
		aux += hours * 3600000;
		let minutes = Math.floor((diff - aux) / 60000);
		aux += minutes * 60000;
		let seconds = Math.floor((diff - aux) / 1000);
		aux += seconds * 1000;
		let millis = diff - aux;
		timer.innerHTML = `${days} ${name(['дней', 'день', 'дня'], days)}, ${hours} ${name(['часов', 'час', 'часа'], hours)}, ${minutes} ${name(['минут', 'минута', 'минуты'], minutes)}, ${seconds} ${name(['секунд', 'секунда', 'секунды'], seconds)}`;
		if (!(seconds === 0 && minutes === 0 && hours === 0 && days === 0))
		{
			millis++;
			setTimeout(showTime, millis);
		}
	}
	
	function name(words, n)
	{
		n %= 100;
		if (n >= 10 && n <= 20)
		{
			return words[0];
		}
		else
		{
			n %= 10;
			switch(n)
			{
				case 0: case 5: case 6: case 7: case 8: case 9:
					return words[0];
				case 1:
					return words[1];
				case 2: case 3: case 4:
					return words[2];
			}
		}
	}
})();