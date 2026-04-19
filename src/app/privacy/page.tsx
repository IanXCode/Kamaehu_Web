import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Kamaehu Gym",
  description: "Privacy Policy for Kamaehu Gym - Your fitness tracking app",
};

export default function PrivacyPolicy() {
  const lastUpdated = "April 19, 2026";

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-foreground-muted mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Introduction
              </h2>
              <p className="text-foreground-muted mb-4">
                Kamaehu Gym (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our mobile application
                and related services (collectively, the &quot;App&quot;).
              </p>
              <p className="text-foreground-muted">
                By using Kamaehu Gym, you agree to the collection and use of
                information in accordance with this policy. If you do not agree with
                this policy, please do not use our App.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                1. Account Information
              </h3>
              <p className="text-foreground-muted mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Email address</li>
                <li>Username and display name</li>
                <li>Profile photo (optional)</li>
                <li>Password (stored securely hashed)</li>
              </ul>
              <p className="text-foreground-muted">
                You may also sign in using Apple Sign-In, which provides us with your
                Apple ID email and name based on your Apple ID settings.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                2. Health and Fitness Data
              </h3>
              <p className="text-foreground-muted mb-4">
                To provide personalized fitness tracking and nutrition recommendations,
                we collect:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Date of birth and biological sex</li>
                <li>Height and weight</li>
                <li>Body measurements (waist, chest, arms, etc.)</li>
                <li>Body fat percentage (optional)</li>
                <li>Fitness goals (weight loss, muscle gain, etc.)</li>
                <li>Activity level</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                3. Workout Data
              </h3>
              <p className="text-foreground-muted mb-4">
                When you log workouts, we store:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Exercise names, sets, reps, and weights</li>
                <li>Workout duration and timestamps</li>
                <li>Personal records (PRs)</li>
                <li>Workout notes and ratings</li>
                <li>Workout photos and videos (if you choose to add them)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                4. Nutrition Data
              </h3>
              <p className="text-foreground-muted mb-4">
                When you log meals and food, we collect:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Food names and nutritional information (calories, protein, carbs, fat)</li>
                <li>Meal timestamps and types (breakfast, lunch, etc.)</li>
                <li>Food photos (if you choose to add them)</li>
                <li>Water intake logs</li>
                <li>Barcode scans for food lookup</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                5. Social Data
              </h3>
              <p className="text-foreground-muted mb-4">
                When you use our social features, we collect:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Posts you create (workouts, meals, progress updates)</li>
                <li>Comments and likes</li>
                <li>Who you follow and who follows you</li>
                <li>Profile visibility settings (public or private)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                6. Device Information
              </h3>
              <p className="text-foreground-muted mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Device type and operating system</li>
                <li>Push notification tokens (for sending notifications)</li>
                <li>App version</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Third-Party Integrations
              </h2>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Apple Health (iOS)
              </h3>
              <p className="text-foreground-muted mb-4">
                With your permission, we can read and write data to Apple Health:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li><strong>Read:</strong> Workouts, weight, water intake from other apps</li>
                <li><strong>Write:</strong> Your logged workouts, nutrition data, and weight to Apple Health</li>
              </ul>
              <p className="text-foreground-muted">
                Apple Health integration is optional and can be enabled or disabled in
                your device settings at any time.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Spotify
              </h3>
              <p className="text-foreground-muted mb-4">
                If you connect your Spotify account, we access:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Your currently playing track during workouts</li>
                <li>Track information (name, artist, album art)</li>
                <li>Audio features (tempo, energy level)</li>
              </ul>
              <p className="text-foreground-muted">
                We store OAuth tokens securely to maintain your connection. We do not
                control your Spotify playback or access your playlists beyond the
                currently playing track.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p className="text-foreground-muted mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Provide and personalize our fitness tracking services</li>
                <li>Calculate personalized calorie and macro targets</li>
                <li>Track your workout progress and personal records</li>
                <li>Display your activity to followers (based on your privacy settings)</li>
                <li>Send push notifications (workout reminders, social interactions)</li>
                <li>Improve our app and develop new features</li>
                <li>Communicate with you about your account</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Camera and Photo Access
              </h2>
              <p className="text-foreground-muted mb-4">
                We request camera and photo library access for:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li><strong>Barcode scanning:</strong> To look up food nutrition information</li>
                <li><strong>Food photos:</strong> To log meals with images</li>
                <li><strong>Profile photos:</strong> To set your profile picture</li>
                <li><strong>Progress photos:</strong> To track your fitness journey</li>
                <li><strong>Workout media:</strong> To capture exercise form or gym moments</li>
              </ul>
              <p className="text-foreground-muted">
                Photos you take are stored securely and only shared according to your
                post privacy settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Push Notifications
              </h2>
              <p className="text-foreground-muted mb-4">
                With your permission, we send push notifications for:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Workout reminders</li>
                <li>Hydration reminders</li>
                <li>Protein/nutrition reminders</li>
                <li>Sleep reminders</li>
                <li>Social interactions (likes, comments, follows)</li>
                <li>Rest timer alerts during workouts</li>
              </ul>
              <p className="text-foreground-muted">
                You can customize notification preferences in the app settings, including
                setting quiet hours when notifications are silenced.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Storage and Security
              </h2>
              <p className="text-foreground-muted mb-4">
                Your data is stored securely using Supabase, a trusted cloud database
                provider. We implement:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Row-level security (RLS) to ensure you can only access your own data</li>
                <li>Secure password hashing</li>
                <li>Secure storage of OAuth tokens</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Sharing
              </h2>
              <p className="text-foreground-muted mb-4">
                We do not sell your personal data. We share data only:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li><strong>With your consent:</strong> Social posts shared with followers</li>
                <li><strong>With service providers:</strong> Supabase (database), payment processors</li>
                <li><strong>For legal compliance:</strong> When required by law</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your Rights and Choices
              </h2>
              <p className="text-foreground-muted mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-foreground-muted mb-4 space-y-1">
                <li><strong>Access:</strong> View all data we have about you</li>
                <li><strong>Correct:</strong> Update inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Request a copy of your data</li>
                <li><strong>Opt-out:</strong> Disable notifications, disconnect integrations</li>
              </ul>
              <p className="text-foreground-muted">
                To exercise these rights, please contact us at the email below.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Retention
              </h2>
              <p className="text-foreground-muted">
                We retain your data for as long as your account is active. When you
                delete your account, we permanently delete all associated data,
                including workout logs, nutrition data, social posts, and profile
                information. Some anonymized, aggregated data may be retained for
                analytics purposes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-foreground-muted">
                Kamaehu Gym is not intended for children under 13. We do not knowingly
                collect information from children under 13. If you believe we have
                collected data from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Changes to This Policy
              </h2>
              <p className="text-foreground-muted">
                We may update this Privacy Policy from time to time. We will notify
                you of significant changes through the app or via email. Your continued
                use of Kamaehu Gym after changes constitutes acceptance of the updated
                policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-foreground-muted mb-4">
                If you have questions about this Privacy Policy or our data practices,
                please contact us at:
              </p>
              <p className="text-foreground-muted">
                <strong>Email:</strong> privacy@kamaehugym.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
