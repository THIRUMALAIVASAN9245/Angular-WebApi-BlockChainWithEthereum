import { Component } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'view-blocks',
  templateUrl: './view-blocks.component.html'
})
export class ViewBlocksComponent {
  blocks: any;
  status: string;

  constructor(private router: Router,private web3Service: Web3Service) {
    this.getBlocks();
  }

  getBlocks() {
    this.web3Service.getBlocks().subscribe(blockDetails => {
      this.blocks = blockDetails;
    }, err => {
      this.setStatus('Error getting blocks.')
    })
  };

  setStatus = message => {
    this.status = message;
  };
}
