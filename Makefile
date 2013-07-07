all: test browserify acceptance

test:
	@./node_modules/.bin/mocha -u bdd -R nyan

acceptance:
	@./node_modules/.bin/mocha -u bdd -R nyan \
		test/acceptance/*.js

browserify:
	@./node_modules/.bin/browserify index.js > public/build.js

clean:
	rm public/build.js

.PHONY: test acceptance browserify
