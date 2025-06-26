import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-base-200 rounded-xl space-y-4 shadow-md"
      >
        <CardElement className="p-2 border rounded-md bg-base-100" />
        <button
          type="submit"
          className="font-semibold btn w-full rounded-lg bg-neutral"
          disabled={!stripe}
        >
          {/* {loading ? "Processing..." : "Pay Now"} */}
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </span>
          ) : (
            "Pay Now"
          )}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
