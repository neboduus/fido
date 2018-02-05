$(".img-button").on("click", function(){

    // Get the path to the selected image
    var imgPath = $(this).find('img').attr("src");

    // (New) Update the index reference
    imageIndex = imageLookup[imgPath];

    // Update the image in the popup
    $(".modal-content img").attr({"src":imgPath});

    // Get the caption text
    var caption = $(this).find(".caption p").html();

    // Update the caption in the popup
    $(".modal-content .popup-caption p").html(caption);
});

//********************
// Keep track of images in the grid:

var images = [];
var imageIndex = 0;
var imagesTotal = 0;
var imageLookup = {};

$.each($(".img-button"), function(key, val)
{
    var image = $(val).find("img").attr("src");
    var caption = $(val).find(".caption p").html();

    console.log("image = "+image+", imageLookup[image] = "+imageLookup[image]);

    imageLookup[image] = imagesTotal;
    images.push({src:image, caption:caption});
    imagesTotal++;
    window.scrollBy(0, 50)
});

//********************
// Paging:

function showNextImage( trueForNext )
{
    // Find index
    if( trueForNext ){
        imageIndex++;
        if( imageIndex == imagesTotal ){
            imageIndex = 0;
        }
    }else{
        imageIndex--;
        if( imageIndex < 0 ){
            imageIndex = imagesTotal - 1;
        }
    }
    // Update the CSS to show the image
    $(".modal-content img").attr({"src":images[imageIndex].src});

    // Update the caption in the popup
    $(".modal-content .popup-caption p").html(images[imageIndex].caption);
}

//********************
// Events:

// Respond to prev and next buttons

$("#prev-button").on("click", function(){

    showNextImage(false);
});
$("#next-button").on("click", function(){

    showNextImage(true);
});

// Respond to keyboard arrow navigation

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            showNextImage(false);
            break;
        case 39: // right
            showNextImage(true);
            break;
        default: return; 
    }
    e.preventDefault();
});
