let TxtType = function (a, b, c) {
  (this.toRotate = b),
    (this.el = a),
    (this.loopNum = 0),
    (this.period = parseInt(c, 10) || 2e3),
    (this.txt = ""),
    this.tick(),
    (this.isDeleting = !1);
};
function handleTypingAnimation() {
  let b = document.getElementsByClassName("typewrite");
  for (let a = 0; a < b.length; a++) {
    let c = b[a].getAttribute("data-type"),
      e = b[a].getAttribute("data-period");
    c && new TxtType(b[a], JSON.parse(c), e);
  }
  let d = document.createElement("style");
  (d.type = "text/css"), document.body.appendChild(d);
}
function handleQRCodeOnClick() {
  document.getElementById("qr-code").addEventListener("click", function () {
    window.open("https://saweria.co/motaufiqurohman", "_blank");
  });
}
function handleLinkSosmedOnClick() {
  document.querySelectorAll(".link-sosmed").forEach(function (a, b) {
    a.addEventListener("click", function (a) {
      window.open(this.dataset.website_link, "_blank");
    });
  });
}
function isMobileDevice() {
  return [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ].some((a) => navigator.userAgent.match(a));
}
function setYearCopyright() {
  document.getElementById("year").innerText = new Date().getFullYear();
}
let state = 0;
function handleStartTypingAnimation() {
  if (isMobileDevice) {
    let a = document.querySelector(".typewrite");
    isInViewport(a) && 0 === state
      ? (handleTypingAnimation(), (state = 1))
      : document.addEventListener("scroll", function () {
          isInViewport(a) &&
            0 === state &&
            (handleTypingAnimation(), (state = 1));
        });
  } else handleTypingAnimation();
}
function isInViewport(b) {
  let a = b.getBoundingClientRect();
  return (
    a.top >= 0 &&
    a.left >= 0 &&
    a.bottom + 200 <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    a.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
(TxtType.prototype.tick = function () {
  let c = this.loopNum % this.toRotate.length,
    b = this.toRotate[c];
  this.isDeleting
    ? (this.txt = b.substring(0, this.txt.length - 1))
    : (this.txt = b.substring(0, this.txt.length + 1)),
    (this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>");
  let d = this,
    a = 150 - 100 * Math.random();
  this.isDeleting && (a /= 6),
    this.isDeleting || this.txt !== b
      ? this.isDeleting &&
        "" === this.txt &&
        ((this.isDeleting = !1), this.loopNum++, (a = 0))
      : ((a = this.period), (this.isDeleting = !0)),
    setTimeout(function () {
      d.tick();
    }, a);
}),
  (window.onload = function () {
    setYearCopyright(),
      handleLinkSosmedOnClick(),
      handleQRCodeOnClick(),
      handleStartTypingAnimation();
  });
