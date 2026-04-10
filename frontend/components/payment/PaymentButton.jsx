// components/PaymentButton.jsx
import { displayRazorpay } from "@/utils/Razorpay";

export default function PaymentButton({ formData }) {
  const handleClick = () => {
    displayRazorpay(formData);
  };

  return (
    <button type="button" onClick={handleClick}>
      Pay ₹{formData.amount || 500} with Razorpay
    </button>
  );
}
