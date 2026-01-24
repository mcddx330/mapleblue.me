#!/bin/bash
npm run prod
./vendor/bin/jigsaw build

SED_CMD=$(which gsed > /dev/null 2>&1 && echo "gsed" || echo "sed")
REPLACE_CMD=':a;N;$!ba;s/\n/ /g; s/  \+/ /g'
OUTPUT_DIR="./build_production"
echo $OUTPUT_DIR
find "$OUTPUT_DIR" -type f -name "*.html" | while read HTML_FILE; do
  echo $HTML_FILE
  if [[ "$SED_CMD" == "gsed" ]]; then
    gsed -i "$REPLACE_CMD" "$HTML_FILE"
  else
    sed -i '' "$REPLACE_CMD" "$HTML_FILE"
  fi
done
echo "Build done."
