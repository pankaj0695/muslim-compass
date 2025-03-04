"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer className="bg-[#ffeddf] py-16 px-6 text-gray-800 islamic-pattern">
      {/* Footer Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-28 items-stretch justify-center">
        {/* Column 1 - Logo & Description */}
        <div className="flex flex-row items-center md:items-start md:ml-[-60px]">
          <img
            src="/muslim-compass-logo.png"
            alt="Muslim Compass Logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-[Amiri] mt-3 min-w-max">
              Muslim Compass
            </h2>
            <p className="text-center md:text-left mt-2">
              Your one-stop source of information for the Muslim community.
            </p>
          </div>
        </div>
        {/* Column 2 - Navigation Links */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <Link href="/events" className="hover:text-gray-600">
            Events
          </Link>
          <Link href="/blogs" className="hover:text-gray-600">
            Blogs
          </Link>
          <Link href="/jobs" className="hover:text-gray-600">
            Jobs
          </Link>
          <Link href="/yellow-pages" className="hover:text-gray-600">
            Yellow Pages
          </Link>
        </div>

        {/* Column 3 - Contact & Policies */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
          <button
            onClick={() => setShowHelp(true)}
            className="hover:text-gray-600"
          >
            Help
          </button>
          <button
            onClick={() => setShowSafety(true)}
            className="hover:text-gray-600"
          >
            Safety
          </button>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="hover:text-gray-600"
          >
            Disclaimer
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-14 text-sm md:text-base text-gray-600">
        &copy; {new Date().getFullYear()} Muslim Compass. All Rights Reserved.
      </div>

      {/* Modals for Help, Safety, and Disclaimer */}
      {showHelp && (
        <Modal title="Help Section: FAQs" close={() => setShowHelp(false)}>
          <p>
            <strong>What is Muslim Compass?</strong>
            <br />
            Muslim Compass is a community-driven platform that provides
            information on local events, jobs, blogs, and resources for the
            Muslim community.
          </p>

          <p>
            <strong>How do I sign up for Muslim Compass?</strong>
            <br />
            You can sign up using your Google account. Simply click on the
            "Login" button, select your Google account, and you'll be logged in
            securely.
          </p>

          <p>
            <strong>
              Do I need to create a separate username and password?
            </strong>
            <br />
            No, Muslim Compass uses Google authentication, so you do not need to
            create a separate password. Your Google account manages your login
            credentials.
          </p>

          <p>
            <strong>How do I log in?</strong>
            <br />
            Click on the "Sign in with Google" button, and choose the Google
            account associated with your Muslim Compass profile.
          </p>

          <p>
            <strong>What if I forget my password?</strong>
            <br />
            Since Muslim Compass uses Google authentication, you don't need to
            reset your password here. If you have trouble logging in, reset your
            Google account password via
            <a
              href="https://accounts.google.com/signin/recovery"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Account Recovery
            </a>
            .
          </p>

          <p>
            <strong>How do I post an event, job, or blog?</strong>
            <br />
            Once logged in with Google, navigate to the relevant section
            (Events, Jobs, Blogs) and click on the "Post New" button. Fill in
            the necessary details and submit your entry.
          </p>

          <p>
            <strong>How can I edit or delete my post?</strong>
            <br />
            Log in with Google, go to "My Posts," select the post you want to
            edit or delete, and follow the instructions.
          </p>

          <p>
            <strong>Why was my post removed?</strong>
            <br />
            Posts may be removed if they violate community guidelines, contain
            inappropriate content, or receive multiple user reports. If you
            believe this was a mistake, contact our support team.
          </p>

          <p>
            <strong>Is Muslim Compass free to use?</strong>
            <br />
            Yes! Posting and browsing information on Muslim Compass is free.
            However, certain premium features (such as highlighted job postings)
            may have a small fee.
          </p>

          <p>
            <strong>How do I report inappropriate content?</strong>
            <br />
            Click on the "Report" button next to the post and provide details.
            Our team will review the report and take appropriate action.
          </p>

          <p>
            <strong>How can I log out?</strong>
            <br />
            Click on your profile icon and select "Log Out." You will be logged
            out of Muslim Compass.
          </p>

          <p>
            <strong>Can I log in with a different Google account?</strong>
            <br />
            Yes! Log out first, then click "Login" and choose a different Google
            account.
          </p>

          <p>
            <strong>How can I contact support?</strong>
            <br />
            Visit our <Link href="/contact">Contact Us</Link> page, or email us
            at
            <a href="mailto:support@muslimcompass.com">
              support@muslimcompass.com
            </a>
            .
          </p>
        </Modal>
      )}

      {showSafety && (
        <Modal
          title="Safety Guidelines: Stay Safe"
          close={() => setShowSafety(false)}
        >
          <p>
            🔹{" "}
            <strong>
              Always verify people before making transactions or sharing
              personal information.
            </strong>
            <br />
            Before engaging in any exchange (financial, personal, or business),
            ensure you verify the identity of the other party.
          </p>

          <p>
            🔹{" "}
            <strong>
              Be cautious of online scams and fraudulent requests.
            </strong>
            <br />
            If something seems too good to be true, it probably is. Scammers
            often offer high returns for minimal effort.
          </p>

          <p>
            🔹 <strong>Meet in public places for transactions.</strong>
            <br />
            If you are buying or selling items, always meet in a well-lit,
            public location such as a coffee shop or a mall.
          </p>

          <p>
            🔹{" "}
            <strong>
              Avoid sharing sensitive personal or financial details.
            </strong>
            <br />
            Never provide your bank details, social security number, or
            passwords to anyone, even if they claim to be from Muslim Compass
            support.
          </p>

          <p>
            🔹 <strong>Use secure payment methods.</strong>
            <br />
            Avoid wiring money through services like Western Union or MoneyGram,
            as these transactions are difficult to trace and recover.
          </p>

          <p>
            🔹 <strong>Beware of phishing attempts.</strong>
            <br />
            Muslim Compass will never ask for your password or send links asking
            for personal information via email or SMS.
          </p>

          <p>
            🔹 <strong>Trust your instincts.</strong>
            <br />
            If you feel uncomfortable or pressured into a transaction, take a
            step back and reconsider.
          </p>

          <p>
            🔹{" "}
            <strong>
              Check for spelling and grammar mistakes in messages.
            </strong>
            <br />
            Many scammers use poorly written emails and messages to trick users.
            Be cautious if the message seems unprofessional.
          </p>

          <p>
            🔹{" "}
            <strong>Do not agree to pay in advance for a job or rental.</strong>
            <br />
            Fraudulent job postings and rental scams often ask for money
            upfront. Always verify employers and landlords before making
            payments.
          </p>

          <p>
            🔹 <strong>Report suspicious activities.</strong>
            <br />
            If you come across fraudulent users or misleading information,
            report it immediately to Muslim Compass or local authorities.
          </p>

          <div>
            🔹{" "}
            <strong>Who should I notify about fraud or scam attempts?</strong>
            <br />
            If you suspect fraudulent activity, contact:
            <ul className="list-disc pl-6">
              <li>
                <strong>Muslim Compass Support:</strong>{" "}
                <a href="mailto:support@muslimcompass.com">
                  support@muslimcompass.com
                </a>
              </li>
              <li>
                <strong>Internet Crime Complaint Center (IC3):</strong>{" "}
                <a
                  href="https://www.ic3.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.ic3.gov
                </a>
              </li>
              <li>
                <strong>Federal Trade Commission (FTC):</strong> Call{" "}
                <strong>877-FTC-HELP</strong> (877-382-4357)
              </li>
              <li>
                <strong>Your local police department.</strong>
              </li>
            </ul>
          </div>
        </Modal>
      )}

      {showDisclaimer && (
        <Modal
          title="Disclaimer & Terms"
          close={() => setShowDisclaimer(false)}
        >
          <p>
            🔹{" "}
            <strong>
              Information on Muslim Compass is for general guidance only.
            </strong>
            <br />
            While we strive to provide accurate and up-to-date information, we
            do not guarantee its accuracy, completeness, or timeliness.
          </p>

          <p>
            🔹 <strong>Muslim Compass is a community-driven platform.</strong>
            <br />
            User-generated content, including events, job postings, and business
            listings, is provided "as is." We do not endorse or verify the
            accuracy of the content posted by users.
          </p>

          <p>
            🔹 <strong>Verify all details before making decisions.</strong>
            <br />
            Users are responsible for conducting their own due diligence before
            attending events, applying for jobs, purchasing products, or
            engaging with other users.
          </p>

          <p>
            🔹 <strong>We are not liable for third-party content.</strong>
            <br />
            Muslim Compass may contain links to third-party websites, services,
            and businesses. We do not control or endorse their content, and we
            are not responsible for any transactions or interactions users have
            with third-party entities.
          </p>

          <p>
            🔹 <strong>No warranties or guarantees.</strong>
            <br />
            Muslim Compass does not provide warranties, whether express or
            implied, regarding the information, services, or products available
            on the platform. Your use of this site is at your own risk.
          </p>

          <div>
            <p>
              🔹 <strong>Terms of Use & User Conduct.</strong>
              <br />
              By using Muslim Compass, you agree to:
            </p>
            <ul className="list-disc pl-6">
              <li>Post only accurate, respectful, and lawful content.</li>
              <li>
                Refrain from posting misleading, offensive, or harmful
                information.
              </li>
              <li>Not impersonate others or provide false information.</li>
              <li>Comply with local, state, and federal laws.</li>
            </ul>
          </div>

          <p>
            🔹{" "}
            <strong>
              Muslim Compass reserves the right to remove content.
            </strong>
            <br />
            We may remove any content that violates our policies, contains false
            information, or is deemed inappropriate for the community.
          </p>

          <p>
            🔹{" "}
            <strong>Muslim Compass is not liable for financial losses.</strong>
            <br />
            We do not facilitate payments, transactions, or contracts between
            users. Users are responsible for their own business dealings and
            financial transactions.
          </p>

          <p>
            🔹 <strong>Privacy & Data Protection.</strong>
            <br />
            We respect user privacy and take reasonable measures to protect
            personal data. However, Muslim Compass is not responsible for
            unauthorized data breaches or third-party misuse of information.
          </p>

          <p>
            🔹 <strong>Changes to Terms & Disclaimer.</strong>
            <br />
            Muslim Compass reserves the right to update or modify these terms at
            any time. Continued use of the platform constitutes acceptance of
            the updated terms.
          </p>

          <p>
            🔹 <strong>Contact Us.</strong>
            <br />
            If you have any concerns or need further clarification, please visit
            our <Link href="/contact">Contact Us</Link> page or email us at
            <a href="mailto:support@muslimcompass.com">
              support@muslimcompass.com
            </a>
            .
          </p>
        </Modal>
      )}
    </footer>
  );
}

/* Reusable Modal Component */
const Modal = ({ title, children, close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[90vw] md:max-w-[40vw] h-[80vh] overflow-scroll relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
          onClick={close}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="text-gray-700 space-y-3">{children}</div>
      </div>
    </div>
  );
};
