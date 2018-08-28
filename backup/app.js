var topicsArr = [
    "Washington DC", "Chicago", "Los Angeles", "Vancouver", "Toronto", "London", "Berlin", "Budapest",
    "Vienna", "Tehran", "Hong Kong", "Grand Canyon", "Paris", "Istanbul", "Dubai", "Barcelona",
    "The Sahara", "Amazon Rainforest", "Yosemite", "Niagara Falls", "Persepolis"
];
// Page initialization
for (i = 0; i < topicsArr.length; i++) {
    addBtn(topicsArr[i]);
}
//
function addBtn(topic) {
    var btn = $("<button>").text(topic);
    btn.attr("btn-data", topic);
    btn.addClass("fetch-gif");
    $(".btnRow").append(btn);
}
//
$('button[type="submit"]').on("click", function (event) {
    event.preventDefault();
    var userInput = $("input").val().trim();
    if (userInput !== "") addBtn(userInput);
    $("input").val("");

})
// 
$(document.body).on("click", ".img-class", function () {
    if ($(this).attr("img-static") === "True") {
        $(this).attr("src", $(this).attr("animated-URL"));
        $(this).attr("img-static", "false");
    } else {
        $(this).attr("src", $(this).attr("static-URL"));
        $(this).attr("img-static", "True");
    }
});
// Adding click event listener to all buttons
$(document.body).on("click", ".fetch-gif", function () {
    $(".col-left").empty();
    // Grabbing and storing the data property value from the button
    var btnData = $(this).attr("btn-data");

    // Constructing a queryURL using the btnData name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        btnData + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the gifArr variable
            var gifArr = response.data;

            // Looping through each result item
            for (var i = 0; i < gifArr.length; i++) {

                // Creating and storing a div tag
                var imgDiv = $("<div>").css({
                    "float": "left",
                    "padding": "10px"
                });

                // Creating a paragraph tag with the result item's rating
                var pTag = $("<p>").text("Rating: " + gifArr[i].rating);

                // Creating and storing an image tag
                var imgTag = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                imgTag.attr("static-URL", gifArr[i].images.fixed_height_still.url);
                imgTag.attr("animated-URL", gifArr[i].images.fixed_height.url);
                imgTag.attr("img-static", "True");
                imgTag.attr("src", gifArr[i].images.fixed_height_still.url);
                imgTag.addClass("img-class");


                // Appending the paragraph and image tag to the imgDiv
                imgDiv.append(pTag);
                imgDiv.append(imgTag);

                // Prependng the imgDiv to the HTML page in the ".col-left" div
                $(".col-left").append(imgDiv);

            }
        });
});