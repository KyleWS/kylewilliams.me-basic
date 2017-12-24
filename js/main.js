"use strict";

(function() {
   window.onload = function() {
      // init and main wiring
      localStorage.removeItem(curr_post);

      // login button
      $("#login").click(function() {
         window.location = "webpages/login.html";
      });

      // // Authorized users can create/edit posts.
      if (localStorage.getItem(has_auth) != null) {
         let postButton = $("<div>", {
            class: "left-pane-item",
            id: "make_post"
         }).text("new post").click(function() {
            window.location = "webpages/newedit.html"
         }).appendTo("#left-pane");
      }

      $.ajax({
         url: API_ADDRESS + "/all",
         type: "GET",
         headers: {"Authorization": localStorage.getItem(has_auth)},
      }).then(function(data, status, xhr) {
         insertPosts(JSON.parse(data));
      });
   };


   // functions
   function insertPosts(jsonData) {
      jsonData.forEach(function(singlePost) {
         let entry = $("<div>", {
            class: "entry",
            id: singlePost.id
         }).click(function() {
            view(singlePost.id);
         });
         $("<div.title>").text(singlePost.title).appendTo(entry);
         $("<div.created>").text(singlePost.created).appendTo(entry);
         $("<div.tags>").text(singlePost.tags).appendTo(entry);
         // admin only fields
         if (localStorage.getItem(has_auth)) {
            $("<div.draftmode>").text(singlePost.draftmode).appendTo(entry);
            //$("<div.views>").text(singlePost.views).appendTo(entry);
            $("<div.publish>").text(singlePost.publish).appendTo(entry);
            $("<div.edit>").text("edit").click(function() {
               edit(singlePost.id);
            }).appendTo(entry);
         }
         $("#posts-pane").append(entry);
      });
   }

   function view(id) {
      localStorage.setItem(curr_post, id);
      window.location = "webpages/view.html";
   }

   function edit(id) {
      localStorage.setItem(curr_post, id);
      window.location = "webpages/newedit.html";
   }
})();
