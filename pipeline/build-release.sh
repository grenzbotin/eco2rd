#!/bin/bash

build() {
    echo '📝 Specify version'
    yarn version

    echo '🛠  Building release build'
    rm -rf build/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export REACT_APP_VERSION="$(node -p -e "require('./package.json').version")"

    react-scripts build

    node -p "JSON.stringify({...require('./build/manifest.json'), version: '$REACT_APP_VERSION'}, null, 2)" > manifest.json
    mv manifest.json build/manifest.json

    echo '🚀 The build can now be archived and shipped'
}

build