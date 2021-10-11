export const sliderCarousel = (sliderTimer) => {
  let items = document.querySelectorAll(".ma-comm-promo-carousel--item");
  let dots = document.querySelectorAll(
    ".ma-comm-promo-carousel--indicators li"
  );
  let currentItem = 0;
  let isEnabled = true;

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
  }

  function previousItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    showItem("from-left");
  }

  function goToItem(n) {
    if (n < currentItem) {
      hideItem("to-right");
      currentItem = n;
      showItem("from-left");
    } else {
      hideItem("to-left");
      currentItem = n;
      showItem("from-right");
    }
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    dots[currentItem].classList.remove("active--indicator");
    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("active", direction);
    });
  }

  function showItem(direction) {
    items[currentItem].classList.add("next", direction);
    dots[currentItem].classList.add("active--indicator");

    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("next", direction);
      this.classList.add("active");
      isEnabled = true;
    });
  }

  // document
  //   .querySelector(".ma-comm-promo-carousel--control.left")
  //   .addEventListener("click", function () {
  //     if (isEnabled) {
  //       previousItem(currentItem);
  //     }
  //   });

  // document
  //   .querySelector(".ma-comm-promo-carousel--control.right")
  //   .addEventListener("click", function () {
  //     if (isEnabled) {
  //       nextItem(currentItem);
  //     }
  //   });

  // document
  //   .querySelector(".ma-comm-promo-carousel--indicators")
  //   .addEventListener("click", function (e) {
  //     let target = [].slice
  //       .call(e.target.parentNode.children)
  //       .indexOf(e.target);
  //     console.log(e.target);
  //     if (target !== currentItem && target < dots.length) {
  //       goToItem(target);
  //     }
  //   });

  const indicators = [
    ...document.querySelectorAll(".ma-comm-promo-carousel--indicators li"),
  ];

  indicators.map((it, id) => {
    setTimeout(() => {
      if (it.classList[0] === "active--indicator-0") {
        it.classList.add("active--indicator");
      }
    }, 200);

    it.addEventListener("click", () => {
      goToItem(id);
    });
  });

  // setInterval(() => {
  //   nextItem(currentItem);
  // }, sliderTimer);
};
