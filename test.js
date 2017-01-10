var assert  = require( 'assert' ),
    hashtag = require( './index' );

function testParseTags(testString, expectedTags, expectedTokens) {
	var obj = hashtag.parse( testString );
	assert.deepEqual( obj.tags, expectedTags );

	assert.equal( obj.toJSON(), JSON.stringify( expectedTokens ) );
	assert.equal( obj.toJSON( null, 4 ), JSON.stringify( expectedTokens, null, 4 ) );
}

function testReplaceTag(testString, tagIndex, outputString) {
	var obj = hashtag.parse( testString );
	obj.tokens[ tagIndex ].tag = 'string';

	assert.equal( obj.toString(), outputString );
}


testParseTags( 
	'Interleaved #text and #hashtag parser', 
	[ 'text', 'hashtag' ],
	[
		{ type : 'text', text : 'Interleaved ' },
		{ type : 'tag' , tag  : 'text' },
		{ type : 'text', text : ' and ' },
		{ type : 'tag' , tag  : 'hashtag' },
		{ type : 'text', text : ' parser' }
	]
);

testParseTags( 
	'#tags may be near #punctuation; or the end of a #sentence.', 
	[ 'tags', 'punctuation', 'sentence' ],
	[
		{ type : 'tag', tag : 'tags' },
		{ type : 'text' , text  : ' may be near ' },
		{ type : 'tag' , tag  : 'punctuation' },
		{ type : 'text' , text  : '; or the end of a ' },
		{ type : 'tag' , tag  : 'sentence' },
		{ type : 'text' , text  : '.' }
	]
);

testParseTags( 
	"it's #steve's hashtag and he owns it", 
	[ 'steve' ],
	[
		{ type : 'text' , text  : "it's " },
		{ type : 'tag', tag : "steve" },
		{ type : 'text' , text  : "'s hashtag and he owns it" },
	]
);


testReplaceTag( 'Interleaved #text and #hashtag parser', 1, 'Interleaved #string and #hashtag parser' );

console.log('OK');
