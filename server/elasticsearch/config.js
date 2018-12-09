'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var index = require('../config/config2.js');

var search = exports.search = [{ index: index.elasticSearch.index, type: 'tour' }, {
  query: {
    match: {
      key: {
        query: '{query}'
      }
    }
  }
}
];

var indexSettings = exports.indexSettings = {
  settings: {
    number_of_shards: 5,
    analysis: {
      filter: {
        nGram_filter: {
          type: 'nGram',
          min_gram: 2,
          max_gram: 20,
          token_chars: ['letter', 'digit', 'punctuation', 'symbol']
        }
      },
      analyzer: {
        nGram_analyzer: {
          type: 'custom',
          tokenizer: 'whitespace',
          filter: ['lowercase', 'asciifolding', 'nGram_filter']
        },
        whitespace_analyzer: {
          type: 'custom',
          tokenizer: 'whitespace',
          filter: ['lowercase', 'asciifolding']
        }
      }
    }
  },
  mappings: {
    tour: {
      _all: {
        analyzer: 'nGram_analyzer',
        search_analyzer: 'whitespace_analyzer'
      },
      properties: {
        id: {
          type: 'text'
        },
        name: {
          type: 'text'
        },
        description: {
          type: 'text'
        },
        price: {
          type: 'scaled_float',
          scaling_factor: 100
        },
        offerprice: {
          type: 'scaled_float',
          scaling_factor: 100
        },
        days: {
          type: 'integer'
        }
      }
    }
  }
};
