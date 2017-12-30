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

      if (localStorage.getItem(has_auth) != null) {
         $("<div>", {id: "delete"}).text("Delete").click(function() {
            if(confirm("Are you sure you want to delete this post? It is permanent.")) {
               $.ajax({
                  url: API_ADDRESS + "/post/" + post,
                  type: "DELETE",
                  headers: {"Authorization": localStorage.getItem(has_auth)},
               }).then(function(data, status, xhr) {
                  window.location = "../main.html";
               });
            }
         }).appendTo("#admin-controls");
         $("#admin-controls").prepend($("<div>", {"class": "edit"}).text("edit").click(function() {
            window.location = "./newedit.html";
         }));
      }

      $("home").click(function() {
         window.location = "../main.html";
      });
   }

   function load(jsonData) {
      let content = $("<div>", {
         "id": "frame"
      }).appendTo("#view-post");
      let heading = $("<div>", {"class": "heading"}).appendTo("#frame");
      $("<i>", {"class": "fa fa-area-chart"}).click(function() {
         window.location = "../main.html";
      }).appendTo(heading);
      $("<div>", {"class": "title"}).text(jsonData.title).appendTo(heading);
      $("<div>", {"class": "tags"}).html("tags: <span id=\"tagSpan\">"+jsonData.tags+"</span>").appendTo("#frame");
      $("<div>", {"class": "body"}).html(jsonData.body).appendTo("#frame");
      $("<div>", {"class": "author"}).text("By: " + jsonData.author).appendTo("#frame");
      $("<div>", {"class": "created"}).text(moment(jsonData.created).format("MMM, DD YYYY")).appendTo("#frame");
      // add edited, published and so on alter
   }

})();
