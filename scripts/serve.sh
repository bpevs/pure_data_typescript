#!/bin/sh
deno run --allow-net --allow-read https://deno.land/std@0.75.0/http/file_server.ts ./public
