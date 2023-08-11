import isEmpty from 'is-empty'


export const P2pValidation = async (details) => {

    try {
        let errors = {};
        // console.log(details, 'detailsp2p')

        if (isEmpty(details.firstCurrency)) {
            errors.firstCurrency = "BaseCurrency field is required"
        }
        if (isEmpty(details.secondCurrency)) {
            errors.secondCurrency = "QuoteCurrency field is required"
        }
        if (details.secondCurrency == details.firstCurrency) {
            errors.secondCurrency = "QuoteCurrency & BaseCurrency must not be same"
        }
        if (isEmpty(details.transactionfee)) {
            errors.transactionfee = "Transactionfee field is required"
        }
        else if (isNaN(details.transactionfee) === true) {
            errors.transactionfee = '"Transactionfee" must be a number'
        }
        else if (parseFloat(details.transactionfee) === 0 || parseFloat(details.transactionfee) < 0) {
            errors.transactionfee = '"Transactionfee" must be greater than zero';
        }
        // if (isEmpty(details.markPrice)) {
        //     errors.markPrice = "Markprice field is required"
        // }
        // else if (isNaN(details.markPrice) === true) {
        //     errors.markPrice = '"Markprice" must be a number'
        // }
        // else if (parseFloat(details.markPrice) === 0 || parseFloat(details.markPrice) < 0) {
        //     errors.markPrice = '"Markprice" must be greater than zero';
        // }
        if (!isEmpty(errors)) {
            return errors
        }
    }
    catch (err) {

    }
}


export const AddSupportCategoryVal = async (details) => {
    try {
        let errors = {}
        console.log(details, '===========detailssssss')
        if (isEmpty(details.supportCategory)) {
            errors.supportCategory = "Category field is required"
        }
        if (!isEmpty(errors)) {
            return errors
        }

    }
    catch (err) {

    }

}
export const AddFaqCategoryVal = async (details) => {
    try {
        let errors = {}
        console.log(details, '===========detailssssss')
        if (isEmpty(details.name)) {
            errors.name = "Category field is required"
        }
        if (!isEmpty(errors)) {
            return errors
        }

    }
    catch (err) {

    }

}
export const AddFaqVal = async (details) => {
    try {
        let errors = {}
        console.log(details, '===========detailssssss')
       
        if (isEmpty(details.question)) {
            errors.question = "Question field is required"
        }
        if (isEmpty(details.question)) {
            errors.answer = "Answer field is required"
        }
        if (!isEmpty(errors)) {
            return errors
        }

    }
    catch (err) {

    }

}