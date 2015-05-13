var assert  = require( 'assert' ),
    hashtag = require( './index' );

var obj = hashtag.parse( 'Interleaved #text and #hashtag parser' );

assert.deepEqual( obj.tags, [ 'text', 'hashtag' ] );

var expectedTokens = [
    { type : 'text', text : 'Interleaved ' },
    { type : 'tag' , tag  : 'text' },
    { type : 'text', text : ' and ' },
    { type : 'tag' , tag  : 'hashtag' },
    { type : 'text', text : ' parser' }
];

assert.equal( obj.toJSON(), JSON.stringify( expectedTokens ) );
assert.equal( obj.toJSON( null, 4 ), JSON.stringify( expectedTokens, null, 4 ) );

// TODO better setTags
obj.tokens[ 1 ].tag = 'string';

assert.equal( obj.toString(), 'Interleaved #string and #hashtag parser' );

console.log('OK');
