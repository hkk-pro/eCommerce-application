import { Router } from 'express';

import { validateCreditCard } from '../../utility/validation';
import { GetCartDetails } from '../../database/cart';
import { CartCheckoutStatus, ErrorCode, VendorPaymentOutcome } from '../../../common/constants';
import { checkoutCartCreditCard } from '../../routines/checkoutCartCreditCard';

export const Checkout = Router();

Checkout.post("/credit", async ({body},res)=>{

    const cartDetails = await GetCartDetails(body.cartId);

    if (!cartDetails) {

        return res.json({

            status: 404,
            description: `Cart with ID ${body.cartId} not found.`,
            errorCode: ErrorCode.CART_NOT_FOUND,
            success: false

        });

    }

    if (cartDetails.checkoutStatus === CartCheckoutStatus.CHECKOUT_STARTED) {

        return res.json({

            status: 403,
            description: `Transaction is already processing for cart ${body.cartId}.`,
            errorCode: ErrorCode.CART_TRANSACTION_ALREADY_STARTED,
            success: false

        });

    }

    if (cartDetails.checkoutStatus === CartCheckoutStatus.CHECKOUT_COMPLETED) {

        return res.json({

            status: 403,
            description: `Transaction has already been successfully completed for cart ${body.cartId}.`,
            errorCode: ErrorCode.CART_TRANSACTION_ALREADY_COMPLETED,
            success: false

        });

    }

    const { valid, errors } = validateCreditCard(body.creditCardDetails);

    if (!valid) {

        return res.json({

            status: 400,
            description: "Some fields did not validate.",
            errorCode: ErrorCode.FIELD_VALIDATION_FAILURE,
            errors,
            success: false

        });

    }

    const { status } = await checkoutCartCreditCard({

        cartDetails, 
        creditCardDetails: body.creditCardDetails, 
        orderDetails: body.orderDetails, 
        deliveryDetails: body.deliveryDetails
    
    });

    switch (status) {

        case VendorPaymentOutcome.NOT_ACCEPTED: {

            return res.json({

                status: 403,
                description: `Payment not accepted by third party vendor.`,
                errorCode: ErrorCode.PAYMENT_NOT_ACCEPTED,
                success: false
    
            });

        }

        case VendorPaymentOutcome.ACCEPTED: {
                
            res.json({

                status: 200,
                description: `Cart checkout successful.`,
                success: true

            });

            break;

        }

    }

});