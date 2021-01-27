#!/usr/bin/env bash

curl -i -X POST -H "Content-Type: multipart/form-data" \
-F "data=@../example/hello.txt" http://localhost:3696/uploads
