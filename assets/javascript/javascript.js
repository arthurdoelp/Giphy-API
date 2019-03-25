$(document).ready( function () {

// Initial array of emotions
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
    // Constructing a queryURL using the emotion, api key and limit
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=" + APIKey + "&limit=" + limit;

    // Creating an AJAX call for the specific emotion button (emoji) being clicked
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

            // Prependng the emotionDiv to the HTML page in the "#gif-output" div
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



      // Function for displaying buttons
      function renderButtons() {

        // Deleting the emotions prior to adding new emotions
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of emotions (its a rollercoster of emotion. ha ha)
        for (var i = 0; i < emotions.length; i++) {

          // Then dynamicaly generating buttons for each emotion in the array
          var a = $("<button>");
          // Adding a class of emotion-btn, btn, btn-outline-primary to our button
          a.addClass("emotion-btn btn btn-outline-primary");
          // Adding a data-attribute
          a.attr("data-name", emotions[i].Text);
          // Providing the initial button text by converting the unicode values in each object in the array throught the string.fromcodepoint method
          a.text(String.fromCodePoint(emotions[i].emoji));
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      //I know the newly created buttons should be in the same div of buttons that previously exist but to get the emojis to work for the prexisting button and not affect the newly created buttons I needed to used seperate functions to generate the new buttons
      //This function generates any buttons created by the user through the input text
      function renderNewButtons() {
        //empty out the new-buttons-view div
        $("#new-buttons-view").empty();
        //for the all of the buttons added to the array after the original buttons were created will fall under this for loop (so every button created after the 16th button)
        for (var i = 16; i < emotions.length; i++) {

            // Then dynamicaly generating buttons for each new button in the array
            var a = $("<button>");
            // Adding a class of emotion-btn btn btn-outline-primary to our button (bootstrap buttons)
            a.addClass("emotion-btn btn btn-outline-primary");
            // Adding a data-attribute
            a.attr("data-name", emotions[i]);
            // Providing the initial button text
            a.text(emotions[i]);
            // Adding the button to the buttons-view div
            $("#new-buttons-view").append(a);
          }
      }

   // This function handles events where an emotion button is clicked
   $("#submit-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var emotion = $("#emotion-input").val().trim();

    // Adding emotion from the textbox to our array
    emotions.push(emotion);

    // Calling renderButtons which handles the processing of our emotion array
    renderNewButtons();
  });

   // Adding a click event listener to all elements with a class of "emotion-btn"
   $(document).on("click", ".emotion-btn", displayGiphyInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});