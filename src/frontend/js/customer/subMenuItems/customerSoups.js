
$( document ).ready(function()  {
    console.log("Ahoj customerSoups.js");
    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            console.log(response);
            var JsonObject = JSON.parse(response);
            for (var key in JsonObject) {
                console.log(JsonObject[key].type);
                // ak je jedno meal tak budeme appendovat
                if(JsonObject[key].type === "soups"){
                    $(".soupItems").append("<div class=\"soupItem\">\n" +
                        "                    <div class=\"mealNamePriceDescription\">\n" +
                        "                        <p class=\"mealNamePrice\"><b>"+JsonObject[key].description+"</b>....................................................."+JsonObject[key].price+" EUR</p>\n" +
                        "                        <p class=\"mealDescription\">("+JsonObject[key].ingredients+")</p>\n" +
                        "                    </div>\n" +
                        "                </div>" +
                        "                <br>");

                }
            }
            console.log("GET method");
        },
    });
});