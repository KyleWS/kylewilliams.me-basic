"use strict";

(function() {
   window.onload = function() {
      $("#login-submit").click(function() {
         localStorage.setItem("authorization", $("#token-input").val());
         window.location = "../main.html";
      });
   }
})();
