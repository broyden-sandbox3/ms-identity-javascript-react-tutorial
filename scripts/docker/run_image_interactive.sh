#!/bin/bash
docker run -it -p 3000:3000 --entrypoint "/bin/bash" -v $BROYDEN_HOME/ms-identity-javascript-react-tutorial:/broyden broyden-dev-node19.8.1-bullseye