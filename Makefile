.PHONY: dev
dev:
	docker run --rm -it --mount type=bind,src=`pwd`,dst=/usr/app --name matomo-router5-plugin -w /usr/app node:16-alpine sh