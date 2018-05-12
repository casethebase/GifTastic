/**Global Variables**/
var topics, newButton, newTopic, queryURL, sadboyName, results, sadDiv, rating, gifShow, state;

/**Starter array that holds hero items**/
topics = ["Macintosh Plus 420", "Vaporwave", "Simpsonwave", "Outrun", "Flamingosis", "Yung Lean", "A e s t h e t i c", "sadboys"];

/**Function to create buttons and clear buttons from screen on every reload**/
function makeButtons() {
	//Clears #buttons area for when new buttons are added
	$("#buttons").html("");

	//Loop through topics array to make each button
	for (var i=0; i<topics.length; i++) {
		newButton = $("<button>" + topics[i] + "</button>");
		newButton.attr("data-name", topics[i]);
		newButton.addClass("sadboys");
		$("#buttons").append(newButton);
	};
};

/**On-click event for adding new buttons**/
$("#add-sadboy").on("click", function(event){
	event.preventDefault();
	//Prevent blank user input from creating a new button
	if ($("#user-input").val() !== ""){
		//Take in user input and push to topics array
		//Also clear user input after value is stored
		newTopic = $("#user-input").val();
		$("#user-input").val("");
		topics.push(newTopic);
		makeButtons();
	}
});

/**Key-press event for adding new buttons from user input**/
$("#user-input").keypress(function(e){
	if (e.keyCode === 13 && $("#user-input").val() !== ""){
		//Take in user input and push to topics array
		//Also clear user input after value is stored
		newTopic = $("#user-input").val();
		$("#user-input").val("");
		topics.push(newTopic);
		makeButtons();
	}
})

/**Function for displaying gifs -- ajax request**/
function displayGifs(){
	//Clear #gifs area when new hero button is selected
	$("#gifs").html("");

	//Create queryURL using the name of the hero
	sadboyName = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sadboyName + "&api_key=wnwOhzKBAU126lrFL6GWPci6OB7w90hb&limit=5";
	
	//Ajax request
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		//Store response.data in a new variable
		results = response.data;

		//Loop to access each array in the returned object
		for(var j=0; j<results.length; j++){

			sadboyDiv = $("<div class='sadboy'>");
			$("#gifs").append(sadboyDiv);

			//Store and append rating information
			rating = $("<div>Rating: " + results[j].rating + "</div>");

			//Store and append gifs. Give attributes to gifs for toggling state later
			gifShow = $("<img data-state='still' src='" + results[j].images.fixed_height_still.url + "'>");
			gifShow.attr("data-still", results[j].images.fixed_height_still.url);
			gifShow.attr("data-animate", results[j].images.fixed_height.url);
			gifShow.addClass("gif");

			//Append gifs and their ratings to heroDiv
			sadboyDiv.append(rating);
			sadboyDiv.append(gifShow);
		};
	});
};

/**Function for start/stop gifs**/
function animateGif(){
	//Set state variable to whatever the data-state is of the selected gif
	state = $(this).attr("data-state");

	//Condition to toggle between still and animated states
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

/**Call functions for on-click events -- event delegation**/
makeButtons();
$(document).on("click", ".sadboys", displayGifs);
$(document).on("click", ".gif", animateGif);