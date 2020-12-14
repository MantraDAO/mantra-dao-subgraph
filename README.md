# om-staking-v2-subgraph
🕉️ MANTRA DAO subgraph 📊'

<h6> install </h6>

npm install -g @graphprotocol/graph-cli

<h6>Starting a new graph:</h6>

graph init

// You can specify chain / contract address and it will pull its ABI into the repo

<h6>Codegen based on schema entities:</h6>

yarn codegen 

<h6>Deploy to graph:</h6>

graph deploy \                                                         
    --debug \
    --node https://api.thegraph.com/deploy/ \
    --ipfs https://api.thegraph.com/ipfs/ \
    --access-token <YOUR-ACCESS-TOKEN> \
    <your-github-username>/<your-graph-repo>
    
Note:

To speed up syncing, you can specity a block height in schema.yaml


