import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'block-details',
  templateUrl: './block-details.component.html'
})
export class BlockDetailsComponent implements OnInit {
  blockDetails: any;
  blocksId: any;
  status: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private routerService: RouterService, private web3Service: Web3Service) {
    this.blocksId = activeRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.web3Service.getBlockDetails(this.blocksId).subscribe(blockDetails => {
      this.blockDetails = blockDetails;
    }, err => {
      this.setStatus('Error getting blocks details.')
    });
  }

  setStatus = message => {
    this.status = message;
  };
  
  onClickBack() {
    const previousUrl = this.routerService.getPreviousUrl();
    this.router.navigateByUrl(previousUrl);
  }
}
