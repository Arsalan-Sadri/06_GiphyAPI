// 
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
    btn.addClass("btn btn-primary btn-sm");
    btn.addClass("fetch-gif");
    $(".btn-row").append(btn);
}
//
var limit = 10;
$('button[type="submit"]').on("click", function (event) {
    event.preventDefault();

    var userLimit = $('input[name="limit-input"]').val().trim();
    var userLimitNum = parseInt(userLimit);
    if (userLimitNum > 0) limit = userLimitNum;
    $('input[name="limit-input"]').val("");

    var userInput = $('input[name="search-term"]').val().trim();
    if (userInput !== "") addBtn(userInput);
    $('input[name="search-term"]').val("");
})
//





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
// Adding click event listener
$(document.body).on("click", ".fetch-gif", function () {
    $(".col-sm-9").empty();
    // Grabbing and storing the data property value from the button
    var btnData = $(this).attr("btn-data");

    // Constructing a queryURL using the btnData name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        btnData + "&api_key=2MnPgQlfrGbyTj7jZyIqCk6SdjMeFSPE&limit=" + limit;

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            // storing the data from the AJAX request in the gifArr variable
            var gifArr = response.data;

            // Looping through each result item
            for (var i = 0; i < gifArr.length; i++) {

                // 
                var imgDiv = $("<div>").css({
                    "float": "left",
                    "padding": "10px"
                });

                // 
                var pTag = $("<p>").text("Rating: " + gifArr[i].rating);
                imgDiv.append(pTag);
                var pTag = $("<p>").text("Title: " + gifArr[i].title);
                imgDiv.append(pTag);
                // 
                var imgTag = $("<img>");
                // 
                imgTag.attr("static-URL", gifArr[i].images.fixed_height_still.url);
                imgTag.attr("animated-URL", gifArr[i].images.fixed_height.url);
                imgTag.attr("img-static", "True");
                imgTag.attr("src", gifArr[i].images.fixed_height_still.url);
                imgTag.addClass("img-class");

                imgDiv.append(imgTag);

                $(".col-sm-9").append(imgDiv);

            }
        });
});