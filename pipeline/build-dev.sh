#!/bin/bash

build() {
    echo '🔨 Building development build for using as unpacked extension'

    rm -rf dev_build

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export REACT_APP_VERSION=$npm_package_version

    react-scripts build

    echo '🧪 Create dev_build folder'
    mkdir -p dev_build
    cp -r build/* dev_build

    node -p "JSON.stringify({...require('./dev_build/manifest.json'), name: 'eco₂rd_dev'}, null, 2)" > manifest.json
    mv manifest.json dev_build/manifest.json

    echo '✅ You can now import your dev_build folder as unpacked extension in your browser extension manager'
}

build
