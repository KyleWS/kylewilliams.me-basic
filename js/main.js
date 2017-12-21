"use strict";

(function() {
   window.onload = function() {
      // initialization and main
      $("#login").click(function() {
         window.location = "https://" + API_ADDRESS + "/oauth/signin";
      });
   };


   // functions
})();


// var quill = new Quill('#editor', {
//   modules: {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] },
//       {size: ["small", false, "large", "huge"]}],
//       ['bold', 'italic', 'underline', 'strike'],
//       ['link', 'image', 'code-block'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//       [{ 'direction': 'rtl' }],
//       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//       [{ 'font': [] }],
//       [{ 'align': [] }]
//     ]
//   },
//   placeholder: 'Compose an epic...',
//   theme: 'snow'  // or 'bubble'
// });
