/**
 * Created by Cchiv on 27/06/2017.
 */
/* Icons */
var power_selectors = document.getElementsByClassName("power-description");

/* Template */
var container = document.querySelector(".content-showcase-grid");

/* Template */
var content_template = document.querySelector(".content-showcase-body-template");
var content_info = document.querySelector(".content-showcase-body-info-template");

/* JSON*/
var content_JSON = [
    [
    {
        "content-header" : "COLORS",
        "content-body" : [
            {
                "content-body-title" : "RGBa",
                "content-body-info" : "",
                "content-body-snippet" : "rgba(150, 150, 150, 0.5);"
            }
        ]
    }, {
        "content-header" : "FONTS",
        "content-body" : [
            {
                "content-body-title" : "Fallback Fonts",
                "content-body-info" : "",
                "content-body-snippet" : "font-family: Garamond, Times, serif;"
            }, {
                "content-body-title" : "Line Height",
                "content-body-info" : "",
                "content-body-snippet" : "line-height: 1.5em;"
            }, {
                "content-body-title" : "Word Spacing",
                "content-body-info" : "",
                "content-body-snippet" : "word-spacing: 0.3em;"
            }, {
                "content-body-title" : "Letter Spacing",
                "content-body-info" : "",
                "content-body-snippet" : "letter-spacing: 0.3em;"
            }
        ]
    }, {
        "content-header" : "BOX MODEL",
        "content-body" : [
            {
                "content-body-title" : "Min/Max",
                "content-body-info" : "",
                "content-body-snippet" : "min-width: 300px;"
            }, {
                "content-body-title" : "Overflow",
                "content-body-info" : "",
                "content-body-snippet" : "overflow: scroll/hidden;"
            }
        ]
    }, {
        "content-header" : "BORDERS",
        "content-body" : [
            {
                "content-body-title" : "Border Style",
                "content-body-info" : "",
                "content-body-snippet" : "border-style: solid/dashed/dotted;"
            }, {
                "content-body-title" : "Shorthand",
                "content-body-info" : "",
                "content-body-snippet" : "border: 3px solid rgb(22, 77, 100);"
            }, {
                "content-body-title" : "Border Radius",
                "content-body-info" : "",
                "content-body-snippet" : "border-radius: 5px;"
            }
        ]
    }, {
        "content-header" : "CONTENT",
        "content-body" : [
            {
                "content-body-title" : "Margin Auto",
                "content-body-info" : "",
                "content-body-snippet" : "margin: auto;(centering elements)"
            }, {
                "content-body-title" : "Resetting Default",
                "content-body-info" : "",
                "content-body-snippet" : "* { margin: 0; padding: 0; };"
            }, {
                "content-body-title" : "Display",
                "content-body-info" : "",
                "content-body-snippet" : "display: inline/inline-block/block;"
            }, {
                "content-body-title" : "Visibility",
                "content-body-info" : "",
                "content-body-snippet" : "visibility: hidden/none/visible;"
            }
        ]
    }, {
        "content-header" : "CHANGING THE BOX MODEL",
        "content-body" : [
            {
                "content-body-title" : "Box Sizing",
                "content-body-info" : "",
                "content-body-snippet" : "* { box-sizing: border-box; }"
            }
        ]
    }, {
        "content-header" : "Layout",
        "content-body" : [
            {
                "content-body-title" : "Position",
                "content-body-info" : "",
                "content-body-snippet" : "position: static/relative/absolute/fixed;"
            }, {
                "content-body-title" : "Offset Properties",
                "content-body-info" : "",
                "content-body-snippet" : "top/right/bottom/left: 20px;"
            }, {
                "content-body-title" : "Z-index",
                "content-body-info" : "",
                "content-body-snippet" : "z-index: 1/2/3/...;"
            }, {
                "content-body-title" : "Float",
                "content-body-info" : "",
                "content-body-snippet" : "float: left/right;"
            }, {
                "content-body-title" : "Clear",
                "content-body-info" : "",
                "content-body-snippet" : "clear: left/right/both/none;"
            }
        ]
    }, {
        "content-header" : "Adding Images",
        "content-body" : [
            {
                "content-body-title" : "Box Sizing",
                "content-body-info" : "",
                "content-body-snippet" : "* { box-sizing: border-box; }"
            }, {
                "content-body-title" : "Centering Images",
                "content-body-info" : "",
                "content-body-snippet" : "display: block; margin: 0px auto;"
            }, {
                "content-body-title" : "Images",
                "content-body-info" : "",
                "content-body-snippet" : "background-image: url(\"your-link-here\");"
            }, {
                "content-body-title" : "Repeat",
                "content-body-info" : "",
                "content-body-snippet" : "background-repeat: repeat/repeat-x/repeat-y/no-repeat;"
            }, {
                "content-body-title" : "Position",
                "content-body-info" : "",
                "content-body-snippet" : "background-position: center;"
            }, {
                "content-body-title" : "Shorthand",
                "content-body-info" : "",
                "content-body-snippet" : "background: url(\"link\") no-repeat center;"
            }, {
                "content-body-title" : "Size",
                "content-body-info" : "",
                "content-body-snippet" : "background-size: cover/contain;"
            }, {
                "content-body-title" : "Linear gradient",
                "content-body-info" : "",
                "content-body-snippet" : "background-image: -webkit-linear-gradient(#666CCC, #BC1324);"
            }
        ]
    }
],
    [
        {
            "content-header" : "GENERAL",
            "content-body" : [
                {
                    "content-body-title" : "Number/String/Boolean Methods",
                    "content-body-info" : "",
                    "content-body-snippet" : "Number(); //->Converts a value to number"
                }, {
                    "content-body-title" : "isNaN Method",
                    "content-body-info" : "",
                    "content-body-snippet" : "isNaN(\"hi\"); //->False"
                }, {
                    "content-body-title" : "typeof Operator",
                    "content-body-info" : "",
                    "content-body-snippet" : "console.log(typeof \"hi\"); //->string"
                }
            ]
        }, {
            "content-header" : "ARRAYS",
            "content-body" : [
                {
                    "content-body-title" : "Methods",
                    "content-body-info" : "",
                    "content-body-snippet" : "Push/Pop/Join - add/remove/stringfy"
                }, {
                    "content-body-title" : "indexOf & lastIndexOf",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 1].lastIndexOf/indexOf(1); //->1/0"
                }, {
                    "content-body-title" : "slice",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 2, 3].slice(1); //->[2, 3]"
                }, {
                    "content-body-title" : "concat",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1].concat([2, 3]); //->[1, 2, 3]"
                }, {
                    "content-body-title" : "forEach",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 2, 3].forEach(function(nb) { console.log(nb); } //-> 1 2 3"
                }, {
                    "content-body-title" : "Filter",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 2, 3].filter(function(nb) { return nb > 1; } //-> [2, 3]"
                }, {
                    "content-body-title" : "Map",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 2, 3].map(function(nb) { return nb+1; } //-> [2, 3, 4]"
                }, {
                    "content-body-title" : "Reduce",
                    "content-body-info" : "",
                    "content-body-snippet" : "[1, 2, 3].reduce(function(sum, nb) { return sum+=nb; } //-> 6"
                }
            ]
        }, {
            "content-header" : "Objects",
            "content-body" : [
                {
                    "content-body-title" : "Mutability",
                    "content-body-info" : "",
                    "content-body-snippet" : "Numbers, Strings, Booleans - Immutable & Arrays, Objects - Mutable"
                }, {
                    "content-body-title" : "Prototype",
                    "content-body-info" : "",
                    "content-body-snippet" : "Object.prototype.toDo = function() { ... };"
                }, {
                    "content-body-title" : "getPrototypeOf",
                    "content-body-info" : "",
                    "content-body-snippet" : "Object.getPrototypeOf(object).constructor.name;"
                }, {
                    "content-body-title" : "Keys",
                    "content-body-info" : "",
                    "content-body-snippet" : "console.log(Object.keys({\"name\": \"A\", \"age\" : 1})); //-> [\"name\", \"age\"]"
                }, {
                    "content-body-title" : "Operator instanceof",
                    "content-body-info" : "",
                    "content-body-snippet" : "console.log(dog instanceof Dog); //->true"
                }
            ]
        }, {
            "content-header" : "MATH",
            "content-body" : [
                {
                    "content-body-title" : "Max & Min",
                    "content-body-info" : "",
                    "content-body-snippet" : "Math.max(1, 2, 3); //->3"
                }, {
                    "content-body-title" : "Sqrt & Pow",
                    "content-body-info" : "",
                    "content-body-snippet" : "Math.pow(4, 3); //->64"
                }, {
                    "content-body-title" : "Others",
                    "content-body-info" : "",
                    "content-body-snippet" : "cos, sin, tan, PI, random, floor, ceil"
                }
            ]
        }, {
            "content-header" : "JSON",
            "content-body" : [
                {
                    "content-body-title" : "Stringify & Parse",
                    "content-body-info" : "",
                    "content-body-snippet" : "Converts data to this format and from it."
                }
            ]
        }, {
            "content-header" : "ERROR HANDLING",
            "content-body" : [
                {
                    "content-body-title" : "Try, Catch, Throw",
                    "content-body-info" : "",
                    "content-body-snippet" : "try { ... } catch(err) { ... throw(err) xxx };"
                }
            ]
        }, {
            "content-header" : "MODULES",
            "content-body" : [
                {
                    "content-body-title" : "Export",
                    "content-body-info" : "",
                    "content-body-snippet" : "if (typeof module != \"undefined\" && module.exports) module.exports = names;"
                }, {
                    "content-body-title" : "Import",
                    "content-body-info" : "",
                    "content-body-snippet" : "var names = require(\"./export.js\");"
                }
            ]
        }, {
            'content-header' : 'REGULAR EXPRESSIONS',
            'content-body' : [
                {
                    'content-body-title' : 'Test Method',
                    'content-body-info' : '',
                    'content-body-snippet' : 'console.log(/.*[0-9]*a.*/.test("21412a")); //->true'
                }, {
                    'content-body-title' : 'Exec Method',
                    'content-body-info' : '',
                    'content-body-snippet' : 'console.log(/\d+/.exec("one two 100")); //-> ["100"]'
                }, {
                    'content-body-title' : 'Match Method',
                    'content-body-info' : '',
                    'content-body-snippet' : 'console.log("one two 100 200".match(/\d+/g)); //->["100", "200"]'
                }, {
                    'content-body-title' : 'Replace Method',
                    'content-body-info' : '',
                    'content-body-snippet' : 'console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar'
                }
            ]
        }
    ],
    [
        {
            "content-header" : "Modules",
            "content-body" : [
                {
                    "content-body-title" : "The File System Module",
                    "content-body-info" : "",
                    "content-body-snippet" : "readFile(path, format, callback) & writeFile(path, content, callback) methods"
                }, {
                    "content-body-title" : "The HTTP module",
                    "content-body-info" : "",
                    "content-body-snippet" : "createServer method(callback with req & resp)"
                }, {
                    "content-body-title" : "Streams",
                    "content-body-info" : "",
                    "content-body-snippet" : "on method with data & end events using chunk with toString(); method"
                }
            ]
        }
    ]
];

function updatePage(content) {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for(var i = 0; i < content.length; i++) {
        var contentBody = content[i];
        var cloneHeader = content_template.cloneNode(true);

        cloneHeader.style.display = "initial";
        cloneHeader.querySelector(".content-showcase-body-header").textContent = contentBody["content-header"];

        for(var h = 0; h < contentBody["content-body"].length; h++) {
            var elementBody = contentBody["content-body"][h];

            var cloneBody = content_info.cloneNode(true);
            cloneBody.style.display = "initial";

            cloneBody.querySelector(".content-showcase-body-info-paragraph").textContent = elementBody["content-body-title"];
            cloneBody.querySelector(".content-showcase-body-info-snippet").textContent = elementBody["content-body-snippet"];

            cloneHeader.appendChild(cloneBody);
        }
        container.appendChild(cloneHeader);
    }
}

for(var i = 0; i < power_selectors.length; i++) {
    power_selectors[i].addEventListener("click", updatePage.bind(null, content_JSON[i]));
}

updatePage(content_JSON[0]);