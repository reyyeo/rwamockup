#!/bin/sh
# Serve the site on http://localhost:${1:-8000}
cd "$(dirname "$0")" && exec python3 -m http.server "${1:-8000}"
