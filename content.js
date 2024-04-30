chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "startProcess") {
    console.log("Process started from content.js");
    //sendResponse({ message: "Process started" });
    console.log("response sent from content.js");

    let videoSelector = document.querySelectorAll(
      "#thumbnail > yt-image > img"
    )[0];
    console.log("vido selector", videoSelector);
    videoSelector.click();

    setTimeout(function () {
      // Scroll
      window.scrollBy(0, 400);
      console.log("Scrolled");
      let subscribeButton = document.querySelector(
        "#subscribe-button-shape > button"
      );
      subscribeButton.click();
      // Wait for subscription action to complete
      // Wait for placeholder area to be available
      var placeholderInterval = setInterval(function () {
        var placeholder = document.getElementById("placeholder-area");
        if (placeholder) {
          clearInterval(placeholderInterval);
          placeholder.focus();
          placeholder.click();
          document.execCommand("insertText", true, "nice video");

          // Wait for submit button to be available
          var buttonInterval = setInterval(function () {
            var button = document.getElementById("submit-button");
            if (button) {
              clearInterval(buttonInterval);
              button.click();
            } else {
              console.log("Button with ID 'submit-button' not found.");
            }
          }, 1000); // Check every second for the submit button
        } else {
          console.log("Element with ID 'placeholder-area' not found.");
        }
      }, 1000); // Check every second for the placeholder area
    }, 3000); // Wait for 2 seconds after subscription click
  }
});
