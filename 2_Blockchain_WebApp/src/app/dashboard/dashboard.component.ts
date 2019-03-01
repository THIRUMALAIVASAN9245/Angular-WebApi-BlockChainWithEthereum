import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Web3Service } from '../services/web3.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
    status: string;
    blockCount: any;
    transactionCount: any;
    accountCount: any;
    peerCount: any;
    blocks: any;
    transactionDetails: any;
    title = 'Welcome to BlockChain Dashboard!';

    constructor(private router: Router, private web3Service: Web3Service) { }

    ngOnInit(): void {
        // this.web3Service.getBlockCount().subscribe(blockCount => {
        //     this.blockCount = blockCount;
        // }, err => {
        //     this.setStatus('Error getting block count');
        // });

        this.web3Service.getTransactionCount().subscribe(transactionCount => {
            this.transactionCount = transactionCount;
        }, err => {
            this.setStatus('Error getting transaction count');
        });

        this.web3Service.getLatestBlocks().subscribe(blockDetails => {
            this.blocks = blockDetails;
        }, err => {
            this.setStatus('Error getting blocks.')
        });
        this.web3Service.getLatestTransactions().subscribe(transactionDetails => {
            this.transactionDetails = transactionDetails.filter(x => x.input != "0x6e756c6c" && x.input != "0x");;
        }, err => {
            this.setStatus('Error getting account Details');
        });
    }

    getTransactionData(data: any) {
        if (!data) {
            return {};
        }
        var response = this.web3Service.getTransactionData(data);

        return JSON.parse(response);
    }

    setStatus = message => {
        this.status = message;
    };
}
