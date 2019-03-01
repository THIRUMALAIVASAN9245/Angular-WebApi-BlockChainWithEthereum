import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'transaction-details',
  templateUrl: './transaction-details.component.html'
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails: any;
  transactionHashId: any;
  status: string;
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private routerService: RouterService, private web3Service: Web3Service) {
    this.transactionHashId = activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.web3Service.getTransactionDetails(this.transactionHashId).subscribe(transactionDetails => {
      this.transactionDetails = transactionDetails;
    }, err => {
      this.setStatus('Error getting transaction details.')
    });
  }

  getTransactionData(data : any) {
    var response = this.web3Service.getTransactionData(data);
    var result = JSON.parse(response);
    return  response ;
    }  

  setStatus = message => {
    this.status = message;
  };

  onClickBack() {
    const previousUrl = this.routerService.getPreviousUrl();
    this.router.navigateByUrl(previousUrl);
  }
}
