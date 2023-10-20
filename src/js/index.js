const menu = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const mobileBack = document.querySelector('.mobile-back');
const overlay = document.querySelector('.overlay');

const lockScroll = () => {
	document.body.classList.add('lock');
}

const unlockScroll = () => {
	document.body.classList.remove('lock');
}

const initialMenu = () => {
	document.querySelector('.nav__list--dropdown').classList.remove('transformation');
	document.querySelector('.nav').querySelector('.nav__list').classList.remove('transformation');
	scrollTop();
}

const scrollTop = () => {
	menu.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

burger.addEventListener('click', () => {
	menu.classList.add('open');
	overlay.classList.add('open');
	lockScroll();
	initialMenu();
});

overlay.addEventListener('click', () => {
	menu.classList.remove('open');
	overlay.classList.remove('open');
	unlockScroll();
});

menu.addEventListener('click', (e) => {
	if (e.target.classList.contains('nav__link--drop')) {
		e.preventDefault();
		e.target.closest('.nav__list').classList.add('transformation');
		e.target.closest('.nav__item').querySelector('.nav__list--dropdown').classList.add('transformation');
		scrollTop();
	}

	if (e.target.classList.contains('mobile-back__link')) {
		e.preventDefault();
		e.target.closest('.nav__list--dropdown').classList.remove('transformation');
		e.target.closest('.nav').querySelector('.nav__list').classList.remove('transformation');
		scrollTop();
	}

	if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--drop')) {
		//e.preventDefault();
		menu.classList.remove('open');
		overlay.classList.remove('open');
		unlockScroll();
	}
});

// Детали карточек товаров
go();
body.addEventListener('resize', go);

function go(){
	if (window.innerWidth < 769) {
		let details = document.querySelectorAll('.products__list .product');

		for (let i = 0;i < details.length; i++) {
			details[i].querySelector('.product__details').removeAttribute('open');
			details[i].querySelector('.product__details').setAttribute('close', true);
			details[i].querySelector('.product__details').setAttribute('onclick', 'return true');
		}
	}
	if (window.innerWidth > 768) {
		let details = document.querySelectorAll('.products__list .product');

		for (let i = 0;i < details.length; i++) {
			details[i].querySelector('.product__details').removeAttribute('close');
			details[i].querySelector('.product__details').setAttribute('open', true);
			details[i].querySelector('.product__details').setAttribute('onclick', 'return false');
		}
	}
}



// всплывающая форма заявки










/*
goMenu()
body.addEventListener('menu', goMenu);

// Скрытие меню при скролле вниз, и показ при скролле вверх.
function goMenu() {
	if (window.innerWidth < 1280) {
		let prevScrollpos = window.pageYOffset || window.scrollY;
		window.onscroll = function() {
			let currentScrollPos = window.pageYOffset || window.scrollY;

			if (prevScrollpos > currentScrollPos) {
			document.querySelector(".header").style.top = "0";
			} else {
			document.querySelector(".header").style.top = "-144px";
			} prevScrollpos = currentScrollPos;
		}
	}
}
*/




