#!/bin/bash

rm -rf ./bin/publish
mkdir -p ./bin/publish

dotnet publish -c Release -f netcoreapp3.1 -v n -o ./bin/publish  --self-contained -r win-x86 //p:PublishSingleFile=true //p:PublishTrimmed=true

echo "generate front-end project to wwwroot"
cd ../../client/
cnpm run build
mv -f build/* ../server/Zhangwei.WebApp/bin/publish/wwwroot/