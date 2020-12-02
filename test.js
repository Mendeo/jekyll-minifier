---
layout: js_minifier
---

const MESSAGE_SERVER = 'https://example.com'; //Тестовый комментарий
//Тестовый комментарий
(function()
{
	'use strict';
	const COUNTED_STORAGE_NAME = 'counted';
	if (!localStorage.getItem(COUNTED_STORAGE_NAME))
	{
		localStorage.setItem(COUNTED_STORAGE_NAME, 'true');
		navigator.sendBeacon(MESSAGE_SERVER, JSON.stringify({counter: true}))
	}
})();