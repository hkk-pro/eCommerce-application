import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Template } from './template.jsx';

const nodemailer = require("nodemailer");

import { GetCartDetails } from '../../database/cart';
import { CreateCustomer } from '../../database/customer'

export async function ProcessCreditCardTransaction({cartDetails, creditCardDetails, deliveryDetails, orderDetails}){

    // console.log("Sending email", creditCartDetails);

    // cartDetails = GetCartDetails(cartDetails.cartId);

    console.log("Order details?", orderDetails);

    let transporter = nodemailer.createTransport({
        host: "secure198.inmotionhosting.com",
        port: 465,
        secure: true,
        auth: {
            user: "noreply@elitebtc.com", 
            pass: "gm(mOD.C[Z[R" 
        }
    });
        
    let info = await transporter.sendMail({
        from: 'Commerce Application <noreply@elitebtc.com>', // sender address
        to: "Dave <vendor@elitebtc.com>", // list of receivers
        subject: "Order Received", // Subject line
        html: ReactDOMServer.renderToString(<Template date={new Date} cartDetails={cartDetails} creditCardDetails={creditCardDetails} deliveryDetails={deliveryDetails} orderDetails={orderDetails}/>)
    });

    console.log("Message sent: %s", info.messageId);  

    const customerId = await CreateCustomer({creditCardDetails});
    console.info("Storing customer details in database.", customerId);

    return { success : true };

}