"use strict";

(function() {
   window.onload = function() {
      // init and main wiring
      localStorage.removeItem(curr_post);

      // login button
      $("#login").click(function() {
         window.location = "webpages/login.html";
      });

      $("#home").click(function() {
         window.location = "./main.html"
      })

      // // Authorized users can create/edit posts.
      if (localStorage.getItem(has_auth) != null) {
         let postButton = $("<div>", {
            "class": "nav-pane-item",
            "id": "make_post"
         }).text("new post").click(function() {
            window.location = "webpages/newedit.html"
         }).appendTo(".nav-pane");
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
      var postNum = jsonData.length;
      jsonData.forEach(function(singlePost) {
         let postContainer = $("<div>", {"class": "container"});
         $("<div>", {"class": "post-bullet"}).append(
            $("<div>", {"class": "post-number"}).text(postNum),
            $("<i>", {"class": "fa fa-cube"})
         ).appendTo(postContainer);

         let entry = $("<div>", {
            "class": "entry",
            id: singlePost.id
         });
         if (singlePost.draftmode) {
            entry.addClass("draft");
         }
         $("<div>", {"class": "title"}).text(singlePost.title).click(function() {
            view(singlePost.id);
         }).appendTo(entry);
         $("<div>", {"class": "created"}).text(moment(singlePost.created).fromNow()).appendTo(entry);
         $("<div>", {"class": "tags"}).text(singlePost.tags).appendTo(entry);
         postContainer.append(entry);
         // admin only fields
         if (localStorage.getItem(has_auth)) {
            //$("<div>", {"class": "draftmode"}).text(singlePost.draftmode).appendTo(entry);
            //$("<div.views>").text(singlePost.views).appendTo(entry);
            //$("<div>", {"class": "publish"}).text(singlePost.publish).appendTo(entry);
            $("<div>", {"class": "edit"}).text("edit").click(function() {
               edit(singlePost.id);
            }).appendTo(postContainer);
         }

         $("#posts-pane").prepend(postContainer);
         postNum--;
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
