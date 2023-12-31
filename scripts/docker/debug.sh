#!/bin/bash
# docker run -p 9229:9229 -v $BROYDEN_HOME/coint-etf-data-pkg-node:/broyden --workdir /broyden/test broyden-dev-node19.8.1-bullseye /bin/bash run_test.sh
docker run -p 9229:9229 -v $BROYDEN_HOME/coint-etf-data-pkg-node:/broyden --workdir /broyden/test broyden-dev-node19.8.1-bullseye