function HashtagParser(str, tagChar, whitelist) {
    if (!(this instanceof HashtagParser)) {
        return new HashtagParser(str, tagChar);
    }

    this.str       = str;
    this.tagChar   = (tagChar || '#');
    this.whitelist = (whitelist || '[a-zA-Z0-9_-]');
    this.tags      = [];
    this.tokens    = [];

    this._parse();
}

HashtagParser.prototype._parse = function() {
    var self   = this,
        tokens = self.tokens;

    var exprTagBegin = new RegExp('^' + self.tagChar),
        exprTagFull  = new RegExp('^' + self.tagChar + self.whitelist + '+$'),
        lastToken;

    function pushToken(token) {
        self.tokens.push(token);
        lastToken = token;
    }

    self.str.split(/(\s+)/).forEach(function(word) {
        if (exprTagFull.test(word)) {
            var tag = word.replace(exprTagBegin, '');
            self.tags.push(tag);
            pushToken({
                type : 'tag',
                tag  : tag
            });
        } else if (lastToken && lastToken.type == 'text') {
            lastToken.text += word;
        } else {
            pushToken({
                type : 'text',
                text : word
            });
        }
    });
};

HashtagParser.prototype.toString = function() {
    var self = this;

    return self.tokens.map(function(token) {
        switch (token.type) {
            case 'text':
                return token.text;

            case 'tag':
                return self.tagChar + token.tag;

            default:
                throw new Error('Unrecognized token type: ' + token.type);
        }
    }).join('');
};

HashtagParser.prototype.toJSON = function() {
    return JSON.stringify.apply(null, [this.tokens].concat([].slice.call(arguments)));
};

module.exports = {
    parse : function(str, tagChar) {
        return new HashtagParser(str, tagChar);
    },

    // TODO fromJSON

    HashtagParser : HashtagParser
};
