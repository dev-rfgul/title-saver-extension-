var startBtn = document.getElementById("startProcess");
console.log("start btn received")
startBtn.addEventListener("click", function () {
console.log("start btn clicked")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "startProcess" },
      function (response) {
        console.log("Response from content script:", response);
      }
    );
  });
}); 


