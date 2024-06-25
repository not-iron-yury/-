// --------------------- мобильное меню ---------------------//
const menu = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const mobileBack = document.querySelector(".mobile-back");
const overlay = document.querySelector(".overlay");

const lockScroll = () => {
	document.body.classList.add("lock");
};

const unlockScroll = () => {
	document.body.classList.remove("lock");
};

const initialMenu = () => {
	document
		.querySelector(".nav__list--dropdown")
		.classList.remove("transformation");
	document
		.querySelector(".nav")
		.querySelector(".nav__list")
		.classList.remove("transformation");
	scrollTop();
};

const scrollTop = () => {
	menu.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

burger.addEventListener("click", () => {
	menu.classList.add("open");
	overlay.classList.add("open");
	lockScroll();
	initialMenu();
});

overlay.addEventListener("click", () => {
	menu.classList.remove("open");
	overlay.classList.remove("open");
	unlockScroll();
});

menu.addEventListener("click", (e) => {
	if (e.target.classList.contains("nav__link--drop")) {
		e.preventDefault();
		e.target.closest(".nav__list").classList.add("transformation");
		e.target
			.closest(".nav__item")
			.querySelector(".nav__list--dropdown")
			.classList.add("transformation");
		scrollTop();
	}

	if (e.target.classList.contains("mobile-back__link")) {
		e.preventDefault();
		e.target
			.closest(".nav__list--dropdown")
			.classList.remove("transformation");
		e.target
			.closest(".nav")
			.querySelector(".nav__list")
			.classList.remove("transformation");
		scrollTop();
	}

	if (
		e.target.classList.contains("nav__link") &&
		!e.target.classList.contains("nav__link--drop")
	) {
		//e.preventDefault();
		menu.classList.remove("open");
		overlay.classList.remove("open");
		unlockScroll();
	}
});
// --------------------- карточки товаров ---------------------//

switchDetails();
window.addEventListener("resize", switchDetails);

// function prevDef(e) {
// 	e.preventDefault();
// }

function switchDetails() {
	if (window.innerWidth < 769) {
		let details = document.querySelectorAll(".product__details");
		for (elem of details) {
			elem.removeAttribute("open");
			elem.setAttribute("close", true);
			elem.setAttribute("onclick", "return true");
			// elem.removeEventListene("click", prevDef);
		}
	}
	if (window.innerWidth > 768) {
		let details = document.querySelectorAll(".product__details ");
		for (elem of details) {
			elem.removeAttribute("close");
			elem.setAttribute("open", true);
			elem.setAttribute("onclick", "return false");
			// elem.addEventListener("click", prevDef);
		}
	}
}

// --------------------- модалка ---------------------//

// // повесить слушатели на все кнопки
// // объявить обработчик

// const modal = document.querySelector(".modal");
// const modalBody = document.querySelector(".modal__body");

// // слушатель на модалку
// modal.addEventListener("click", closeModal);

// // слушатели на все кнопки
// const modalBtnAll = document.querySelectorAll("[data-model]");
// modalBtnAll.forEach((elem) => {
// 	elem.addEventListener("click", openModal);
// });

// // закрытие модалки по ESC
// document.addEventListener("keydown", function (event) {
// 	const key = event.key;
// 	if (key === "Escape") {
// 		modal.classList.remove("modal-active");
// 	}
// });

// // открытие модалки
// function openModal(event) {
// 	modal.classList.add("modal-active");
// }
// // закрытие модалки
// function closeModal(event) {
// 	if (event.target == modal) {
// 		modal.classList.remove("modal-active");
// 	}
// }
