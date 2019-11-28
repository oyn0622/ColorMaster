var r = 1,
  g = 1,
  b = 1;

const palette = document.getElementById("palette");
/*const control_window = document.getElementsByClassName("control_window");
const rangeBox = document.getElementsByClassName("rangeBox");

const r_value = document.getElementById("r_value");
const r_text = document.getElementById("r_text");
const g_value = document.getElementById("g_value");
const g_text = document.getElementById("g_text");
const b_value = document.getElementById("b_value");
const b_text = document.getElementById("b_text");
*/

// vars
var img = _(".thumbnail img"),
  canvas = _("#cs"),
  preview = _(".preview"),
  x = "",
  y = "";

// click function
img.addEventListener(
  "click",
  function(e) {
    // chrome
    if (e.offsetX) {
      x = e.offsetX;
      y = e.offsetY;
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX;
      y = e.layerY;
    }
    useCanvas(canvas, img, function() {
      // get image data
      var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;

      // show info

      // add background in body

      addColorBox(p[0], p[1], p[2]);
    });
  },
  false
);

// preview function mousemove
img.addEventListener(
  "mousemove",
  function(e) {
    // chrome
    if (e.offsetX) {
      x = e.offsetX;
      y = e.offsetY;
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX;
      y = e.layerY;
    }

    useCanvas(canvas, img, function() {
      // get image data
      var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
      // show preview color
      preview.style.background = rgbToHex(p[0], p[1], p[2]);
    });
  },
  false
);

// canvas function
function useCanvas(el, image, callback) {
  el.width = image.width; // img width
  el.height = image.height; // img height
  // draw image in canvas tag
  el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
  return callback();
}
// short querySelector
function _(el) {
  return document.querySelector(el);
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function addColorBox(r, g, b) {
  const entire = document.createElement("div");
  entire.id = "colorContainer"; //전체

  const newControlWindow = document.createElement("div"); //색깔 박스
  newControlWindow.className = "control_window";
  newControlWindow.style.backgroundColor = rgbToHex(r, g, b);

  const colorInfo = document.createElement("div"); //색깔 결과
  colorInfo.className = "result";
  colorInfo.innerHTML = `<span>HEX: ${rgbToHex(
    r,
    g,
    b
  )}</span><span>RGB: rgb(${r},${g},${b})</span>`;

  const rangeBox = document.createElement("div"); //r,g,b bar 있는 박스
  rangeBox.className = "rangeBox";

  const RBox = document.createElement("div");
  //bar
  const RedbarWindow = document.createElement("input"); //r bar
  RedbarWindow.setAttribute("type", "range");
  RedbarWindow.setAttribute("class", "r_value");
  RedbarWindow.max = 255;
  RedbarWindow.value = r;

  const Redvalue = document.createElement("span"); //r bar 옆 글씨
  Redvalue.setAttribute("class", "r_text");
  Redvalue.innerHTML = `R: ${RedbarWindow.value}`;

  RBox.appendChild(RedbarWindow);
  RBox.appendChild(Redvalue);

  const GBox = document.createElement("div");

  const GreenbarWindow = document.createElement("input");
  GreenbarWindow.setAttribute("type", "range");
  GreenbarWindow.setAttribute("class", "g_value");
  GreenbarWindow.max = 255;
  GreenbarWindow.value = g;

  const Greenvalue = document.createElement("span");
  Greenvalue.setAttribute("class", "g_text");
  Greenvalue.innerHTML = `G: ${GreenbarWindow.value}`;

  GBox.appendChild(GreenbarWindow);
  GBox.appendChild(Greenvalue);

  const BBox = document.createElement("div");

  const BluebarWindow = document.createElement("input");
  BluebarWindow.setAttribute("type", "range");
  BluebarWindow.setAttribute("class", "b_value");
  BluebarWindow.max = 255;
  BluebarWindow.value = b;

  const Bluevalue = document.createElement("span");
  Bluevalue.setAttribute("class", "b_text");
  Bluevalue.innerHTML = `B: ${BluebarWindow.value}`;

  BBox.appendChild(BluebarWindow);
  BBox.appendChild(Bluevalue);

  rangeBox.appendChild(RBox);
  rangeBox.appendChild(GBox);
  rangeBox.appendChild(BBox);

  entire.appendChild(newControlWindow);
  entire.appendChild(colorInfo);
  entire.appendChild(rangeBox);
  palette.appendChild(entire);

  RedbarWindow.addEventListener("input", function() {
    const r = parseInt(this.value);
    const g = parseInt(GreenbarWindow.value);
    const b = parseInt(BluebarWindow.value);
    const hex = rgbToHex(r, g, b);
    Redvalue.innerHTML = `R: ${r}`;
    newControlWindow.style.backgroundColor = hex;
    colorInfo.innerHTML = `<span>HEX: ${hex}</span><span>RGB: rgb(${r},${g},${b})</span>`;
  });

  GreenbarWindow.addEventListener("input", function() {
    const r = parseInt(RedbarWindow.value);
    const g = parseInt(this.value);
    const b = parseInt(BluebarWindow.value);
    const hex = rgbToHex(r, g, b);
    Greenvalue.innerHTML = `G: ${g}`;
    newControlWindow.style.backgroundColor = hex;
    colorInfo.innerHTML = `<span>HEX: ${hex}</span><span>RGB: rgb(${r},${g},${b})</span>`;
  });

  BluebarWindow.addEventListener("input", function() {
    const r = parseInt(RedbarWindow.value);
    const g = parseInt(GreenbarWindow.value);
    const b = parseInt(this.value);
    const hex = rgbToHex(r, g, b);
    Bluevalue.innerHTML = `B: ${b}`;
    newControlWindow.style.backgroundColor = hex;
    colorInfo.innerHTML = `<span>HEX: ${hex}</span><span>RGB: rgb(${r},${g},${b})</span>`;
  });
}
