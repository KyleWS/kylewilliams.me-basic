"use strict";

(function() {
   window.onload = function() {
      // check if there is a post we should be editing
      var post = localStorage.getItem(curr_post)

      // Setting up the editor we want to have
      var quill = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] },
            {size: ["small", false, "large", "huge"]}],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }]
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
      });

      // check if a post is supposed to be edited.
      if (post != null) {
         editFill(post);
      }

      $("#submit").click(function() {
         if (post != null) {
            submitEditPost();
         } else {
            submitNewPost();
         }
      });
   };

   // functions
   function editFill(id) {
      $.ajax({
         url: API_ADDRESS + "/post/" + id,
         type: "GET",
         headers: {"Authorization": localStorage.getItem(has_auth)},
      }).then(function(data, status, xhr) {
         let parsedJson = JSON.parse(data);
         $("#title").val(parsedJson.title);
         $(".ql-editor").html(parsedJson.body);
         $("#tags").val(parsedJson.tags);
         $("#datetime").val(parsedJson.publish.substring(0, parsedJson.publish.length - 1));
      });
   }

   // Fields that can be submitted by user for new post
   // author, title, publish, draftmode, body, tags
   function submitNewPost() {
      let titleInput = $("#title").val();
      let bodyInput = $(".ql-editor").html();

      if (localStorage.getItem("OVERRIDE_TITLE_LENGTH")) {
         $("#error").text("WARNING: Override enabled");
      } else if (titleInput.length < 5) {
         $("#error").text("Title is too short. Must be at least 5 characters OR provide override");
         return;
      }
      if (localStorage.getItem("OVERRIDE_BODY_LENGTH")) {
         $("#error").text("WARNING: Override enabled");
      } else if (bodyInput.length < 100) {
         $("#error").text("Body is too short. Must be at least 100 characters OR provide override");
         return;
      }
      let tagsList = $("#tags").val().split(",");
      let newPostJson = {
         author: "KyleWS", // hard coding until users are more adequately integrated
         title: titleInput,
         draftmode: $("#draft")[0].checked,
         body: bodyInput,
         tags: tagsList
      }

      $.ajax({
         url: API_ADDRESS + "/post/",
         type: "POST",
         headers: {"Authorization": localStorage.getItem(has_auth)},
         dataType: "json",
         data: JSON.stringify(newPostJson)
      }).then(function(data, status, xhr) {
         if (status == "success") {
            $("#success").text(JSON.stringify(data));
         }
      }).catch(function(data) {
         console.log(data);
         $("#error").text(data.response);
      });
   }

   // fields that can be updated
   // title publish, draftmode, body, tags
   function submitEditPost() {

   }
})();
