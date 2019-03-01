import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Web3Service } from '../services/web3.service';
import { PolicyService } from '../services/policy.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
    status: string;
    cliamStage: string;
    diseaseModel: string;
    title = 'Welcome to BlockChain Dashboard!';
    verifyPolicyNumberStatus: boolean;
    enterBillDetailsStatus: boolean;
    previewBillDetailsStatus: boolean;
    claimInsuranceStatus: boolean;
    claimInsuranceFinalStatus: boolean;
    TreatmentTypes: {};
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};
    policyNumberModel: number;
    verifyBillDetailResponse: any;

    constructor(private router: Router, private policyService: PolicyService,
        private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit(): void {
        this.cliamStage = "Verify Policy Number";
        this.TreatmentTypes = [
            { id: 0, type: "--select--" },
            { id: 1, type: "Accident" },
            { id: 2, type: "Illness" }
        ];
        this.newAttribute.TreatmentType = 0;
    }

    addFieldValue() {
        this.spinnerService.show();
        this.status = "";
        if (this.newAttribute.TreatmentType == 0) {
            this.spinnerService.hide();
            this.setStatus("Please select treatment type");
            return true;
        }
        if (this.newAttribute.BillNumber == undefined || this.newAttribute.BillNumber.trim() == "") {
            this.spinnerService.hide();
            this.setStatus("Please enter bill number");
            return true;
        }
        if (this.newAttribute.BillAmount == undefined || this.newAttribute.BillAmount.trim() == "") {
            this.spinnerService.hide();
            this.setStatus("Please enter bill amount");
            return true;
        }

        var result = this.filterByValue(this.TreatmentTypes, +this.newAttribute.TreatmentType);
        this.newAttribute.TreatmentType = result["type"];
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
        this.newAttribute.TreatmentType = result["id"];
        this.spinnerService.hide();
    }

    filterByValue(array, search): string {
        var result = array.filter(function (item) { return (item.id == search); });
        return result[0];
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }

    verifyPolicyNumber(): any {
        this.spinnerService.show();
        this.status = "";
        if (this.policyNumberModel == undefined || this.policyNumberModel == null) {
            this.spinnerService.hide();
            this.setStatus("Please enter policy number");
            return true;
        }

        this.policyService.verifyPolicyNumber(this.policyNumberModel).subscribe(response => {
            this.spinnerService.hide();
            console.log(response);
            if (!response.Status) {
                this.setStatus(response.Message);
            } else {
                this.verifyPolicyNumberStatus = true;
                this.cliamStage = "Enter Bill Details";
            }          
        }, err => {
            this.spinnerService.hide();
            this.setStatus('Error while verify policy number');
        });
    }

    enterBillDetails(): any {
        this.spinnerService.show();
        debugger;
        this.status = "";
        if (this.fieldArray.length == 0) {
            this.spinnerService.hide();
            this.setStatus("Please add bill details");
            return true;
        }

        this.enterBillDetailsStatus = true;
        this.cliamStage = "Preview Bill Details";
        this.spinnerService.hide();
    }

    previewBillDetails(): void {
        this.spinnerService.show();
        this.status = "";
        const billDetails = { PolicyId: this.policyNumberModel, Disease: this.diseaseModel, BillDetails: this.fieldArray };
        this.policyService.verifyBillDetails(billDetails).subscribe(response => {
            this.spinnerService.hide();
            console.log(response);
            this.verifyBillDetailResponse = response;
            this.previewBillDetailsStatus = true;
            this.cliamStage = "Claim Insurance";
            this.claimInsuranceFinalStatus = true;
        }, err => {
            this.spinnerService.hide();
            this.setStatus('Error while verify policy number');
        });
    }

    claimInsurance(): void {
        this.spinnerService.show();
        this.claimInsuranceStatus = true;
        this.cliamStage = "Verify Policy Number";
        this.status = "";
        this.policyNumberModel = null;
        this.fieldArray = [];
        this.newAttribute = {};
        this.newAttribute.TreatmentType = 0;
        this.spinnerService.hide();
    }

    ngClassVerifyPolicyNumber(): string {
        if (this.cliamStage === "Verify Policy Number") {
            return "bc_complete_active";
        }
        if (this.verifyPolicyNumberStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    ngClassEnterBillDetails(): string {
        if (this.verifyPolicyNumberStatus) {
            if (this.cliamStage === "Enter Bill Details") {
                return "bc_complete_active";
            }
            if (this.enterBillDetailsStatus === true) {
                return "bc_complete";
            }
        }
        return "";
    }

    ngClassPreviewBillDetails(): string {
        if (this.cliamStage === "Preview Bill Details") {
            return "bc_complete_active";
        }
        if (this.previewBillDetailsStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    ngClassClaimInsurance(): string {
        if (this.cliamStage === "Claim Insurance") {
            return "bc_complete_active";
        }
        if (this.claimInsuranceStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    verifyPolicyNumberHeader(): void {
        this.status = "";
        if (this.verifyPolicyNumberStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Verify Policy Number";
        }
    }

    enterBillDetailsHeader(): void {
        this.status = "";
        if (this.verifyPolicyNumberStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Enter Bill Details";
        }
    }

    previewBillDetailsHeader(): void {
        this.status = "";
        if (this.enterBillDetailsStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Preview Bill Details";
        }
    }

    claimInsuranceHeader(): void {
        this.status = "";
        if (this.previewBillDetailsStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Claim Insurance";
        }
    }

    setStatus = message => {
        this.status = message;
    };
}