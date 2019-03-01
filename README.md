# Angular + WebApi + BlockChain With Ethereum

**Overview:**

Nodes: Hospital, Health database (Govt Entity), Insurer.

- The user will provide the health insurance number while admitting in the hospital and request to proceed the treatment using the policy number.
 - After that the hospital management request corresponding insurer to check the policy number is valid or not using smart contract. 
 - once the response is positive to proceed the process, the management decided to move on to the next step. 
 - Then hospital management analyzed the patient’s condition and come up with the detailed bill summary and type of treatment which the user needs.  
 - Once hospital management finalized the required treatment and expenses amount for the user, they again request the insurer to confirm the eligible status using smart contract. 
 - After that, insurer request the health database to check whether the user already taken the treatment related to that particular disease and the history of the medical treatment. 
 - Once the insurer gets the response from the health database they convey the eligible status and the eligible amount of the user to the hospital management. 
 - Then the hospital management complete the billing process of the user based on the claim settlement.
 - Each request and response will be noted in blocks as a transaction.
 
 ------------------------------------------- **Hospital Application Screen 1:** -------------------------------------------
 
   <a><img src="https://github.com/THIRUMALAIVASAN9245/Angular-WebApi-BlockChainWithEthereum/blob/master/BlockChain_Screen1.jpg"/></a>
 
 ------------------------------------------- **Hospital Application Screen 2:** -------------------------------------------
 
   <a><img src="https://github.com/THIRUMALAIVASAN9245/Angular-WebApi-BlockChainWithEthereum/blob/master/BlockChain_Screen2.jpg"/></a>
