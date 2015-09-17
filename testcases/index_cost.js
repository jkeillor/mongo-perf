if ( typeof(tests) != "object" ) {
    tests = [];
}

/*
 * Setup: Create compound index on fields x,y,z
 * Test: Insert documents with default OID and fields x,y,z with
 *       different random integer values.  All threads insert into the
 *       same region of integers.
 */
tests.push( { name: "Insert.CompoundIndex.UnContested.Rnd",
    tags: ['insert','indexed','regression','jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1, y: 1, z: 1});
    },
    ops: [
        { op:  "insert",
            doc:
            { x: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
                y: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
                z: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
            }
        }
    ] } );

tests.push( { name: "Insert.MultiCompoundIndex.UnContested.Rnd",
    tags: ['insert', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        collection.ensureIndex({x:1, y:1, z:1});
        collection.ensureIndex({x:1, z:1});
    },
    ops: [
        { op: "insert",
            doc:
            { x: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
                y: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
                z: {"#RAND_INT_PLUS_THREAD": [0,10000000]},
            }
        }
    ]});

/*
 * Setup: Create indexes on fields x,y,z
 * Test: Insert documents with default OID and fields x,y,z with
 *       different random integer values.  All threads insert into the
 *       same region of integers.
 */
tests.push( { name: "Insert.MultiIndex.UnContested.Rnd",
    tags: ['insert','indexed','regression', 'jeremy'],
    pre: function( collection ) {
        collection.drop();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
        collection.ensureIndex({z: 1});
    },
    ops: [
        { op:  "insert",
            doc:
            { x: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
                y: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
                z: { "#RAND_INT_PLUS_THREAD": [0,10000000] },
            }
        }
    ] } );

tests.push( { name: "Query.MultiIndex.Rnd",
    tags: ['query', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        var docs = [];
        for (var i = 0; i < 48000; i++) {
            docs.push({x: i % 3, y: i % 5, z: i % 7, a: i % 17});
        }
        collection.insert(docs);
        collection.getDB().getLastError();
        collection.ensureIndex({x: 1});
        collection.ensureIndex({y: 1});
        collection.ensureIndex({z: 1});
    },
    ops: [
        {op: "find",
            query: { x: { "#RAND_INT": [0, 3] } },
                y: { "#RAND_INT": [0,5]},
                z: {"#RAND_INT": [0,7]}
        }
    ]});

tests.push( { name: "Query.CompoundIndex.Rnd",
    tags: ['query', 'indexed', 'jeremy'],
    pre: function(collection) {
        collection.drop();
        var docs = [];
        for (var i = 0; i < 48000; i++) {
            docs.push({x: i % 3, y: i % 5, z: i % 7, a: i % 17});
        }
        collection.insert(docs);
        collection.getDB().getLastError();
        collection.ensureIndex({x: 1, y: 1, z: 1});
    },
    ops: [
        {op: "find",
            query: { x: { "#RAND_INT": [0, 3] } },
            y: { "#RAND_INT": [0,5]},
            z: {"#RAND_INT": [0,7]}
        }
    ]});