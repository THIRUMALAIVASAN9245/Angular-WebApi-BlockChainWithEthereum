## BlockChain Ethereum

**-------------------------  Node 1 ----------------------**


**STEP:1**
 - geth --datadir=./Node1 init myGenesis.json

**STEP:2**
- geth --datadir=./Node1 --networkid 1994 --rpc --rpccorsdomain "*" --rpcapi "admin,db,eth,miner,net,web3,personal" --port 30301 --rpcport 8101 --ipcdisable console 2>> Node1.log

**STEP:3**
 - personal.newAccount("password")
 - personal.unlockAccount(eth.accounts[0],"password",500000)
 - personal.newAccount("password")
 - personal.unlockAccount(eth.accounts[1],"password",500000)

**STEP:4**
 - eth.coinbase
 - eth.getBalance(eth.coinbase)
 - miner.start(1)
 - miner.stop()
 - eth.getBalance(eth.coinbase)

**-------------------------  Node 2 ----------------------**

**STEP:1**
 - geth --datadir=./Node2 init myGenesis.json

**STEP:2**
 - geth --datadir=./Node2 --networkid 1994 --rpc --rpccorsdomain "*" --rpcapi " admin,db,eth,miner,net,web3,personal" --port 30302 --rpcport 8102 --ipcdisable console 2>> Node2.log

**STEP:3**
 - personal.newAccount("password")
 - personal.unlockAccount(eth.accounts[0],"password",500000)
 - personal.newAccount("password")
 - personal.unlockAccount(eth.accounts[1],"password",500000)

**STEP:4**
 - eth.coinbase
 - eth.getBalance(eth.coinbase)
 - miner.start(1)
 - miner.stop()
 - eth.getBalance(eth.coinbase)

## Reference Link

 - https://medium.com/mercuryprotocol/how-to-create-your-own-private-ethereum-blockchain-dad6af82fc9f 

 - https://medium.com/@solangegueiros/https-medium-com-solangegueiros-setting-up-ethereum-private-network-on-windows-a72ec59f2198
