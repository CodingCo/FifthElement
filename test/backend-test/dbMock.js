exports.Document = {

    mockDB : mockDB = [],

    findOne : function(title, callback){
        for(var i=0;i < mockDB.length;i++){
            if(~mockDB[i].title.indexOf(title.title)){
                return callback(undefined,mockDB[i]);
            }
        }
        return callback(undefined,undefined);
    },

    create : function(doc, callback){
        return callback(undefined, 0 < mockDB.push(doc));
    },

    remove : function(doc_id, callback){

        for(var i = 0; i < mockDB.length; ++i){
            if(mockDB[i].doc_id === doc_id.doc_id){
                mockDB.splice(i,1);
                return callback(undefined, undefined);
            }
        }
    },

    fillMock : function(){
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
                'tag2'
            ],
            comments: [
                'comment1',
                'comment2'
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
                'tag2'
            ],
            comments: [
                'comment1',
                'comment2'
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
                'tag2'
            ],
            comments: [
                'comment1',
                'comment2'
            ]
        })
    },

    emptyMock : function () {
        mockDB = [];
    }
}

exports.Sequence =  {

    document_sequence_value : document_sequence_value = 0,

    findOne : function(idString, callback){
        document_sequence_value++;

        var seqDoc =
        {
            _id:'counter',
            document_sequence_value: document_sequence_value

        };

        seqDoc.save = function(){};

        callback(undefined, seqDoc);

    }
};


