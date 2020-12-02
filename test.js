---
layout: js_minifier
---
//Мой скрипт для увеличения картинок (у img должен быть атрибут src-big с путём к большому изображению)
(function()
{
	'use strict';
	const qw = `Многострочный 
		текст, в котором должны сохраняться все отступы`;
	let currentBigImg;
	let isArrowClicked = false;
	//Создаём полупрозрачный серый фон на заднем плане под увеличенным изображением.
	//Он будет перекрывать все элементы экрана.
	const body = document.getElementsByTagName('body')[0];
	const imgBg = document.createElement('div');
	imgBg.className = 'image-enlager-background';
	/* Многострочный
	   комментарий
	*/
	body.appendChild(imgBg);
	//Левая и правая стрелки для листания картинок.
	const imgLeftArrow = document.createElement('div');
	imgLeftArrow.classList.add('image-enlager-arrow');
	imgLeftArrow.classList.add('image-enlager-left-arrow');
	imgLeftArrow.style = 'left: 0px;';
	body.appendChild(imgLeftArrow);
	const imgRightArrow = document.createElement('div');
	imgRightArrow.classList.add('image-enlager-arrow');
	imgRightArrow.classList.add('image-enlager-right-arrow');
	imgRightArrow.style = 'right: 0px;';
	body.appendChild(imgRightArrow);
	
	const imgSatellites = [imgBg, imgLeftArrow, imgRightArrow]; //Записываем все элементы, которые нужны для увеличенного изображения в один массив, чтобы не вызывать одни и теже действия над каждый отдельным элементом.
	imgSatellites.forEach(s => s.hidden = true);
	
	fillBg(); //Функция, которая растягивает серый фон по высоте на весь экран.
	//Перерисовываем высоту серого фона при изменении размеров окна браузера.
	window.addEventListener('resize', fillBg);
	function fillBg()
	{
		let height = (document.documentElement.clientHeight) + 'px';
		imgSatellites.forEach(s => s.style.height = height);
	}
	
	//Определяем долю от размера экрана, которую будет занимать увеличенное изображение
	let bigImgageScreenFraction;
	setImageScreenFraction();
	window.addEventListener('resize', setImageScreenFraction);
	function setImageScreenFraction()
	{
		if (window.matchMedia('(max-width: 768px)').matches) //Зашли с мобильного.
		{
			bigImgageScreenFraction = 1.0;
		}
		else //Зашли с компьютера.
		{
			bigImgageScreenFraction = 0.7;
		}
	}
	//Заглушка для картинки. Появляется вместо неё на том месте откуда она увеличилась.
	let placeholder = document.createElement('img');
	placeholder.className = 'image-enlager-placeholder';
	let imgCache = new Map();
	const imgs = document.querySelectorAll('img[src-big]');
	let isGoingToSmall = false; //Переменная для отслеживания анимации уменьшения.
	for (let i = 0; i < imgs.length; i++)
	{
		let img = imgs[i];
		img.smallSrc = img.src;
		img.index = i;
		
		if (img.complete)
		{
			onFirstLoad();
		}
		else
		{
			img.addEventListener('load', onFirstLoad);
		}
		function onFirstLoad()
		{
			img.removeEventListener('load', onFirstLoad);
			img.defaultStyle = `width: ${img.width}px; height: ${img.height}px`; //Устанавливаем фактические размеры маленькой картинки.
			img.style = img.defaultStyle; //Чтобы анимация работала при первом клике, нужно явно задать ширину и высоту для загруженной маленькой картинки.
			img.addEventListener('click', () => 
			{
				currentBigImg = img;
				img.className = 'image-enlager-animation-normal';
				if (img.isBig) //Картинка большая - уменьшаем
				{
					doImageSmall();
					//Восстанавливаем стрелки перелистывания, если картинка уменьшилась.
					if (img.index === 0)
					{
						showLeftArrow();
					}
					else if (img.index === imgs.length - 1)
					{
						showRightArrow();
					}
				}
				else //Картинка маленькая - увеличиваем.
				{
					doImageBig();
					//Убираем соответствующие стрелки перелистывания, если кликнули по первой или последней картинке.
					if (img.index === 0)
					{
						hideLeftArrow();
					}
					else if (img.index === imgs.length - 1)
					{
						hideRightArrow();
					}
				}
			});
			img.addEventListener('transitionend', () =>
			{
				if (isGoingToSmall) //Отследили завершение анимации уменьшения.
				{
					//Вставляем картинку обратно в поток.
					img.style = img.defaultStyle;
					isGoingToSmall = false;
					//Убираем заглушку.
					placeholder.hidden = true;
					//Если изображение было уменьшено по нажатию на стрелочку, то увеличиваем новое изображение.
					if (isArrowClicked)
					{
						isArrowClicked = false;
						currentBigImg.className = 'image-enlager-animation-fast';
						doImageBig();
					}
				}
			});
		}
	}
	
	//Эта функция уменьшает увеличенное изображение.
	function doImageSmall()
	{
		window.removeEventListener('resize', makeImageBig);
		if (currentBigImg.bigSrcStatus === 'loading') //Если картинка не загрузилась, то мы ставим старое маленькое изображение в источник.
		{
			currentBigImg.bigSrcStatus = 'needReload';
			//В Хроме пока большая картинка не загрузилась, то отображается background. Поэтому если мы уменьшаем картинку, нужно вернуть источник на маленьккую картинку.
			//В Firefox менять источник не нужно, т.к. он не кэширует недозагруженные изображения и одновременно не показывает background у них.
			if (!navigator.userAgent.includes('Firefox'))
			{
				currentBigImg.removeEventListener('load', bigImageLoaded);
				currentBigImg.src = currentBigImg.smallSrc;
				//Для всех браузеров, кроме Firefox, продолжаем загрузку картинки в фоне (когда она маленькая). Если пользователь кликает по разным изображениям, то все эти изображения будут кэшироваться в Map'е imgCache.
				let key = currentBigImg.getAttribute('src-big');
				if (!imgCache.has(key))
				{
					let auxImg = document.createElement('img');
					auxImg.src = key
					imgCache.set(key, auxImg);
				}
			}
		}
		//Смотрим по каким координатам надо вернуть картинку на место.
		let coords = placeholder.getBoundingClientRect();
		//Устанавливаем для изображения уменьшенный размер.
		//Но position остаётся fixed, т.к. нужно, чтобы при анимации уменьшения не смещались остальные элементы страницы.
		currentBigImg.style = `${currentBigImg.defaultStyle}; position: fixed; left: ${coords.left}px; top: ${coords.top}px`;
		currentBigImg.isBig = false;
		//Убираем фон и стрелки листатели, только если нажали на саму картинку, а не на перелистывание.
		if (!isArrowClicked) imgSatellites.forEach(s => s.hidden = true);
		//Указываем, что мы собираемся уменьшить картинку.
		//Эта переменная опять станет false, когда завершится анимация уменьшения.
		isGoingToSmall = true;
		//document.getElementsByTagName('body')[0].style = 'overflow: auto;';
	}
	
	function bigImageLoaded(e)
	{
		let img = e.target;
		img.bigSrcStatus = 'loaded';
		imgCache.delete(img.getAttribute('src-big'));
		img.removeEventListener('load', bigImageLoaded);
	}
	//Эта функция отрисовывает все сопутствующие элементы при увеличении картинки. Само увеличение производится вызовом функции makeImageBig.
	function doImageBig()
	{
		imgSatellites.forEach(s => s.hidden = false);
		currentBigImg.isBig = true;
		//Перед тем как увеличить картинку вставляем вместо неё заглушку.
		placeholder.hidden = false;
		placeholder.style = `width: ${currentBigImg.width}px; height: ${currentBigImg.height}px;`;
		currentBigImg.before(placeholder);
		//document.getElementsByTagName('body')[0].style = 'overflow: hidden;';
		makeImageBig();
		window.addEventListener('resize', makeImageBig);
		if (currentBigImg.bigSrcStatus !== 'loaded') //Проверяем, загружена ли уже полноразмерная картинка.
		{
			//В Firefox не нужно менять источник снова, если он уже был раньше изменён на большую картинку, иначе Firefox начнёт перезагружать картинку.
			if (!(navigator.userAgent.includes('Firefox') && currentBigImg.bigSrcStatus === 'needReload')) currentBigImg.src = currentBigImg.getAttribute('src-big'); //Загружаем большое изображение.
			currentBigImg.bigSrcStatus = 'loading';
			currentBigImg.addEventListener('load', bigImageLoaded);
		}
	}
	
	//Эта функция вычисляет размеры и положение большого изображения и применяет вычисленные стили.
	function makeImageBig()
	{
		let screenHeight = document.documentElement.clientHeight;
		let screenWidth = document.documentElement.clientWidth;
		let imgWidth = currentBigImg.width;
		let imgHeight = currentBigImg.height;
		let bigImgHeight = Math.round(screenHeight * bigImgageScreenFraction);
		let bigImgWidth = Math.round(screenWidth * bigImgageScreenFraction);
		let ratio = imgWidth / imgHeight
		let newWidth = Math.round(bigImgHeight * ratio);
		if (newWidth < bigImgWidth)
		{
			bigImgWidth = newWidth;
		}
		else
		{
			bigImgHeight = Math.round(bigImgWidth / ratio);
		}
		let left = Math.round(0.5 * (screenWidth - bigImgWidth));
		let top = Math.round(0.5 * (screenHeight - bigImgHeight));
		currentBigImg.style = `width: ${bigImgWidth}px; height: ${bigImgHeight}px; left: ${left}px; top: ${top}px; position: fixed; z-index: 2;`;
	}
	
	//Обрабатываем клики на стрелочки - листалки.
	imgLeftArrow.addEventListener('click', () =>
	{
		if (currentBigImg.index > 0)
		{
			isArrowClicked = true;
			currentBigImg.className = 'image-enlager-animation-fast';
			doImageSmall(); //Увеличивать новое изображение будем после уменьшения старого.
			currentBigImg = imgs[currentBigImg.index - 1];
			
			//Долистали до первого изображения - убираем левую стрелку.
			if (currentBigImg.index === 0) hideLeftArrow();
			//Перелистнули с последнего изображения влево - возвращаем правую стрелку.
			if (currentBigImg.index === imgs.length - 2) showRightArrow();
		}
	});
	imgRightArrow.addEventListener('click', () =>
	{
		if (currentBigImg.index < imgs.length - 1)
		{
			isArrowClicked = true;
			currentBigImg.className = 'image-enlager-animation-fast';
			doImageSmall(); //Увеличивать новое изображение будем после уменьшения старого.
			currentBigImg = imgs[currentBigImg.index + 1];

			//Долистали до последнего изображения - убираем правую стрелку.
			if (currentBigImg.index === imgs.length - 1) hideRightArrow();
			//Перелестнули вправо с первого изображения - возвращаем левую стрелку.
			if (currentBigImg.index === 1) showLeftArrow();
		}
	});
	
	function showLeftArrow()
	{
		imgLeftArrow.classList.remove('image-enlager-no-arrows');
	}
	function hideLeftArrow()
	{
		imgLeftArrow.classList.add('image-enlager-no-arrows');
	}
	function showRightArrow()
	{
		imgRightArrow.classList.remove('image-enlager-no-arrows');
	}
	function hideRightArrow()
	{
		imgRightArrow.classList.add('image-enlager-no-arrows');
	}
})();