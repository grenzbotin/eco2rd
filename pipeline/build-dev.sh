#!/bin/bash

build() {
    echo '🔨 Building development build for using as unpacked extension'

    rm -rf build_dev

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export REACT_APP_VERSION=$npm_package_version

    react-scripts build

    echo '🧪 Create build_dev folder'
    mkdir -p build_dev
    cp -r build/* build_dev

    node -p "JSON.stringify({...require('./build_dev/manifest.json'), name: 'eco₂rd_dev'}, null, 2)" > manifest.json
    mv manifest.json build_dev/manifest.json

    echo '✅ You can now import your build_dev folder as unpacked extension in your browser extension manager'
}

build
