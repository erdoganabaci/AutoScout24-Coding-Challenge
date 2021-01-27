#!/usr/bin/env bash

curl -i -X POST -H "Content-Type: multipart/form-data" \
-F "data=@../example/test.csv" http://localhost:3696/ \
-F "data=@../example/hello.csv" http://localhost:3696/
