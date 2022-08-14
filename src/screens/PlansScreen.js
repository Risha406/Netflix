import React, {useEffect, useState} from 'react'
import './PlansScreen.css';
import db from "../firebase";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import {loadStripe} from "@stripe/stripe-js";
import { current } from '@reduxjs/toolkit';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user= useSelector(selectUser);
    const [subscription, setSubscription] =useState(null);

    useEffect(() =>{    // to see on which subscription the customer is
        db.collection('customers')
        .doc(user.uid)  //creating the id of customers in firbease
        .collection('subscriptions') //creating the id of subscr. in firebase
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,  //looping through the roles
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid])

    useEffect(() => {
        db.collection('products').where("active", "==", true)  //products which are active in firebase
        .get().then((querySnapshot) => {   //cos we query by active
            const products = {};
            querySnapshot.forEach(async productDoc => {  //return bunch of docs cos produts is an array
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => { //for every single doc and creating a price object which will have id and data
                    products[productDoc.id].prices = { 
                        priceId: price.id,
                        priceData: price.data()

                    }
                })
            })
            setProducts(products);
        });
    }, []);
    console.log(products)
    console.log(subscription)

    const loadCheckout = async(priceId) => {
        const docRef= await db.collection("customers").doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin, //get the customer to come back to the page they were on
            cancel_url: window.location.origin,
        })

        docRef.onSnapshot(async(snap)=>{
            const{error, sessionId} = snap.data();  //destructure the snap.data object
            if (error) {
                //Show an rror to your customer and
                //Inspect your cloud function logs in the frebase console.
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId){
                // We have a session, lets redirect to checkout
                //Initialise Stripe
                const stripe = await loadStripe("pk_test_51I7Zy0JLAoA9L4fPCOCU1Hfvx63PWQX8I2Rj2nFqnhNTZFkxfAOIGNNvoJnUY119h7stKKnQlbq9PH7V2xPJjsIG00ckpa1CN4");
                stripe.redirectToCheckout({ sessionId});
            }
        })
    }

    return (
        <div className="plansScreen">
            <br/>
            {subscription && <p>Renewal Date:{""} {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>} 
            {Object.entries(products).map(([productId, productData]) => {
                //add some logic to check if users subscription is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
                return (
                    <div key = {productId} className={`${
                        isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}>
                        <div className="plansScreen__info"> 
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>  
                            {isCurrentPackage?'Current Package': 'Subscribe'}  
                        </button>
                    </div>    
                )
            })}  
        </div>
    )
}

export default PlansScreen

//destructure the array that comes back in "Object"

//Only trigger the loadCheckout if iis CurrentPackage

//after button (If currentPackage then show {Current Package} else show Subscribe)