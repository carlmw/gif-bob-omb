test:
	@./node_modules/.bin/mocha -u bdd -R nyan

acceptance:
	@./node_modules/.bin/mocha -u bdd -R nyan \
		test/acceptance/*.js

.PHONY: test acceptance
