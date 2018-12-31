(function app() {
  const triggers = document.querySelectorAll("nav > ul > li");
  const puppy = document.querySelector(".puppy");
  const coords = {
    x: "",
    y: "",
    width: "",
    height: ""
  };

  triggers.forEach(item => {
    item.addEventListener("mouseenter", function (e) {
      const dropdown = e.target.children[1];
      highlight(dropdown);
    })

    item.addEventListener("mouseleave", function () {
      puppy.style.height = "0px";
    })
  })

  function highlight(dropdown) {
    const coordObj = dropdown.getBoundingClientRect();
    const v_offset = window.scrollY;
    coords.x = `${Math.floor(coordObj.x) - 10}px`;
    coords.y = `${Math.floor(coordObj.y) - 5 + v_offset}px`;
    coords.width = `${Math.floor(coordObj.width + 20)}px`;
    coords.height = `${Math.floor(coordObj.height)}px`;
    puppy.style.height = coords.height;
    puppy.style.width = coords.width;
    puppy.style.transform = `translateX(${coords.x}) translateY(${coords.y}`;
  }
})();
