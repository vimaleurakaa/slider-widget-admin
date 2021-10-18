import { data } from "autoprefixer";
import "../scss/index.scss";
import { sliderCarousel } from "./utils/carousel";

//root DataPane
const dataPane = document.getElementById("ma-comm-promo-carousel");
const loader = document.createElement("div");
loader.classList.add("ma-comm-promo-carousel-loader");

dataPane.insertAdjacentElement("beforebegin", loader);

const appStyles = `@import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap);body{font-family:Open Sans,sans-serif}.ma-comm-promo-carousel--box{display:flex;flex-direction:row;width:100%;margin:0 auto;max-width:860px;justify-content:center;align-items:center;height:90vh;max-height:840px}.ma-comm-promo-carousel--img{margin-right:30px;max-width:400px;width:100%}.ma-comm-promo-carousel--btn{color:#fff;background-color:#1d7ac0;display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.428571429;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;border:1px solid transparent;border-radius:4px;text-decoration:none}#ma-comm-promo-carousel{width:100%}.ma-comm-promo-carousel--inner{position:relative;width:100%;overflow:hidden}.ma-comm-promo-carousel--item{position:relative;display:none;animation:.5s ease-in-out}.ma-comm-promo-carousel--inner>.active,.ma-comm-promo-carousel--inner>.next{display:block}.ma-comm-promo-carousel--inner>.next{position:absolute;top:0;width:100%}.ma-comm-promo-carousel--inner>.to-left{animation-name:left}.ma-comm-promo-carousel--inner>.from-right{animation-name:right}.ma-comm-promo-carousel--inner>.to-right{animation-name:right;animation-direction:reverse}.ma-comm-promo-carousel--inner>.from-left{animation-name:left;animation-direction:reverse}.ma-comm-promo-carousel--control{position:absolute;top:0;bottom:0;width:60px}.ma-comm-promo-carousel--control.right{right:0}.ma-comm-promo-carousel--control.left{padding-left:24px;left:0}.ma-comm-promo-carousel--control>.arrow{cursor:pointer;position:absolute;top:50%;display:inline-block;width:30px;height:30px;opacity:.6}.ma-comm-promo-carousel--control>.arrow:hover{opacity:.8}.ma-comm-promo-carousel--indicators{position:absolute;bottom:20px;left:50%;padding-left:0;margin:0;list-style:none;transform:translateX(-50%)}.ma-comm-promo-carousel--indicators li{display:inline-block;width:32px;height:10px;cursor:pointer;border:1px solid #ccc;border-radius:10px;margin-right:8px}.ma-comm-promo-carousel--indicators li.active{background-color:#1d7ac0}@keyframes left{0%{left:0}to{left:-100%}}@keyframes right{0%{left:100%}to{left:0}}@media screen and (max-width:768px){.ma-comm-promo-carousel--box{flex-direction:column}.ma-comm-promo-carousel--item{padding:32px}.ma-comm-promo-carousel--img{margin-right:0}.ma-comm-promo-carousel--control.left{padding-left:0}.ma-comm-promo-carousel--control{width:26px}.ma-comm-promo-carousel--indicators li{width:16px;height:8px}.ma-comm-promo-carousel--control svg{width:24px}}.covid-btns{display:-webkit-box;display:-ms-flexbox;display:flex}.covid-btns .col-xs-6:first-child{margin-right:16px}.covid-precautions{color:#122a3b;padding:0;list-style:none;font-size:14px}.covid-precautions li{padding:4px 10px;background:#fff;box-shadow:0 3px 6px #ddd;border-radius:6px;margin-bottom:10px}.covid-precautions li span{margin-right:5px;width:30px;display:inline-block}.covid-precautions li span img{height:22px}`;

const stylesTag = document.createElement("style");

stylesTag.innerText = appStyles;
dataPane.insertAdjacentElement("beforebegin", stylesTag);

//Slider Wrapper
const carouselContainer = () => {
  return ` 
    <div class="ma-comm-promo-carousel--inner"></div>
    <ul class="ma-comm-promo-carousel--indicators">
    </ul>
  `;
};

dataPane.innerHTML = carouselContainer();

const carouselIndicator = document.querySelector(
  ".ma-comm-promo-carousel--indicators"
);

const carouselInner = document.querySelector(".ma-comm-promo-carousel--inner");

//fetching the data
// https://mediassisttpa.in/test/data.json
fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    loader.remove();
    data.map((it, id) => {
      carouselInner.innerHTML += carouselItems(it, id);
      carouselIndicator.innerHTML += svgIndicator(id);
    });
    sliderCarousel(10000);
  });

//Slider items
const carouselItems = ({ i, c }, id) => {
  return ` 
  <div class="ma-comm-promo-carousel--item ${id === 0 ? "active" : ""}">
  <div class="ma-comm-promo-carousel--box">
  <img class="ma-comm-promo-carousel--img" src="${i}" alt="communication-banner"/>
  <div class="ma-comm-promo-carousel--content">${c}</div>
  </div></div>`;
};

const svgIndicator = (id) => {
  return `
  <li class="${id === 0 ? "active--indicator-0" : ""}">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30">
	<g>
		<rect width="26" height="26" rx="8" fill="#fff" stroke="#6978FF" stroke-width="2" transform="translate(2 2)" class="background" />
		<rect width="26" height="26" rx="8" fill="#fff" stroke="#6978FF" stroke-width="2" transform="translate(2 2)"  class="foreground"/>
		<rect width="20" height="20" rx="7" transform="translate(5 5)" class="outer-layer"/>
		<circle cx="8" cy="8" r="8" transform="translate(7 7)" fill="#8f99ff"/>
		<circle cx="4" cy="4" r="4" transform="translate(11 11)" fill="#e9ebff"/>
	</g>
  </svg>
  </li>
  `;
};
