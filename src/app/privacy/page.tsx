import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white">
      <div className="prose-sm mx-auto max-w-3xl px-4 py-14 text-brand-700/90">
        <h1 className="text-3xl font-bold text-brand-800">Privacy Policy</h1>
        <div className="mt-6 space-y-4 leading-relaxed">
          <p>
            {site.legalName} (&quot;we,&quot; &quot;us&quot;) operates {site.url}. This
            policy describes how we handle information you share with us.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">What we collect</h2>
          <p>
            When you submit a form, we collect the information you provide, such as
            your name, phone number, email address, and property details, so we can
            evaluate the property and contact you about your request.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">How we use it</h2>
          <p>
            We use your information solely to respond to your inquiry, prepare an
            offer, and communicate with you about your property. We do not sell,
            rent, or share your personal information with third parties for their
            marketing purposes.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">
            Communications &amp; SMS Terms
          </h2>
          <p>
            By submitting a form on this site, you consent to receive calls, text
            messages, and emails from {site.legalName} regarding your property
            inquiry, including messages sent via automated means. Consent is not a
            condition of any purchase or sale.
          </p>
          <p>
            Message and data rates may apply, and message frequency varies based on
            your inquiry. You can opt out of text messages at any time by replying
            STOP, or reply HELP for assistance. You may also contact us at{" "}
            {site.phone} or {site.email} to update your communication preferences.
            We do not share your mobile number or SMS consent with third parties
            for their marketing purposes.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">Questions</h2>
          <p>
            Contact us at <a href={`mailto:${site.email}`} className="text-accent-600">{site.email}</a>{" "}
            or {site.phone} with any privacy questions or to request deletion of your
            information.
          </p>
        </div>
      </div>
    </section>
  );
}
