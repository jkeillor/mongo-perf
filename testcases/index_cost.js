if ( typeof(tests) != "object" ) {
    tests = [];
}

var docInt = {
    x: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
    y: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
    z: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
};

var docString = {
    x: {"#RAND_STRING": [1024]},
    y: {"#RAND_STRING": [1024]},
    z: {"#RAND_STRING": [1024]},
};


tests.push( { name: "Insert.SingleIndex.UnContested.RndINT",
    tags: ['insert','indexed','regression','jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1});
    },
    ops: [
        { op:  "insert",
            doc: docInt
        }
    ] } );

tests.push( { name: "Insert.2MultiIndex.UnContested.RndINT",
    tags: ['insert', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        collection.ensureIndex({x:1});
        collection.ensureIndex({y:1});
    },
    ops: [
        { op: "insert",
            doc: docInt
        }
    ]});

tests.push( { name: "Insert.3MultiIndex.UnContested.RndINT",
    tags: ['insert','indexed','regression', 'jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
        collection.ensureIndex({z: 1});
    },
    ops: [
        { op:  "insert",
            doc:docInt
        }
    ] } );
tests.push( { name: "Insert.SingleIndex.UnContested.RndString",
    tags: ['insert','indexed','regression','jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1});
    },
    ops: [
        { op:  "insert",
            doc: docString
        }
    ] } );

tests.push( { name: "Insert.2MultiIndex.UnContested.RndString",
    tags: ['insert', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
    },
    ops: [
        { op: "insert",
            doc: docString
        }
    ]});

tests.push( { name: "Insert.3MultiIndex.UnContested.RndString",
    tags: ['insert','indexed','regression', 'jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
        collection.ensureIndex({z: 1});
    },
    ops: [
        { op:  "insert",
            doc:docString
        }
    ] } );

tests.push( { name: "Query.MultiIndex.Rnd",
    tags: ['query', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        var docs = [];
        for (var i = 0; i < 48000; i++) {
            docs.push({x: i % 17, y: i % 19, z: i % 23, a: i % 17});
        }
        collection.insert(docs);
        collection.getDB().getLastError();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
        collection.ensureIndex({z: 1});
    },
    ops: [
        {op: "find",
            query: { x: { "#RAND_INT": [0, 17] } },
                y: { "#RAND_INT": [0,19]},
                z: {"#RAND_INT": [0,23]}
        }
    ]});

tests.push( { name: "Query.CompoundIndex.Rnd",
    tags: ['query', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        var docs = [];
        for (var i = 0; i < 48000; i++) {
            docs.push({x: i % 17, y: i % 19, z: i % 23, a: i % 17});
        }
        collection.insert(docs);
        collection.getDB().getLastError();
        collection.ensureIndex({x: 1, y: 1, z: 1});
    },
    ops: [
        {op: "find",
            query: { x: { "#RAND_INT": [0, 3] } },
            y: { "#RAND_INT": [0,17]},
            z: {"#RAND_INT": [0,23]}
        }
    ]});
