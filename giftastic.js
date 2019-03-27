$(document).ready(function () {

    var gifArray = ["Cats", "Dogs", "Ouch"];

    function displayGifInfo() {

        var gif = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=pQLNJwaU6hjQ7tQ5Oewl52mK4Un9YMTS&limit=10&rating=pg-13";

        // Creating an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gifDiv = $("<div>");

            var Rating = response.data[i].rating;

            var pOne = $("<p>").text("Rating: " + Rating);

            gifDiv.append(pOne);

            var imgURL = response.data[i].url;

            var image = $("<img>").attr("src", imgURL);

            gifDiv.append(image);

            $("#buttons-view").prepend(gifDiv);
        });

    }

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < gifArray.length; i++) {

            var a = $("<button>");

            a.addClass("gif-btn");

            a.attr("data-name", gifArray[i]);

            a.text(gifArray[i]);

            $("#buttons-view").append(a);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        gifArray.push(gif);

        renderButtons();
    });

    $(document).on("click", ".gif-btn", displayGifInfo);

    renderButtons();
});