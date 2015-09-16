'use strict';

var tweetShortener = {
  wordSubstituter: function(sentence){
    var result = sentence;
    var substitutions = {
      "hello": 'hi',
      "to": '2',
      "two": '2',
      "too": '2',
      "for": '4',
      "four": '4',
      'be': 'b',
      'you': 'u',
      "at": "@",
      "and": "&"
    }
    var pattern = /(\bhello\b|\bto\b|\btwo\b|\btoo\b|\bfor\b|\bfour\b|\bbe\b|\byou\b|\bat\b|\band\b)/gi
    return sentence.replace(pattern, function(match){
      return substitutions[match.toLowerCase()];
    });
    // for(var s in substitutions){
    //   if(sentence.indexOf(s) >= 0){
    //     var pattern = new RegExp("\\b" + s + "\\b", 'g');
    //     debugger
    //     result = result.replace(pattern, substitutions[s]);
    //   }
    // }
    // return result;
  },
  bulkShortener: function(tweets){
    return tweets.map(function(tweet){
      return this.wordSubstituter(tweet);
    }, this)
  },
  selectiveShortener: function(tweet){
    return this.shorten(tweet, function(){
      return this.wordSubstituter(tweet);
    }.bind(this))
  },

  shortenedTruncator: function(tweet){
    return this.shorten(tweet, function(){
      var shortened = this.selectiveShortener(tweet);
      return shortened.slice(0, 137) + '...';
    }.bind(this))
  },

  shorten(tweet, callback){
    if(tweet.length < 140) return tweet;
    return callback();
  }
};
