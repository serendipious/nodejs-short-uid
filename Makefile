DIST_DIR 	:= ./dist
SRC_DIR 	:= ./src
TST_DIR 	:= ./tst

NODE_PATH := '.'
TARGET_FILENAME  := 'short-uid'

NODE_MODULES := ./node_modules
NODE_MODULES_BIN := ${NODE_MODULES}/.bin

MOCHA  := ${NODE_MODULES_BIN}/mocha
TSC    := ${NODE_MODULES_BIN}/tsc
ROLLUP := ${NODE_MODULES_BIN}/rollup
NYC    := ${NODE_MODULES_BIN}/nyc

all: clean install compile test

install:
	npm install

compile:
	${TSC} && ${ROLLUP} -c

test: compile
	NODE_PATH=${NODE_PATH} ${MOCHA} -r ts-node/register ${TST_DIR}/**/*.test.ts

test-coverage: compile
	${NYC} ${MOCHA} -r ts-node/register ${TST_DIR}/**/*.test.ts

clean:
	rm -rf ${DIST_DIR} ${NODE_MODULES}
