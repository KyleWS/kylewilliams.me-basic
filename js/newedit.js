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

   };

   // functions
   function editFill(id) {
      $.ajax({
         url: API_ADDRESS + "/post/" + id,
         type: "GET",
         headers: {"Authorization": localStorage.getItem(has_auth)},
      }).then(function(data, status, xhr) {
         let parsedJson = JSON.parse(data);
         $(".ql-editor").html(parsedJson.body);
      });
   }
})();
