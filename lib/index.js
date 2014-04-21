module.exports = function(params, templates, contexts, links, buffers, done) {

	var async = require('async'),
		dir = require('path').dirname,
		join = require('path').join,
		format = require('util').format
		prefix = params.prefix || '',
		postfix = params.postfix || '';

	if (!params.destField || typeof params.destField !== 'string') {

		return done('\'destField\' parameter required but missing.');

	}

	async.each(buffers, function(buffer, done) {

		var context = contexts[buffer.link.contextPath],
			dest = context[params.destField];

		if (dest) {

			buffer.path = prefix + dest + postfix;
			done();

		} else {

			done(format('\'destField\' missing in %s.', c));

		}

	}, done);

};