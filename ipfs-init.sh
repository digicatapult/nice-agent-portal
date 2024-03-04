#!/bin/sh

set -ex
ipfs config profile apply local-discovery
ipfs bootstrap rm all
