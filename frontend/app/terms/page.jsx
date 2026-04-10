"use client";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 text-gray-800 py-10 px-4 md:px-16 mt-[40px]">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="mb-4 text-sm text-gray-500 text-center">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to RealTemple. By accessing or using our website, you agree 
            to comply with and be bound by these Terms and Conditions. If you do 
            not agree, please do not use our website.
          </p>
        </section>

        {/* Use of Website */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Use of Website</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You must be at least 18 years old to use this website.</li>
            <li>You agree not to use the website for unlawful purposes.</li>
            <li>We reserve the right to restrict or terminate access at any time.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Content & Information</h2>
          <p className="text-gray-700 leading-relaxed">
            All content including articles, images, magazines, and media is 
            provided for informational purposes only. We do not guarantee the 
            accuracy, completeness, or reliability of any content.
          </p>
        </section>

        {/* User Generated Content */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. User Submissions</h2>
          <p className="text-gray-700 leading-relaxed">
            By submitting content (images, text, or files), you grant us the 
            right to use, display, and distribute it on our platform.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
            <li>No abusive, illegal, or harmful content is allowed.</li>
            <li>We reserve the right to remove any content without notice.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website including logos, text, and images are 
            the property of RealTemple and may not be copied or reused without 
            permission.
          </p>
        </section>

        {/* Third Party Links */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not 
            responsible for their content, policies, or practices.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any direct or indirect damages arising from 
            the use of this website, including data loss, service interruptions, 
            or inaccuracies.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Your use of this website is also governed by our Privacy Policy. 
            Please review it to understand how we collect and use your data.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms at any time without prior notice. 
            Continued use of the website means you accept the updated Terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed by the laws of India. Any disputes 
            will be subject to the jurisdiction of local courts.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2 font-medium">Email: support@realtemple.com</p>
        </section>

      </div>
    </div>
  );
}