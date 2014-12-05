var mapper = require('../server/source/documentMapper');
var con = require('./../server/model/connection.js');
var mongoose = require('mongoose');


var dummyData = [{
    title: "The adventure of deleting articles",
    subtitle: "+1 Article of testing",
    author: "Kasper Hald",
    timestamp: new Date(),
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    images: [],
    tags: ["Article", "Awesomeness"],
    comments: [{body: "I am comment 1", data: new Date()}]
}, {
    title: "Roberts quest for energydrink",
    subtitle: "+4 Vorpal Keen Article",
    author: "John Smith",
    timestamp: new Date(),
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    images: [],
    tags: ["Article", "Awesomeness", "Greatness"],
    comments: [{body: "I am comment 1", data: new Date()}]
}, {
    title: "Frederiks wild workout",
    subtitle: "+4 Vorpal Keen Article",
    author: "John Smith",
    timestamp: new Date(),
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    images: [],
    tags: ["Article", "Awesomeness", "Greatness"],
    comments: [{body: "I am comment 1", data: new Date()}]
}, {
    title: "The mighty misinterpreted quest for candy",
    subtitle: "+4 Vorpal Keen Article",
    author: "John Smith",
    timestamp: new Date(),
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    images: [],
    tags: ["Article", "Awesomeness", "Greatness"],
    comments: [{body: "I am comment 1", data: new Date()}]
}, {
    title: "Insert title here",
    subtitle: "+4 Vorpal Keen Article",
    author: "John Smith",
    timestamp: new Date(),
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur delectus, deserunt enim et excepturi facilis ipsa libero magnam modi molestiae nesciunt nisi nobis, nostrum perferendis porro repellat veritatis voluptatem.",
    images: [],
    tags: ["Article", "Awesomeness", "Greatness"],
    comments: [{body: "I am comment 1", data: new Date()}]
}];


function som(id) {
    mapper.createDocument(dummyData[id], function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
            if (id < dummyData.length) {
                id++;
                som(id);
            } else {

            }

        }
    });
}

con.connect(function () {
    som(0);
}, 'production');










