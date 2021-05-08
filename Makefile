bundle:
	deno bundle --config=tsconfig.json ./source/editor/main.ts ./public/main.bundle.js

serve:
	deno run --allow-net --allow-read https://deno.land/std@0.75.0/http/file_server.ts ./public

test:
	deno fmt
	deno test

watch:
	deno bundle --unstable --watch --config=tsconfig.json ./source/editor/main.ts ./public/main.bundle.js
