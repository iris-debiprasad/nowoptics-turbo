#!/bin/bash
set -e

echo "🔧 Building Turborepo apps..."
turbo run build

echo "📦 Creating deploy folder..."
rm -rf output-host-deploy
mkdir -p output-host-deploy

cp -r apps/host/.next/standalone/* output-host-deploy/
cp -r apps/host/.next/static output-host-deploy/.next/
cp -r apps/host/public output-host-deploy/public
cp -r node_modules output-host-deploy/node_modules
cp apps/host/package.json output-host-deploy/
cp package-lock.json output-host-deploy/  # or yarn.lock / pnpm-lock.yaml

echo "📁 Bundling into ZIP..."
cd output-host-deploy
zip -r ../host-app.zip .

echo "✅ Deployment package ready: host-app.zip"
