import logo1 from "../../resources/projects/logo-icon.svg";
import gradient1 from "../../resources/projects/gradient.png";
import highlights from "../../resources/projects/highlights.png";
import front_1 from "../../resources/projects/front_1.png";
import design_1 from "../../resources/projects/design_3.png";
import gradient3 from "../../resources/projects/gradient-blue.png";
import social_thread from "../../resources/projects/social_thread.png";
import gradient2 from "../../resources/projects/gradient-violet.png";
import gradient4 from "../../resources/projects/gradient-black.png";
import logo2 from "../../resources/projects/logo.png";
import image_3 from "../../resources/projects/screenshot.png";
import video1 from "../../resources/projects/Video1.mp4";
import video from "./../../resources/projects/Video.mp4";

const images = require.context('./../../resources/projects/albums', false, /\.(png|jpe?g|svg)$/);

export const projects = [{
    style : {
        accent : {
            color : "#C3272B"
        }
    },
    link : "https://github.com/DomainFlag/Jiggles",
    logo : logo1,
    steps : [{
        header : "Jiggles",
        tools : ["Android", "Java", "Python", "JavaScript", "MongoDB"],
        direction : null,
        content : ["Interactive streaming and social media service designed and built on " +
            "Android that brings music lovers together by connecting users through content " +
            "sharing by providing access to millions of songs."
        ],
        style : {
            size : {
                height : "100vh"
            },
            accent : {
                color : "#FFB61E"
            },
            gradient : gradient1
        },
        images : [highlights, front_1, design_1]
    }, {
        title : "More...",
        content : ["Rich and abundant content of music remains still not known to the user, " +
            "where recommendation systems are not fully the way to go."
        ],
        type : "outline",
        style : {
            size : {
                height : "80vh"
            },
            accent : {
                color : "#C3272B"
            },
            header : {
                color : "#C3272B",
                fontFamily : "Open Sans",
                fontWeight : 700,
                textAlign : "left",
                textTransform : "uppercase"
            },
            text : {
                color : "#001E1E",
                fontWeight : "bold",
                textAlign : "left"
            },
            background : {
                backgroundColor : "#FFFFFF"
            },
            gradient : null
        },
        images : []
    }, {
        title : "Make it social",
        direction : {
            flexDirection : "row-reverse"
        },
        content : ["My focus was to create a platform where people share and explore" +
            " new music right away. Empowering users to put into spotlight their favourite" +
            " artists and follow those that will take them to a never ending search of" +
            " playful sweet new tunes.",

            "Your social feed is always up-to-date as a remote server connected to" +
            " Firebase Cloud Messaging servers pushes instantly your fresh content" +
            " to your app."
        ],
        style : {
            size : {
                height : "125vh"
            },
            accent : {
                color : "#FFB61E"
            },
            gradient : gradient3
        },
        images : [social_thread]
    }, {
        title : "As good as any music player",
        direction : {
            flexDirection : "row"
        },
        content : ["The App uses Spotify SDK. Even if you don't have an actual Spotify account, you" +
            " can freely fallback to an offline player.",

            "Any media can be synced through Bluetooth. A chunked based" +
            " custom protocol is internally designed for audio source to be deconstructed and" +
            " reconstructed on the fly to the other end of any device."
        ],
        style : {
            size : {
                height : "120vh"
            },
            accent : {
                color : "#FFB61E"
            },
            gradient : gradient2
        },
        frame : true,
        videoStyle : "native",
        videos : [video],
        images : []
    }, {
        title : "Forthcoming",
        direction : {
            flexDirection : "row"
        },
        content : ["New features are coming along the way. Starting from data-driven systems like singing-along your " +
            "favourite track, music recommendation system, smart playlists and many more..."
        ],
        link : "https://github.com/DomainFlag/DataScienceNotes",
        style : {
            size : {
                height : "80vh"
            },
            accent : {
                color : "#FFB61E"
            },
            background : {
                backgroundColor : "#FFFFFF"
            },
            gradient : gradient4
        },
        type : "",
        showcase : images.keys().map(images),
        images : []
    }]
}, {
    style : {
        accent : {
            color : "#2B334E"
        }
    },
    link : "https://github.com/DomainFlag/StarCannon",
    logo : logo2,
    steps : [{
        header : "StarCannon",
        tools : ["Java", "C++", "JavaScript", "OpenGL", "WebGL"],
        direction : null,
        content : [
            "A cross-platform 3D game engine for Desktop/Web platform built on " +
            "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
            "elements."
        ],
        style : {
            size : {
                height : "100vh"
            },
            accent : {
                color : "#f67280"
            },
            gradient : gradient4
        },
        images : [image_3]
    }, {
        title : "LOD terrain",
        direction : {
            flexDirection : "row-reverse"
        },
        content : ["A dynamic Quadtree is implemented to reduce the memory complexity when" +
            " rendering high sized heightmaps.",

            "It allows generation of additional detail through tessellation from the behalf of the GPU. The" +
            " number of generated primitives depends on distance from the camera where a greater" +
            " level of detail is to be expected closer to the camera in order to reduce" +
            " unnecessary detail for far objects that are out of focus."
        ],
        style : {
            size : {
                height : "100vh"
            },
            accent : {
                color : "#f67280"
            },
            gradient : gradient3
        },
        videoStyle : "desktop",
        images : [],
        videos : [video1]
    }]
}];

export default {
    projects
}