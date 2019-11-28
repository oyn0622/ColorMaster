const body = document.querySelector("body");
const image = document.querySelector("img");
const canvas = document.querySelector("canvas");

const arr = [];
whale.sidebarAction.onClicked.addListener(result => {
  let dornot = 0;

  if (result.opened) {
    dornot = 1;
  }

  if (dornot) {
    getCurrentTab(function(tabs) {
      let activeTabId = tabs.id;
      whale.tabs.sendMessage(activeTabId, { req: `getImage` }, response => {
        const imgsrc = response.src;
        image.setAttribute("src", imgsrc);

        useCanvas(canvas, image, function() {
          const y = canvas.height / 2;
          let x = 0;
          for (x = 0; x < canvas.width; x += 25) {
            const pixeldata = canvas.getContext("2d").getImageData(x, y, 1, 1)
              .data;
            const [r, g, b] = pixeldata;
            arr.push(rgbToHex(r, g, b));
          }
          return arr;
        });

        const resultColor = countingArray(arr);
        makeResultBox(resultColor);
      });
    });
  }
});

async function getCurrentTab(tabcallback) {
  try {
    await whale.tabs.query({ active: true, currentWindow: true }, function(
      tabArray
    ) {
      tabcallback(tabArray[0]);
    });
  } catch (error) {
    console.error(error);
  }
}

function makeResultBox(result) {
  const hasColorBox = document.querySelector("#colorBox") === null;
  if (hasColorBox && result !== undefined) {
    const container = document.createElement("div");
    const contentBox = document.createElement("div");
    contentBox.id = "contentBox";
    contentBox.className = "showResultBox";
    contentBox.style.backgroundColor = result;
    const mainColor = document.createTextNode(`${result}`);
    contentBox.appendChild(mainColor);
    container.appendChild(contentBox);
    container.id = "colorBox";
    body.appendChild(container);
  } else if (!hasColorBox) {
    const contentBox = document.getElementById("contentBox");
    contentBox.style.backgroundColor = result;
    const textNode = contentBox.firstChild;
    textNode.nodeValue = `${result}`;
  }
}

function useCanvas(el, image, callback) {
  el.width = image.width;
  el.height = image.height;
  el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
  return callback();
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function countingArray(arr) {
  const arr_pixel = arr.reduce((acc, cur) => {
    acc.hasOwnProperty(cur) ? (acc[cur] += 1) : (acc[cur] = 1);
    return acc;
  }, {});

  const arr_value = Object.values(arr_pixel);
  arr_value.sort((a, b) => {
    return b - a;
  });

  const result = getMaximalPixel(arr_pixel, arr_value);

  return result;
}

function getMaximalPixel(obj, arr) {
  let a = arr[0];
  for (let prop in obj) {
    if ((prop === "#000000" || prop === "#ffffff") && obj[prop] === arr[0]) {
      a = arr[1];
    }
  }
  for (let prop in obj) {
    if (a === obj[prop]) return prop;
  }
}
