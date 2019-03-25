$(document).ready( function () {

// Initial array of movies
var emotions = [{Text: "Happy", emoji: 	0x1F600}, 
                {Text: "Sad", emoji: 	0x1F641}, 
                {Text: "Angry", emoji: 0x1F620}, 
                {Text: "Excited", emoji: 0x1F603}, 
                {Text: "Crying", emoji: 0x1F622}, 
                {Text: "In Love", emoji: 0x1F60D}, 
                {Text: "So So", emoji: 0x1F610}, 
                {Text: "Feeling Sick", emoji: 0x1F912}, 
                {Text: "Surprised", emoji: 0x1F627}, 
                {Text: "Confused", emoji: 	0x1F615}, 
                {Text: "Overwhelmed", emoji: 0x1F92F}, 
                {Text: "Livid", emoji: 0x1F624}, 
                {Text: "Feeling Hot", emoji: 0x1F975}, 
                {Text: "Feeling Cold", emoji: 0x1F976}, 
                {Text: "Anxious", emoji: 0x1F630}, 
                {Text: "Worried", emoji: 0x1F61F}];


//displayGiphyInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {
    var emotion = $(this).attr("data-name");

    var APIKey = "Ol5iUXwCBKWPanUd70oXQLBki4s7hzoU";
    var limit = "10";
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=" + APIKey + "&limit=" + limit;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var emotionDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var emotionImage = $("<img>");
            emotionImage.addClass("gif");
            // Setting the src attribute of the image to a property pulled off the result item
            emotionImage.attr("src", results[i].images.fixed_height_still.url);

            emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
            emotionImage.attr("data-animate", results[i].images.fixed_height.url);
            emotionImage.attr("data-state", "still");
            console.log(emotionImage);

            // Appending the paragraph and image tag to the emotionDiv
            emotionDiv.append(p);
            emotionDiv.append(emotionImage);

            // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-output").prepend(emotionDiv);
        }

        $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            console.log("working");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        });
    });

  }



      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < emotions.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("emotion-btn btn btn-outline-primary");
          // Adding a data-attribute
          a.attr("data-name", emotions[i].Text);
          // Providing the initial button text
          a.text(String.fromCodePoint(emotions[i].emoji));
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      function renderNewButtons() {
        $("#new-buttons-view").empty();
        for (var i = 16; i < emotions.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("emotion-btn btn btn-outline-primary");
            // Adding a data-attribute
            a.attr("data-name", emotions[i]);
            // Providing the initial button text
            a.text(emotions[i]);
            // Adding the button to the buttons-view div
            $("#new-buttons-view").append(a);
          }
      }

   // This function handles events where a movie button is clicked
   $("#submit-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var emotion = $("#emotion-input").val().trim();

    // Adding movie from the textbox to our array
    emotions.push(emotion);

    // Calling renderButtons which handles the processing of our movie array
    renderNewButtons();
  });

   // Adding a click event listener to all elements with a class of "emotion-btn"
   $(document).on("click", ".emotion-btn", displayGiphyInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});