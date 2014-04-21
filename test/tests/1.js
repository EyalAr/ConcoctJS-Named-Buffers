var should = require('should');

describe("ConcoctJS - Named Buffers plugin test", function() {

    var Concoction = require('concoct'),
        options = {
            templates: './test/templates/1.tpl',
            contexts: './test/contexts/1.json',
            dest: './test/output',
            linkingRules: {
                './test/contexts/1.json': './test/templates/1.tpl'
            },
            plugins: [{
                name: 'concoct-named-buffers',
                handler: require('../../'),
                params: {
                    destField: 'slug',
                    prefix: 'article-',
                    postfix: '.html'
                }
            }, {
                name: 'concoct-mustache',
                handler: require('concoct-mustache')
            }]
        },
        c;

    before(function(done) {

        // erase everything is the dest directory

        var rimraf = require('rimraf'),
            fs = require('fs');

        rimraf(options.dest, function(err) {

            if (err) return done(err);

            fs.mkdir(options.dest, done);

        });

    });

    before(function(done) {

        c = new Concoction(options);
        c.concoct(done);

    });

    it('should compile one template', function(done) {

        var fs = require('fs');

        fs.readdir(options.dest, function(err, list) {

            if (!err) {
                list.should.be.length(1);
            }

            done(err);

        });

    });

    it('should write the correct content to disk', function(done) {

        var fs = require('fs'),
            resolve = require('path').resolve;

        fs.readFile(resolve(options.dest, 'article-test.html'), function(err, data) {

            if (!err) {
                data.toString().should.be.exactly('FOO');
            }

            done(err);

        });

    });

});