"use strict";

setInterval(function() {
   $("#time").html(moment().format("YYYY-MM-DD hh:mm:ss a"));
}, 1000)

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
