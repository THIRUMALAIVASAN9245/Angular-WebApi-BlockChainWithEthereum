import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Web3Service } from '../services/web3.service';

@Component({
    selector: 'view-transaction',
    templateUrl: './view-transaction.component.html'
})
export class viewTransactionComponent implements OnInit {
    transactionDetails: any;
    status: string;

    constructor(private router: Router, private web3Service: Web3Service) { }

    ngOnInit() {
        this.web3Service.getTransactions().subscribe(transactionDetails => {
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
