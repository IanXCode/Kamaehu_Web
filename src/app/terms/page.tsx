import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Kamaehu Gym",
  description: "Terms of Service for Kamaehu Gym - Your fitness tracking app",
};

export default function TermsOfService() {
  const lastUpdated = "April 19, 2026";

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-foreground-muted mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-foreground-muted mb-4">
                By accessing or using Kamaehu Gym (&quot;the App&quot;), you agree to be
                bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to
                these Terms, you may not use the App.
              </p>
              <p className="text-foreground-muted">
                We may modify these Terms at any time. Your continued use of the App
                after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Description of Service
              </h2>
              <p className="text-foreground-muted">
                Kamaehu Gym is a fitness and wellness application that provides
                workout tracking, nutrition logging, social features, and personalized
                fitness recommendations. The App is currently in beta and features
                may change without notice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Account Registration
              </h2>
              <p className="text-foreground-muted mb-4">
                To use the App, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Keep your account credentials secure</li>
                <li>Not share your account with others</li>
                <li>Be responsible for all activity under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-foreground-muted">
                You must be at least 13 years old to create an account. If you are
                under 18, you must have parental consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. User Content
              </h2>
              <p className="text-foreground-muted mb-4">
                You retain ownership of content you create in the App (posts, photos,
                comments). By posting content, you grant us a non-exclusive,
                worldwide, royalty-free license to use, display, and distribute your
                content within the App.
              </p>
              <p className="text-foreground-muted mb-4">
                You agree not to post content that:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Is illegal, harmful, or offensive</li>
                <li>Infringes on others&apos; intellectual property</li>
                <li>Contains spam, malware, or phishing</li>
                <li>Harasses, bullies, or threatens others</li>
                <li>Impersonates another person</li>
                <li>Promotes dangerous health practices</li>
              </ul>
              <p className="text-foreground-muted">
                We reserve the right to remove content that violates these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Health Disclaimer
              </h2>
              <p className="text-foreground-muted mb-4">
                <strong>
                  Kamaehu Gym is not a substitute for professional medical advice,
                  diagnosis, or treatment.
                </strong>
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>
                  Consult a healthcare provider before starting any fitness or
                  nutrition program
                </li>
                <li>
                  The calorie and macro recommendations are estimates and may not be
                  suitable for everyone
                </li>
                <li>
                  Stop exercising and seek medical attention if you experience pain,
                  dizziness, or other concerning symptoms
                </li>
                <li>
                  We are not responsible for any health issues that may result from
                  following information in the App
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Prohibited Conduct
              </h2>
              <p className="text-foreground-muted mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to the App or other accounts</li>
                <li>Interfere with the proper functioning of the App</li>
                <li>Scrape, crawl, or extract data from the App without permission</li>
                <li>Use the App for commercial purposes without authorization</li>
                <li>Create multiple accounts to circumvent restrictions</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-foreground-muted">
                The App, including its design, features, and content (excluding user
                content), is owned by Kamaehu and protected by intellectual property
                laws. You may not copy, modify, distribute, or reverse engineer any
                part of the App without our written permission.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Third-Party Services
              </h2>
              <p className="text-foreground-muted">
                The App integrates with third-party services (Apple Health, Spotify).
                Your use of these services is governed by their respective terms and
                privacy policies. We are not responsible for third-party services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Termination
              </h2>
              <p className="text-foreground-muted mb-4">
                We may suspend or terminate your account if you violate these Terms.
                You may delete your account at any time through the App settings.
              </p>
              <p className="text-foreground-muted">
                Upon termination, your right to use the App ceases immediately.
                Provisions regarding intellectual property, disclaimers, and
                limitations of liability survive termination.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Disclaimers
              </h2>
              <p className="text-foreground-muted mb-4">
                THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
                OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </p>
              <p className="text-foreground-muted">
                We do not guarantee that the App will be error-free, uninterrupted,
                or secure. We are not responsible for any data loss or inaccuracies
                in calorie/macro calculations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Limitation of Liability
              </h2>
              <p className="text-foreground-muted">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, KAMAEHU SHALL NOT BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                DAMAGES ARISING FROM YOUR USE OF THE APP. OUR TOTAL LIABILITY SHALL
                NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS, IF ANY.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Indemnification
              </h2>
              <p className="text-foreground-muted">
                You agree to indemnify and hold harmless Kamaehu, its officers,
                directors, employees, and agents from any claims, damages, or
                expenses arising from your use of the App or violation of these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                13. Governing Law
              </h2>
              <p className="text-foreground-muted">
                These Terms are governed by the laws of the State of Hawaii, United
                States, without regard to conflict of law principles. Any disputes
                shall be resolved in the courts of Hawaii.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                14. Contact Us
              </h2>
              <p className="text-foreground-muted mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="text-foreground-muted">
                <strong>Email:</strong> legal@kamaehugym.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
