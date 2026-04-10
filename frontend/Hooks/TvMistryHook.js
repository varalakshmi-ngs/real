// hooks/useRazorpayPayment.js
import { APIURL } from "@/Core/rl";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useRazorpayPayment = () => {
  const initiatePayment = async (formData) => {
    const {
      fullName,
      mobile,
      amount,
      tvChannel = "",
      purpose = "",
      adCount = 0,
    } = formData;

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Step 1: Create order on backend
    const createOrderRes = await fetch(`${APIURL}/web/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        fullName,
        mobile,
        tvChannel,
        purpose,
        adCount,
      }),
    });

    const { orderId } = await createOrderRes.json();

    // Step 2: Load Razorpay SDK
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load payment gateway.");
      return;
    }

    // Step 3: Configure Razorpay options
    const options = {
      key: "rzp_test_zCMFNwSBlZt1gx", // Replace with your Key ID
      amount: amount * 100,
      currency: "INR",
      name: "Real Temple",
      description: `Tv Minitry Sponsering`,
      image: "/logo.png",
      order_id: orderId,
      handler: async (response) => {
        // Step 4: Verify payment signature
        const verifyRes = await fetch(`${APIURL}/web/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...response, ...formData }),
        });

        const result = await verifyRes.json();
        if (result.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: fullName || "",
        email: "",
        contact: mobile || "",
      },
      theme: {
        color: "#e60023",
      },
    };

    // Step 5: Open Razorpay modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { initiatePayment };
};
