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
      // copying the title of the video

      // Find the yt-formatted-string element directly
      const titleElement = document.querySelector("#title yt-formatted-string");

      // Check if the title element is found and has text content
      if (titleElement && titleElement.textContent) {
        // Get the text content of the yt-formatted-string element
        const title = titleElement.textContent.trim();
        // alert(title);
        // Log the title
        // console.log("Title of the video:", title);

        // Set the title in the local storage
        // Set the title in local storage
        chrome.storage.local.set({ title: title }, () => {
          console.log("The title of the video is: " + title);
          // You can add any other code that depends on the title being stored successfully
        });

        // Retrieve the title from local storage
        chrome.storage.local.get(["title"], (result) => {
          console.log("The title of the video is: " + result.title);
          // You can add any code that needs to use the retrieved title here
        });
      } else {
        console.error("Title element not found or has no text content");
      }

      // like the video
      const buttonViewModel = document.querySelector("button-view-model");

      // Check if the button-view-model element is found
      if (buttonViewModel) {
        // Get the underlying button element
        const likeButton = buttonViewModel.querySelector("button");

        // Check if the like button is found
        if (likeButton) {
          // Simulate a click event on the like button
          likeButton.click();
        } else {
          console.error("Like button not found within button-view-model");
        }
      } else {
        console.error("button-view-model element not found");
      }

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
