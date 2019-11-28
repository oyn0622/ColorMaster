whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.req === `getImage`) {
    const img = document.querySelector("img");
    //console.log(img);
    sendResponse({ src: img.src });
  }
});
