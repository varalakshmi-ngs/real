import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b pb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          Welcome to the Real Temple privacy policy page. We respect your privacy and are committed to protecting your personal data.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p className="text-gray-600">
            We may collect personal information such as your name, email address, phone number, and payment details when you register for events, subscribe to our newsletter, or make a donation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your information is used to process donations, send updates about our church, respond to inquiries, and improve our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">3. Data Security</h2>
          <p className="text-gray-600">
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">4. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions connecting to this privacy policy or our privacy practices, please contact us at our provided contact information.
          </p>
        </section>
      </div>
    </div>
  );
}
