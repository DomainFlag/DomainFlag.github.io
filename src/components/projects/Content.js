import logo1 from "../../resources/projects/logo-icon.svg";
import gradient1 from "../../resources/projects/gradient.png";
import front_2 from "../../resources/projects/front_1_2.png";
import front_1 from "../../resources/projects/front_1.png";
import design_1 from "../../resources/projects/design_3.png";
import gradient3 from "../../resources/projects/gradient-blue.png";
import front_2_1 from "../../resources/projects/front_2_1.png";
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
            color : "#FFB61E"
        }
    },
    link : "https://github.com/DomainFlag/Jiggles",
    steps : [{
        header : "Jiggles",
        logo : logo1,
        tools : ["Android", "Java", "Python", "JavaScript", "MongoDB"],
        direction : null,
        content : ["Interactive streaming and social media service designed and built on " +
        " Android that brings music lovers together by connecting users through content " +
        " sharing, by providing access to millions of songs and many more…"
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
        images : [front_2, front_1, design_1]
    }, {
        title : "More than that",
        content : ["Rich and abundant content of music remains still not known to the user, " +
        " where recommendation systems are not fully the way to go."
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
                fontFamily : "Gill Sans",
                fontWeight : 700,
                fontSize : "24px",
                textAlign : "left"
            },
            text : {
                color : "#001E1E",
                fontWeight : "bold",
                fontSize : "32px",
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

            "The app makes it easy to follow anyone, be it a new friend or an old one that you" +
            " already have connected from social media like Facebook. With 2 types of content" +
            " currently supported, either a text/image/audio usual based post or a liked/followed" +
            " notification are more than enough to display your own stunning music collection.",

            "Your social feed is always up-to-date as a remote server(NodeJs) connected to" +
            " Firebase Cloud Messaging servers pushes instantly your fresh content" +
            " to your app. Never miss a thing be it someone replying back with a B-side to" +
            " your adored track or your favorite artist you are following releasing a new" +
            " album."
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
        images : [front_2_1]
    }, {
        title : "As good as any music player",
        direction : {
            flexDirection : "row"
        },
        content : ["An app intended for music can't be one without being able to play it." +
        " Right?",

            "The application is making use of Spotify SDK, where any music is available" +
            " right away at your hands. Even if you don't have an actual Spotify account, you" +
            " can freely fallback to an offline player implemented with Exoplayer and" +
            " connected to the remote server for you to renew your dusty music artworks" +
            " using the Spotify Web API.",

            "Any media can be synced through Bluetooth in a matter of seconds. A chunked based" +
            " custom protocol is internally designed for audio source to be deconstructed and" +
            " reconstructed on the fly to the other end of any device." +
            " Whether you are listening to the same very beat as your friend, need some" +
            " upbeat tune to get the job done while being off from your desk, but having your" +
            " phone close to you, or syncing the whole house for a party so everybody would know" +
            " Daft Punk is playing at your house."
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
        content : [
            "My effort goes now for creating new features and constantly learning along the" +
            " way. Starting from data-driven systems like singing-along your favourite" +
            " track, music recommendation system, smart playlists based on tracks whose" +
            " theirs repeat button were being smashed lately and many more..."
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
            color : "#f67280"
        }
    },
    link : "https://github.com/DomainFlag/StarCannon",
    steps : [{
        header : "StarCannon",
        logo : logo2,
        tools : ["C++", "Java", "OpenGL", "Javascript", "WebGL"],
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
            " rendering low to high sized heightmaps. As the world position changes, the farthest" +
            " objects that are out of focus are discarded while those that are closer are" +
            " added. The implementation also solves the issue of having cracks(T-junctions) by" +
            " disabling the vertices that are in-between two different LOD levels.",

            "The rendering process consists of an additional pass through tessellation shaders" +
            " before moving to the geometry and fragment shader respectively. It allows" +
            " generation of additional primitives(detail) from the behalf of the GPU instead" +
            " of the CPU with better leverage of both GPU and CPU's available resources. The" +
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