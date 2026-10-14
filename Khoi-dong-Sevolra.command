#!/bin/bash
set -e
cd "$(dirname "$0")"
if command -v bun >/dev/null 2>&1; then
  SEVOLRA_BUN="$(command -v bun)"
elif [ -x "$HOME/.bun/bin/bun" ]; then
  SEVOLRA_BUN="$HOME/.bun/bin/bun"
else
  echo 'Đang cài bộ chạy từ bun.sh…'
  curl -fsSL https://bun.sh/install | bash
  SEVOLRA_BUN="$HOME/.bun/bin/bun"
fi
"$SEVOLRA_BUN" setup.mjs
