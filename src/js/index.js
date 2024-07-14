"use strict";
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

function switchDetails() {
	if (window.innerWidth < 769) {
		let details = document.querySelectorAll(".product__details");
		for (let i = 0, len = details.length; i < len; i++) {
			details[i].removeAttribute("open");
			details[i].setAttribute("close", true);
			details[i].setAttribute("onclick", "return true");
		}
	}
	if (window.innerWidth > 768) {
		let details = document.querySelectorAll(".product__details ");
		for (let i = 0, len = details.length; i < len; i++) {
			details[i].removeAttribute("close");
			details[i].setAttribute("open", true);
			details[i].setAttribute("onclick", "return false");
		}
	}
}

// -------------------------- Модальное окно  --------------------------//
const buttonsModal = document.querySelectorAll("[data-model]");
const modal = document.getElementById("modal");
const modalClosse = document.getElementById("modal-close");
const form = document.querySelector(".form");

// открытие модалки
buttonsModal.forEach((elem) => {
	elem.addEventListener("click", (e) => {
		openModal();

		if (elem.getAttribute("data-model") !== "cta") {
			const productCard = elem.parentNode.parentNode;
			form.dataset.productModel =
				productCard.querySelector(".product__name").textContent;
			form.dataset.productPrice = productCard.querySelector(
				".product__price span"
			).textContent;
		}
	});
});

// закрытие по кнопке "close"
modalClosse.addEventListener("click", closeModal);

// закрытие через клик по серой области
modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		closeModal();
	}
});

// закрытие по ESC
document.addEventListener("keydown", (event) => {
	const key = event.key;
	if (key === "Escape") {
		closeModal();
	}
});

function openModal() {
	modal.classList.add("modal--active");
}

function closeModal() {
	modal.classList.remove("modal--active");
}

// ---------------------- Маска нормера телефона  ----------------------//

window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll("#tel"), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___ ____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) : a;
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i);
			}
			var reg = matrix
				.substr(0, this.value.length)
				.replace(/_+/g, function (a) {
					return "\\d{1," + a.length + "}";
				})
				.replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (
				!reg.test(this.value) ||
				this.value.length < 5 ||
				(keyCode > 47 && keyCode < 58)
			) {
				this.value = new_value;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false);
	});
});

// ---------------------------- Валидация  -----------------------------//
const inputName = document.getElementById("name");
const labelTel = document.querySelector(".form__label--tel");
const inputTel = document.getElementById("tel");
let telValidate = false;

inputTel.addEventListener("change", (e) => {
	if (e.target.value.length !== 17) {
		labelTel.textContent = "Номер введен не корректно";
		labelTel.style.color = "red";
	} else {
		telValidate = true;
		labelTel.innerHTML = "Номер телефона<span>*</span>";
		labelTel.style.color = "#000000b3";
	}
});

// ------------------------- Отправка данных  --------------------------//

form.addEventListener("submit", async function (e) {
	e.preventDefault();

	const tel = inputTel.value.replace(/[\s\(\)]/g, "");

	if (telValidate) {
		const data = {
			name: inputName.value,
			tel: tel,
			model: form.dataset.productModel || "Заявка на консультацию",
			price: form.dataset.productPrice,
		};

		const response = await fetch("./../files/mail.php", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		if (response.ok) {
			closeModal();
			inputName.value = "";
			inputTel.value = "";

			//window.location.href = 'https://новый url'
		}
	}
});

// --------------------- JS события Яндекс Метрики ---------------------//
// const summaryAll = document.querySelectorAll(".product__details summary");
// for (elem of summaryAll) {
// 	elem.setAttribute(
// 		"onclick",
// 		"ym(43781124, 'reachGoal', 'click-details'); return true;"
// 	);
// }

// document
// 	.querySelector(".cta-prod__phone")
// 	.setAttribute(
// 		"onclick",
// 		"ym(43781124, 'reachGoal', 'phone-1'); return true;"
// 	);

// document
// 	.querySelector(".cta__phone")
// 	.setAttribute(
// 		"onclick",
// 		"ym(43781124, 'reachGoal', 'phone-2'); return true;"
// 	);

//onclick = "ym(43781124, 'reachGoal', 'TARGET_NAME'); return true;"
