
let topics = ["I'm Out", "Falling", "Simpsons", "LOL", "Puppies"];

$(document).ready(function() {
  
  function displayButtons() {
    for (let i = 0; i < topics.length; i++) {
      let newButton = $("<button>");
      newButton.addClass("btn btn-default topicBtn");
      newButton.attr("type", "button");
      newButton.append(topics[i]);
      newButton.attr("value", topics[i]);
      $("#newButtonDiv").append(newButton);

      console.log(topics);
    }
  }
  debugger;
  displayButtons();

  function getGifs(topic) {
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=pQLNJwaU6hjQ7tQ5Oewl52mK4Un9YMTS&limit=10";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.data);
      addImages(response);
    });
  }

  function addImages(response) {
    $("#imageHolder").empty();

    for (let j = 0; j < response.data.length; j++) {
      let newGif = $("<img>");
      newGif.addClass("newGifs img-thumbnail grid-item");
      newGif.attr("src", response.data[j].images.fixed_width_still.url);
      newGif.attr("data-state", "still");
      newGif.attr("data-still", response.data[j].images.fixed_width_still.url);
      newGif.attr("data-animate", response.data[j].images.fixed_width.url);

      let gifRating = $("<p>");
      gifRating.append("Rating: " + response.data[j].rating);

      let gifPlusRating = $("<div>");
      gifPlusRating.append(newGif, gifRating);
      gifPlusRating.addClass("grid-item");
      $("#imageHolder").append(gifPlusRating);
    }
  }

  $(document).on("click", ".newGifs", function() {
    let state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: 950,
    isFitWidth: true
  });

  $(document).on("click", ".topicBtn", function() {
    console.log("click");
    getGifs($(this).attr("value"));
    console.log($(this).attr("value"));
  });

  $("#searchBtn").on("click", function() {
    event.preventDefault();

    let searchWord = $(".form-control").val();
    console.log(searchWord);
    $(".form-control").empty();

    topics.push(searchWord);
    $("#newButtonDiv").empty();
    displayButtons();
    getGifs(searchWord);

  });

});