/**
 * Created by Cchiv on 06/06/2017.
 */
var content = document.getElementsByClassName("content-block");
var contentLength = content.length;

for(var i = 0; i < contentLength; i++) {
    content[i].addEventListener("mouseover", function (event) {
        document.body.style.overflow = "hidden";
    });
    content[i].addEventListener("mouseout", function (event) {
        document.body.style.overflow = "auto";
    });
}