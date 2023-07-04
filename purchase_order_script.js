import { flash } from "./helpers.js";
$(document).ready(function() {
  $('#orders_form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Serialize the form data - returns of json object of key - value pairs as request body
    var formData = $(this).serialize();
  
    // Make the AJAX POST request
    $.ajax({
      url: 'http://localhost:3000/orders',
      type: 'POST',
      data: formData,
      success: function(response) {
        // Handle the success response here
        flash(response.message);
      },
      error: function(xhr, status, error) {
        // Handle the error here
        console.log(error);
      }
    });
  });  
});
  