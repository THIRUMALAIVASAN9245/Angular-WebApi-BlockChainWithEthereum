import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Web3 = require('web3');
declare var window: any;
declare var require: any

@Injectable()
export class Web3Service {

    public web3: any;

    constructor() {
        this.checkAndInstantiateWeb3();
    }

    checkAndInstantiateWeb3 = () => {
        if (typeof window.web3 !== 'undefined') {
            this.web3 = new Web3(window.web3.currentProvider);
        } else {
            const httpProvider = new Web3.providers.HttpProvider("http://127.0.0.1:8101");
            this.web3 = new Web3(httpProvider);
        }
    };

    getAccounts(): Observable<any> {
        let accountDetails = [];
        return Observable.create(observer => {
            this.web3.eth.getAccounts((err, accounts) => {
                if (err != null) {
                    observer.error('There was an error fetching your accounts.')
                }

                if (accounts.length === 0) {
                    observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
                }
                for (let account of accounts) {
                    let accountDetail = this.getBalance(account);
                    accountDetails.push(accountDetail);
                }

                observer.next(accountDetails)
                observer.complete()
            });
        });
    }

    getBlockCount(): any {
        const response = this.web3.eth.blockNumber;
        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getTransactionCount(): any {
        const blocks = this.web3.eth;
        let response = 0;
        var currentBlock = blocks.blockNumber;
        for (var i = currentBlock; i >= 0; --i) {
            try {
                //var block = this.web3.eth.getBlockTransactionCount(currentBlock);
                var block = blocks.getBlock(i, true);
                if (block && block.transactions) {
                    response = response + block.transactions.length;
                }
            } catch (e) { console.error("Error in transaction " + i, e); }
        }
        console.log(response);
        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getAccountCount(): Observable<any> {
        return Observable.create(observer => {
            this.web3.eth.getAccounts((err, accounts) => {
                if (err != null) {
                    observer.error('There was an error fetching your accounts.')
                }

                observer.next(accounts.length)
                observer.complete()
            });
        });
    }

    getPeerCount(): Observable<any> {
        debugger;
        return Observable.create(observer => {
            this.web3.net.getPeerCount((err, peers) => {
                if (err != null) {
                    observer.error('There was an error fetching your peers.')
                }
                observer.next(peers)
                observer.complete()
            });
        });
    }

    createNewAccount(accountPassword): Observable<any> {
        return Observable.create(observer => {
            this.web3.eth.personal.newAccount(accountPassword).then(status => {
                console.log(status);
            });

            observer.next(true)
            observer.complete()
        })
    }

    sendTransaction(from, to, value): any {
        let response;
        const tx = { from: from, to: to, value: value };
        this.web3.eth.sendTransaction(tx, (err, txHash) => {
            response = txHash;
            this.web3.eth.getTransaction(txHash, (err, tx) => {
                console.log(tx);
            });

            this.web3.eth.getBlock(1, (err, block) => {
                console.log(block.transactions);
            });

        });

        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getAccountList(): Observable<any> {
        return Observable.create(observer => {
            this.web3.eth.getAccounts((err, accounts) => {
                if (err != null) {
                    observer.error('There was an error fetching your accounts.')
                }

                observer.next(accounts)
                observer.complete()
            });
        });
    }

    getBalance(account): any {
        let accountDetail = { accountNumber: account, balanceAmount: "0", status: "Locked" };
        accountDetail["balanceAmount"] = this.web3.eth.getBalance(account).toNumber();

        return accountDetail;
    }

    getBlocks(): Observable<any> {
        let response = [];
        var currentBlock = this.web3.eth.blockNumber;
        for (var i = currentBlock; i >= 0; --i) {
            try {
                var block = this.web3.eth.getBlock(i, true);
                if (block && block.transactions.length) {
                    response.push(block);
                }
            } catch (e) { console.error("Error in block " + i, e); }
        }

        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getBlockDetails(blockNumber: any): Observable<any> {
        var blockDetails = this.web3.eth.getBlock(blockNumber, true);
        return Observable.create(observer => {
            observer.next(blockDetails)
            observer.complete()
        });
    }

    getTransactions(): any {
        let response = [];
        var currentBlock = this.web3.eth.blockNumber;
        for (var i = currentBlock; i >= 0; --i) {
            try {
                var block = this.web3.eth.getBlock(i, true);
                if (block && block.transactions) {
                    block.transactions.forEach(function (e) {
                        var transactions = e;
                        response.push(transactions);
                    });
                }
            } catch (e) { console.error("Error in block " + i, e); }
        }

        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getTransactionDetails(transactionHashId: any): Observable<any> {
        var transactionDetail = this.web3.eth.getTransaction(transactionHashId);
        return Observable.create(observer => {           
            observer.next(transactionDetail)
            observer.complete()
        });
    }

    getLatestBlocks(): Observable<any> {
        let response = [];
        var currentBlock = this.web3.eth.blockNumber;
        for (var i = currentBlock; i >= 0; --i) {
            try {
                var block = this.web3.eth.getBlock(i, true);
                if (block && block.transactions.length) {
                    response.push(block);
                    if (response.length == 5) {
                        return Observable.create(observer => {
                            observer.next(response)
                            observer.complete()
                        });
                    }
                }
            } catch (e) { console.error("Error in block " + i, e); }
        }

        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getLatestTransactions(): any {
        let response = [];
        var currentBlock = this.web3.eth.blockNumber;
        for (var i = currentBlock; i >= 0; --i) {
            try {
                var block = this.web3.eth.getBlock(i, true);
                if (block && block.transactions) {
                    block.transactions.forEach(function (e) {
                        var transactions = e;
                        response.push(transactions);
                    });
                }
                if (response.length == 5) {
                    return Observable.create(observer => {
                        observer.next(response)
                        observer.complete()
                    });
                }
            } catch (e) { console.error("Error in block " + i, e); }
        }

        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    getTransactionData(data : any): any {
        let response = this.web3.toAscii(data);  
        return response;     
    } 
}