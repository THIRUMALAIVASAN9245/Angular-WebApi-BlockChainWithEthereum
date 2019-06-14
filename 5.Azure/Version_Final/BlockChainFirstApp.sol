pragma solidity >=0.4.25 <0.6.0;

contract BlockChainFirstApp
{
     //Set of States
    enum StateType { PolicyRequest, PolicyRespondInValid, PolicyRespondValid, SubmitBillDetailsRequest, 
	SubmitBillDetailsResponse, RejectClaimRequest, ApprovedClaimRequest, HealthDBApprovalRequest,
	HealthDBRejectResponse, HealthDBApprovedResponse, FinalInsurerRejectResponse, FinalInsurerApprovedResponse }
	
	enum PropertyTypeEnum {Diabetes, Sugar, Accident, Others}	
	
    //List of properties
    StateType public  State;
    address public  Hospital;
    address public  Insurer;
	address public  HealthDb;

    string public RequestMessage;
	string public Description;
    string public ResponseMessage;	
	
	string public BillNumber;
	int public BillAmount;	
	PropertyTypeEnum public PropertyType;

    // constructor function
    constructor(string memory message) public
    {
        Insurer = msg.sender;
        RequestMessage = message;
        State = StateType.PolicyRequest;
		Description = "Verify Policy Number - Request";
    }

    // call this function to verify policy request
    function VerifyPolicyStatusRequest(string memory requestMessage) public
    {
        if (Hospital != msg.sender)
        {
            revert();
        }

        RequestMessage = requestMessage;
        State = StateType.PolicyRequest;
		Description = "Verify Policy Number - Request";
    }

    // call this function to return policy status 
    function VerifyPolicyStatusResponseValid() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "Valid Policy Number";
        State = StateType.SubmitBillDetailsRequest;
		Description = "Verify Policy Number - Response";
    }
	
	// call this function to return policy status 
    function VerifyPolicyStatusResponseInValid() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "InValid Policy Number";
        State = StateType.PolicyRespondInValid;
		Description = "Verify Policy Number - Response";
    }
	
	// call this function to return policy status 
    function SubmitBillDetailsRequest(PropertyTypeEnum treatmentType, string memory billNumber,int billAmount, string memory description) public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        PropertyType = treatmentType;
		BillNumber = billNumber;
		BillAmount = billAmount;
		Description = description;
        State = StateType.SubmitBillDetailsResponse;
		Description = "SubmitBillDetails - Request";
    }
	
	// call this function to return policy status 
    function RejectClaimRequest() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "Claim Rejacted";
        State = StateType.RejectClaimRequest;
		Description = "Claim Rejacted - Response";
    }
	
	// call this function to return policy status 
    function ApprovedClaimRequest() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "Claim Approved";
        State = StateType.ApprovedClaimRequest;
		Description = "Claim Approved - Response";
    }
	
	// call this function to return policy status 
    function HealthDBApprovalRequest() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "Verify Approval HealthDb - Request";
        State = StateType.HealthDBApprovalRequest;
		Description = "Approval HealthDB - Request";
    }
	
	// call this function to return policy status 
    function HealthDBRejectResponse() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "HealthDB Claim Rejacted";
        State = StateType.HealthDBRejectResponse;
		Description = "HealthDB Claim Rejacted - Response";
    }
	
	// call this function to return policy status 
    function HealthDBApprovedResponse() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "HealthDB Claim Approved";
        State = StateType.HealthDBApprovedResponse;
		Description = "HealthDB Claim Approved - Response";
    }
	
	// call this function to return policy status 
    function FinalInsurerRejectResponse() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "HealthDB Claim Rejacted";
        State = StateType.FinalInsurerRejectResponse;
		Description = "Insurer Claim Rejacted - Response";
    }
	
	// call this function to return policy status 
    function FinalInsurerApprovedResponse() public
    {
        Insurer = msg.sender;

        // call ContractUpdated() to record this action
        ResponseMessage = "HealthDB Claim Approved";
        State = StateType.FinalInsurerApprovedResponse;
		Description = "Insurer Claim Approved - Response";
    }
}