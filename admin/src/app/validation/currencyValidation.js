import isEmpty from 'is-empty'


export const currencyValidations = async (details) => {

    try {
        let errors = {};
        console.log(details,'details')
       
            if (isEmpty(details.type)) {
                errors.type = "Currencytype field is required"
            }
            if (isEmpty(details.currencyName)) {
                errors.currencyName = "currencyName field is required"
            }
            if (isEmpty(details.currencySymbol)) {
                errors.currencySymbol = "currencySymbol field is required"
            }
            if (isEmpty(details.withdrawFee)) {
                errors.withdrawFee = "WihthdrawFee field is required"
            }
            else if (isNaN(details.withdrawFee) === true) {
                errors.withdrawFee = '"WithdrawFee" must be a number'
            }
            else if (parseFloat(details.withdrawFee) === 0 || parseFloat(details.withdrawFee) < 0) {
                errors.withdrawFee = '"WithdrawFee" must be greater than zero';
            }
            if (isEmpty(details.minimumWithdraw)) {
                errors.minimumWithdraw = "MinimumWithdraw field is required"
            }
            else if (isNaN(details.minimumWithdraw) === true) {
                errors.minimumWithdraw = '"MinimumWithdraw" must be a number'
            }
            else if (parseFloat(details.minimumWithdraw) === 0 || parseFloat(details.minimumWithdraw) < 0) {
                errors.minimumWithdraw = '"MinimumWithdraw" must be greater than zero';
            }
            if (isEmpty(details.currencyImage)) {
                errors.currencyImage = "Image field is required"
            }
            if (isEmpty(details.withdrawLimit)) {
                errors.withdrawLimit = "withdrawLimit field is required"
            }
            else if (isNaN(details.withdrawLimit) === true) {
                errors.withdrawLimit = '"withdrawLimit" must be a number'
            }
            else if (parseFloat(details.withdrawLimit) === 0 || parseFloat(details.withdrawLimit) < 0) {
                errors.withdrawLimit = '"withdrawLimit" must be greater than zero';
            }
            if(details.currencytype=='crypto'){
                if (details.gateWay=="CoinPayment" ){
                    if(isEmpty(details.CoinpaymetNetWorkFee)){
                     errors.CoinpaymetNetWorkFee = "CoinpaymetNetWorkFee field is required"
                 }
                 else if (isNaN(details.CoinpaymetNetWorkFee) === true) {
                     errors.CoinpaymetNetWorkFee = '"CoinpaymetNetWorkFee" must be a number'
                 }
                 else if (parseFloat(details.CoinpaymetNetWorkFee) === 0 || parseFloat(details.CoinpaymetNetWorkFee) < 0) {
                     errors.CoinpaymetNetWorkFee = '"CoinpaymetNetWorkFee" must be greater than zero';
                 }
     
            }
           
        }
        
            if (details.currencytype=='token') {
                if (isEmpty(details.contractAddress)) {
                    errors.contractAddress = "contractAddress field is required"
                }
                
                if (isEmpty(details.minABI)) {
                    errors.minABI = "MinAbi field is required"
                }
                if (isEmpty(details.decimals)) {
                    errors.decimals = "Decimals field is required"
                }
                else if (isNaN(details.decimals) === true) {
                    errors.decimals = '"Decimals" must be a number'
                }
                else if (parseFloat(details.decimals) === 0 || parseFloat(details.decimals) < 0) {
                    errors.decimals = '"Decimals" must be greater than zero';
                }
                if (details.gateWay=="CoinPayment" ){
                    if(isEmpty(details.CoinpaymetNetWorkFee)){
                     errors.CoinpaymetNetWorkFee = "CoinpaymetNetWorkFee field is required"
                 }
                 else if (isNaN(details.CoinpaymetNetWorkFee) === true) {
                     errors.CoinpaymetNetWorkFee = '"CoinpaymetNetWorkFee" must be a number'
                 }
                 else if (parseFloat(details.CoinpaymetNetWorkFee) === 0 || parseFloat(details.CoinpaymetNetWorkFee) < 0) {
                     errors.CoinpaymetNetWorkFee = '"CoinpaymetNetWorkFee" must be greater than zero';
                 }
     
            }
            }
            if (details.type=='fiat') {
                if (isEmpty(details.bankName)) {
                    errors.bankName = "BankName field is required"
                }
                if (isEmpty(details.accountNo)) {
                    errors.accountNo = "Account Number field is required"
                }
                else if (isNaN(details.accountNo) === true) {
                    errors.accountNo = '"Account Number" must be a number'
                }
                if (isEmpty(details.holderName)) {
                    errors.holderName = "Holder Name field is required"
                }
                if (isEmpty(details.bankcode)) {
                    errors.bankcode = "IBAN Code  field is required"
                }
                if (isEmpty(details.country)) {
                    errors.country = "Country  field is required"
                }
                if (isEmpty(details.minimumdeposit)) {
                    errors.minimumdeposit = "Minimumdeposit field is required"
                }
                else if (isNaN(details.minimumdeposit) === true) {
                    errors.minimumdeposit = '"Minimumdeposit" must be a number'
                }
                else if (parseFloat(details.minimumdeposit) === 0 || parseFloat(details.minimumdeposit) < 0) {
                    errors.minimumdeposit = '"Minimumdeposit" must be greater than zero';
                }
                if (isEmpty(details.depositFee)) {
                    errors.depositFee = "DepositFee field is required"
                }
                else if (isNaN(details.depositFee) === true) {
                    errors.depositFee = '"DepositFee" must be a number'
                }
                else if (parseFloat(details.depositFee) === 0 || parseFloat(details.depositFee) < 0) {
                    errors.depositFee = '"DepositFee" must be greater than zero';
                }
            }
            if (!isEmpty(errors)) {
                return errors
            }
    }
    catch(err){

    }
}