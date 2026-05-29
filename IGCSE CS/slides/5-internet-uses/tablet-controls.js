(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function revealReady(callback) {
    onReady(function () {
      var attempts = 0;

      function check() {
        attempts += 1;

        if (window.Reveal && typeof window.Reveal.isReady === "function" && window.Reveal.isReady()) {
          callback(window.Reveal);
          return;
        }

        if (window.Reveal && typeof window.Reveal.on === "function") {
          window.Reveal.on("ready", function () {
            callback(window.Reveal);
          });
          return;
        }

        if (attempts < 60) {
          window.setTimeout(check, 200);
        }
      }

      check();
    });
  }

  function requestFullscreen() {
    var el = document.documentElement;
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
    return Promise.resolve();
  }

  function exitFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
    return Promise.resolve();
  }

  function inFullscreen() {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function updateFullscreenButton(button) {
    if (!button) return;
    if (inFullscreen()) {
      button.textContent = "退出";
      button.setAttribute("aria-label", "退出全屏");
      button.setAttribute("title", "退出全屏");
    } else {
      button.textContent = "全屏";
      button.setAttribute("aria-label", "进入全屏");
      button.setAttribute("title", "进入全屏");
    }
  }

  revealReady(function (Reveal) {
    var deck = document.querySelector(".reveal");
    if (!deck) {
      return;
    }

    deck.classList.add("tablet-mode");

    var fullscreenButton = document.createElement("button");
    fullscreenButton.type = "button";
    fullscreenButton.className = "tablet-fullscreen-toggle";
    updateFullscreenButton(fullscreenButton);
    fullscreenButton.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      if (inFullscreen()) {
        exitFullscreen().finally(function () {
          updateFullscreenButton(fullscreenButton);
        });
      } else {
        requestFullscreen().finally(function () {
          updateFullscreenButton(fullscreenButton);
        });
      }
    });
    deck.appendChild(fullscreenButton);

    var prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "tablet-nav-toggle tablet-prev-toggle";
    prevButton.textContent = "‹";
    prevButton.setAttribute("aria-label", "返回上一页");
    prevButton.setAttribute("title", "返回上一页");
    prevButton.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      Reveal.prev();
    });
    deck.appendChild(prevButton);

    var nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "tablet-nav-toggle tablet-next-toggle";
    nextButton.textContent = "›";
    nextButton.setAttribute("aria-label", "前进到下一页");
    nextButton.setAttribute("title", "前进到下一页");
    nextButton.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      Reveal.next();
    });
    deck.appendChild(nextButton);

    document.addEventListener("fullscreenchange", function () {
      updateFullscreenButton(fullscreenButton);
    });
    document.addEventListener("webkitfullscreenchange", function () {
      updateFullscreenButton(fullscreenButton);
    });
    document.addEventListener("msfullscreenchange", function () {
      updateFullscreenButton(fullscreenButton);
    });
  });
})();
