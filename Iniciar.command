#!/bin/zsh
cd "$(dirname "$0")/dist" || exit 1
printf 'R Insulfilms: http://127.0.0.1:8080\nMantenha esta janela aberta. Para encerrar, pressione Control+C.\n'
python3 -m http.server 8080 --bind 127.0.0.1
