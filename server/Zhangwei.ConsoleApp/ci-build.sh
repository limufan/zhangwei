#!/bin/bash

rm -rf ./bin/publish
mkdir -p ./bin/publish

dotnet publish -c Release -f netcoreapp3.1 -v n -o ./bin/publish  --self-contained -r win-x86 //p:PublishSingleFile=true //p:PublishTrimmed=true
