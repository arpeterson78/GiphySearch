// create an array of items
var categories = ["Stranger Things", "The Office", "Arrested Development", "Game of Thrones", "Drunk History", "Broad City", "It's Always Sunny in Phildadelphia", "Chapelle's Show", "Curb Your Enthusiasm", "Archer", "Parks and Recreation", "Chef's Table", "The Eric Andre Show", "Atlanta", "Modern Family", "Trailer Park Boys", "Portlandia", "Breaking Bad", "Top Gear"];
// link up a search function to this array and push new item array
function displayShowGif() {
    
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T7LBrazwN1QZljB51nXjUinlVV9Ch12m&q=" + show + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        // var showDiv = $("<div class='show'>");
        var showDiv = $("<div>");

        for (var i = 0; i < response.data.length; i++) {
            console.log(response)
            var rating = response.data[i].rating;
            var ratingText = $("<p>").text("Gif rated:" + rating);
            showDiv.append(ratingText);

            var gif = response.data[i].images.fixed_height_still.url;
            var gifMedia = $("<img>").attr("src", gif);
            gifMedia.attr("data-state", "still");
            gifMedia.attr("data-animated", response.data[i].images.fixed_height.url);
            gifMedia.attr("data-still", gif);
            
            showDiv.append(gifMedia);

            $("#shows").empty();
            $("#shows").append(showDiv);

            
    }
    $("img").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    
    
    });

        renderButtons();
    });
}







function renderButtons() {
    $("#show-buttons").empty();
    for (var i = 0; i < categories.length; i++) {
        var a = $("<button>");
        a.addClass("show btn");
        a.attr("data-name", categories[i]);
        a.text(categories[i]);
        $("#show-buttons").append(a);
    }
}

$("#add-show").on("click", function (event) {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    categories.push(show);
    $("#show-input").val("");
    renderButtons();


});



$(document).on("click", ".show", displayShowGif);



renderButtons();
