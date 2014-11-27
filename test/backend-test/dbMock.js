var mockDB = [];


exports.get = function(title){
    for(var i=0;i < mockDB.length;i++){
        if(mockDB[i].title === title){
            return mockDB[i];
        }
    }
    return {};
}

exports.getFirstMatch = function(title){
    for(var i=0;i < mockDB.length;i++){
        if(~mockDB[i].title.indexOf(title)){
            return mockDB[i];
        }
    }
    return {};
}

/*  Future Search service
exports.getMatching = function(title){

    var returnDocs = [];

    for(var i=0;i < mockDB.length;i++){
        if(~mockDB[i].title.indexOf(title)){
            returnDocs.push(mockDB[i]);
        }
    }
    return returnDocs;
}
*/

var fillMock = function(){

    mockDB.push({
        doc_id: '1',
        title: 'Simons Journey to the Farm',
        subtitle: 'Based on a true story',
        author: {
            email: 'groenborg@gmail.com',
            name: 'Simon',
            resume:"I'm legally blind",
            skills:'A lot',
            profile_picture: 'Simon.gif',
            github_link: 'www.github.com/groenborg',
            collaborations:'All G5'
        },
        timestamp: '11-11-11 12:12:12',
        abstract: 'This is the story of a young developer',
        body: 'Darth Exception looked into Simons eyes and said "I AM YOUR ROOT FOLDER"',
        images: [
            'link1',
            'link2',
            'link3'
        ],
        tags: [
            'tag1',
            'tag2',
        ],
        comments: [
            'comment1',
            'comment2',
        ]
    }, {
        doc_id: '2',
        title: 'Kasper Learns to Rock',
        subtitle: 'Based on a true ewok-imagined non-fictional story',
        author: {
            email: 'kasmhald@gmail.com',
            name: 'Kasper',
            resume:"A lot of almen viden",
            skills:'Stuff',
            profile_picture: 'Kasper.gif',
            github_link: 'www.github.com/kashald',
            collaborations:'All G5'
        },
        timestamp: '11-11-11 12:12:12',
        abstract: 'This is the story of a Rock Legend',
        body: '..Kasper shredded his guitar 1 last time and the world shook',
        images: [
            'link1',
            'link2',
            'link3'
        ],
        tags: [
            'tag1',
            'tag2',
        ],
        comments: [
            'comment1',
            'comment2',
        ]
    }, {
        doc_id: '3',
        title: 'Thomas tries a windows computer',
        subtitle: 'Based on a non-liniar dungeon crawler',
        author: {
            email: 'Thomashed@gmail.com',
            name: 'Thomas',
            resume:"Se, det kan jeg",
            skills:'Something',
            profile_picture: 'Thomas.gif',
            github_link: 'www.github.com/thomashed',
            collaborations:'All G5'
        },
        timestamp: '11-11-11 12:12:12',
        abstract: 'This is the story of a young applet',
        body: 'Thomas was baffled he had looked for hours, but simply couldnt find the any key',
        images: [
            'link1',
            'link2',
            'link3'
        ],
        tags: [
            'tag1',
            'tag2',
        ],
        comments: [
            'comment1',
            'comment2',
        ]
    });
}

fillMock();