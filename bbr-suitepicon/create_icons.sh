#!/bin/bash
rm SuiteP-Icon-Font/src/*
./convert_ttf_svgicons.pe suitepicon.ttf
rename 's/\_suitepicon//' *.svg
mv *.svg SuiteP-Icon-Font/src
svgo -f bbr_icons/ -o SuiteP-Icon-Font/src
cd SuiteP-Icon-Font
icon-font-generator src/*svg -o suitepicon --mono --center -p suitepicon --csspath suitepicon/suitepicon-glyphs.scss --name suitepicon
cd ..
