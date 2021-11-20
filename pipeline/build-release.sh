#!/bin/bash

build() {
    echo '📝 Specify version'
    yarn version

    echo '🛠  Building release build'
    rm -rf build/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export REACT_APP_VERSION=$npm_package_version

    react-scripts build

    PACKAGE_VERSION="$(node -p -e "require('./package.json').version")"
    node -p "JSON.stringify({...require('./build/manifest.json'), version: '$PACKAGE_VERSION'}, null, 2)" > manifest.json
    mv manifest.json build/manifest.json

    echo '🚀 The build can now be archived and shipped'
}

build