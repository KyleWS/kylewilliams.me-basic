"use strict";

(function() {
   var post = localStorage.getItem(curr_post)
   window.onload = function() {
      if (post == null) {
         window.location = "../main.html";
      }

      $.ajax({
         url: API_ADDRESS + "/post/" + post,
         type: "GET",
         headers: {"Authorization": localStorage.getItem(has_auth)},
      }).then(function(data, status, xhr) {
         load(JSON.parse(data));
      });
   }

   function load(jsonData) {
      console.log(jsonData);
      let content = $("<div>", {
         id: "frame"
      }).appendTo("#view-post");
      $("<div.title>").text(jsonData.title).appendTo("#frame");
      $("<div.author>").text(jsonData.author).appendTo("#frame");
      $("<div.body>").html(jsonData.body).appendTo("#frame");
      $("<div.tags>").text(jsonData.tags).appendTo("#frame");
      $("<div.created>").text(jsonData.created).appendTo("#frame");
   }

})();
