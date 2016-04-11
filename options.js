function save_options() {
  var usernamesVal = document.getElementById("usernames").checked;

  chrome.storage.sync.set({
    removeUsernames: usernamesVal
    
  }, function() {

    var status = document.getElementById("status");

    status.textContent = "Options saved.";

    setTimeout(function() {
      status.textContent = "";
    }, 1000);

  });
}

function restore_options() {
  chrome.storage.sync.get({
    removeUsernames: false
    
  }, function(items) {
    document.getElementById("usernames").checked = items.removeUsernames;
  });
}

document.addEventListener("DOMContentLoaded", restore_options);

document.getElementById("save").addEventListener("click",
    save_options);