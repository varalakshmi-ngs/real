// utils/razorpay.js
import { APIURL } from "@/Core/rl";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const displayRazorpay = async (formData) => {
  // Send order request to backend
  const res = await fetch(`${APIURL}/web/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: formData.amount,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      purpose: formData.purpose,
    }),
  });

  const { orderId } = await res.json();

  // Load Razorpay SDK
  const loaded = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!loaded) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  // Initiate payment
  const options = {
    key: "rzp_test_zCMFNwSBlZt1gx", // From Razorpay dashboard
    amount: formData.amount * 100,
    currency: "INR",
    name: "Real Temple",
    description: `Donation - ${formData.purpose}`,
    image: "/logo.png",
    order_id: orderId,
    handler: async function (response) {
      const verifyRes = await fetch(`${APIURL}/web/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...response,
          ...formData,
        }),
      });

      const data = await verifyRes.json();
      if (data.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Failed!");
      }
    },
    prefill: {
      name: formData.fullName || "",
      email: formData.email || "",
      contact: formData.mobile || "",
    },
    theme: {
      color: "#e60023",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
