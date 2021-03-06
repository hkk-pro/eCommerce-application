const CartCheckoutStatus = {

    CHECKOUT_STARTED:"CHECKOUT_STARTED",
    CHECKOUT_NOT_STARTED:"CHECKOUT_NOT_STARTED",
    CHECKOUT_COMPLETED:"CHECKOUT_COMPLETED"

}

const CartCheckoutAction = {

    START_CHECKOUT:"START_CHECKOUT",
    ABORT_CHECKOUT:"ABORT_CHECKOUT",
    COMPLETE_CHECKOUT:"COMPLETE_CHECKOUT"

}

const CartContentsAction = {

    ADD_ITEM:"ADD_ITEM",
    CREATE_CART:"CREATE_CART"

}

const ErrorCode = {

    CART_NOT_FOUND: "CART_NOT_FOUND",
    CART_TRANSACTION_ALREADY_STARTED: "CART_TRANSACTION_ALREADY_STARTED",
    CART_TRANSACTION_ALREADY_COMPLETED: "CART_TRANSACTION_ALREADY_COMPLETED",
    FIELD_VALIDATION_FAILURE: "FIELD_VALIDATION_FAILURE",
    PAYMENT_NOT_ACCEPTED: "PAYMENT_NOT_ACCEPTED"

}

const VendorPaymentOutcome = {

    NOT_ACCEPTED: "NOT_ACCEPTED",
    ACCEPTED: "ACCEPTED"

}

const TransactionAction = {

    CREATE_TRANSACTION: "CREATE_TRANSACTION",
    ABORT_TRANSACTION: "ABORT_TRANSACTION",
    COMPLETE_TRANSACTION: "COMPLETE_TRANSACTION"

}

const TransactionType = {

    CART_CHECKOUT: "CART_CHECKOUT"

}

module.exports = {
    TransactionAction,
    TransactionType,
    VendorPaymentOutcome,
    ErrorCode,
    CartCheckoutAction,
    CartCheckoutStatus,
    CartContentsAction
}