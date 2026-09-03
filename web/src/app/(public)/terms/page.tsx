import React from "react";

export const metadata = {
  title: "Terms of Use - The Collectors Press",
  description: "Terms of Use",
};

const html = `
  <style>
    .terms-body { font-family: Georgia, 'Times New Roman', serif; color:#000; background:#fff; }
    .terms-body h1{font-size:24px;text-align:center;margin-bottom:6px}
    .terms-body .subtitle{font-size:19px;text-align:center;margin-bottom:6px}
    .terms-body .updated{font-size:15px;font-style:italic;text-align:center;margin-bottom:30px}
    .terms-body h2{font-size:19px;font-weight:bold;margin:26px 0 12px}
    .terms-body p{margin:0 0 16px}
    /* Default lists: show bullets and a comfortable indent */
    .terms-body ul { list-style: disc outside; margin: 0 0 16px; padding-left: 1.25rem; }
    .terms-body ul li { margin: 0 0 10px; }
    /* Keep special plain lists without markers if explicitly marked */
    .terms-body ul.plain { list-style: none; padding-left: 0; }

    /* Lists that contain (a), (b) style items — make slightly more indented */
    .terms-body ul.indented { padding-left: 2.25rem; }

    /* Generic indented block: used on div.indented wrappers */
    .terms-body .indented { padding-left: 2.25rem; }
    .terms-body .indented p { margin: 0 0 10px; }

    .terms-body ol.plain { margin:0 0 16px; padding-left:0 }
    .terms-container{max-width:860px;margin:0 auto;padding:40px 24px 80px}
    @media (min-width:1024px){ .terms-container{padding:60px 24px 120px} }
  </style>

  <div class="terms-container terms-body">
    <h1>TERMS OF USE</h1>
    <div class="subtitle">The Collectors Press</div>
    <div class="subtitle">www.thecollectorspress.com</div>
    <div class="updated">Last Updated: 1 August 2026</div>

    <h2>1. Introduction and Acceptance of Terms</h2>
    <p>These Terms of Use ("Terms") govern your access to and use of the website operated by The Collectors Press Pty Ltd (ABN 96 698 470 147) ("we", "us", "our"), including all content, features, and services available through the website located at www.thecollectorspress.com (the "Website").</p>
    <p>By creating an Account, subscribing to our services, or otherwise accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any other policies or guidelines referenced herein. If you do not agree to these Terms, you must not access or use the Website.</p>
    <p>We reserve the right to update or modify these Terms at any time in accordance with clause 16 below. Your continued use of the Website following any changes constitutes your acceptance of the revised Terms.</p>

    <h2>2. Definitions</h2>
    <p>In these Terms, unless the context otherwise requires:</p>
    <ul>
      <li>"Account" means the registered user account you create to access the Website and Subscription Content.</li>
      <li>"ACL" means the Australian Consumer Law, being Schedule 2 of the Competition and Consumer Act 2010 (Cth).</li>
      <li>"Content" means all text, articles, news, commentary, images, graphics, logos, audio, video, data, and other materials published on or through the Website.</li>
      <li>"Intellectual Property Rights" means all intellectual property rights, including copyright, trade marks, patents, designs, trade secrets, know-how, and all other proprietary rights, whether registered or unregistered.</li>
      <li>"Privacy Policy" means our privacy policy as published on the Website from time to time, which governs the collection, use, and disclosure of your personal information.</li>
      <li>"Subscriber" or "You" or "Your" means any individual who has registered an Account and holds an active Subscription to access the Website.</li>
      <li>"Subscription" means the paid subscription plan you select that grants you access to the Website and Subscription Content for the applicable Subscription Period.</li>
      <li>"Subscription Content" means the Content accessible only to Subscribers with an active Subscription.</li>
      <li>"Subscription Fees" means the fees payable by you for your Subscription, as set out on the Website or otherwise notified to you.</li>
      <li>"Subscription Period" means the period for which your Subscription is active, as determined by the subscription plan you select (e.g., monthly or annual).</li>
      <li>"We", "Us", or "Our" means The Collectors Press Pty Ltd (ABN 96 698 470 147), a company registered in Australia with its registered office in Melbourne, Victoria.</li>
      <li>"Website" means the website located at www.thecollectorspress.com and includes all subdomains, associated applications, and services operated by us.</li>
   </ul>

    <h2>3. Eligibility</h2>
    <p>3.1 To create an Account and subscribe to the Website, you must be at least 18 years of age. If you are under 18 years of age, you may only use the Website with the prior consent and ongoing supervision of a parent or legal guardian.
    The parent or legal guardian who consents to registration will be jointly and severally responsible for the minor's use of the Website and compliance with these Terms.</p>

    <p>By creating an Account, you represent and warrant that:</p>
    <div class="indented">
      <p>(a) you meet the eligibility requirements set out in clause 3.1;</p>
      <p>(b) the information you provide during registration is accurate, current, and complete;</p>
      <p>(c) you have the legal capacity to enter into a binding agreement; and</p>
      <p>(d) your use of the Website will not violate any applicable law or regulation.</p>
    </div>

    <h2>4. Account Registration and Security</h2>
    <p>4.1 To access Subscription Content, you must create an Account by completing the registration process on the Website and providing accurate and complete information as requested.</p>
    <p>4.2 You are responsible for maintaining the confidentiality of your Account credentials, including your username and password, and for all activities that occur under your Account.</p>
    <p>4.3 You must:</p>
    <div class="indented">
      <p>(a) keep your login credentials secure and confidential;</p>
      <p>(b) not share your Account credentials with any third party;</p>
      <p>(c) not allow any other person to access the Website using your Account;</p>
      <p>(d) notify us immediately if you become aware of any unauthorised use of your Account or any other breach of security; and</p>
      <p>(e) ensure that you log out of your Account at the end of each session when accessing the Website from a shared device.</p>
    </div>
    <p>4.4 We reserve the right to suspend or terminate your Account if we reasonably believe that your Account has been compromised or is being used in breach of these Terms.</p>
    <p>4.5 Each Subscription is for a single individual user only. Sharing login credentials or allowing multiple persons to access a single Account is strictly prohibited and constitutes a material breach of these Terms.</p>

    <h2>5. Subscription Plans, Fees, Billing, and Renewal</h2>
    <p>5.1 Access to Subscription Content requires a paid Subscription. Details of available Subscription plans, including applicable Subscription Fees, are set out on the Website.</p>
    
    <p>5.2 Subscription Fees are as follows (or as otherwise published on the Website from time to time):</p>
    <div class="indented">
      <p>(a) Monthly Subscription: $9.99 per month</p>
      <p>(b) Annual Subscription: $89.99 per year</p>
    </div>

    <p>5.3 All Subscription Fees are quoted in Australian dollars (AUD) and are inclusive of GST unless otherwise stated.</p>
    <p>5.4 Payment must be made using the payment methods accepted on the Website. By providing your payment details, you authorise us (or our third-party payment processor) to charge the applicable Subscription Fees to your nominated payment method.</p>
    <p>5.5 Automatic Renewal: Unless you cancel your Subscription before the end of the current Subscription Period, your Subscription will automatically renew for successive periods of the same duration at the then-current Subscription Fee. You authorise us to charge the renewal fee to your nominated payment method at the commencement of each renewal period.</p>
    <p>5.6 We may change Subscription Fees at any time by providing you with at least 30 days' prior written notice, which will be sent by electronic mail address used to create Your Account. The revised fees will apply from the commencement of your next Subscription Period following the notice period.</p>
    <p>5.7 Cancellation: You may cancel your Subscription at any time through your Account settings. Cancellation will take effect at the end of your current Subscription Period. You will continue to have access to Subscription Content until the end of the period for which you have already paid, and no further charges will be made.</p>
    <p>5.8 We do not provide pro-rata refunds for cancellation of a Subscription partway through a Subscription Period, except as required by law (including under the ACL).</p>

    <h2>6. Refunds and Consumer Guarantees</h2>
    <p>6.1 Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled:</p>
    <div class="indented">
      <p>(a) to cancel your Subscription; and</p>
      <p>(b) to a refund for the unused portion of the Subscription, or to compensation for its reduced value.</p>
    </div>

    <p>6.2 You are also entitled to choose a refund or replacement for major failures with goods. If a failure with the goods or a service does not amount to a major failure, you are entitled to have the failure rectified in a reasonable time. If this is not done, you are entitled to a refund for the goods and to cancel the contract for the service and obtain a refund of any unused portion.</p>
    <p>6.3 Nothing in these Terms is intended to exclude, restrict, or modify any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the ACL or any other applicable law which cannot be lawfully excluded or limited. If any term or guarantee is implied into these Terms under the ACL or any other applicable law that cannot be excluded, our liability for breach of such term or guarantee is limited (to the extent permitted by law) to the re-supply of the relevant services or payment of the cost of having those services re-supplied.</p>  
    <p>6.4 Subject to clause 6.3, refund requests for reasons other than those covered by the ACL consumer guarantees will be considered at our sole discretion.</p>
    <p>6.5 To request a refund, please contact us at admin@thecollectorspress.com with details of your claim.</p>

    <h2>7. Acceptable Use and Prohibited Conduct</h2>
    <p>7.1 You agree to use the Website only for lawful purposes and in accordance with these Terms. You must not:</p>
    <div class="indented">
      <p>(a) share, disclose, or transfer your Account credentials to any other person, or allow any other person to access the Website using your Account;</p>
      <p>(b) reproduce, copy, distribute, republish, download, display, post, or transmit any Content in any form or by any means, except as expressly permitted by these Terms;</p>
      <p>(c) use any automated system, including without limitation "robots", "spiders", "scrapers", or "offline readers" to access the Website or to extract, collect, harvest, or mine any Content;</p>
      <p>(d) circumvent, disable, or otherwise interfere with any security-related features of the Website, including features that prevent or restrict use or copying of Content;</p>
      <p>(e) use the Website in any manner that could damage, disable, overburden, or impair the Website or interfere with any other party's use of the Website;</p>
      <p>(f) attempt to gain unauthorised access to any part of the Website, other Accounts, computer systems, or networks connected to the Website;</p>
      <p>(g) use the Website to transmit any material that is unlawful, defamatory, offensive, threatening, abusive, harassing, or otherwise objectionable;</p>
      <p>(h) use any Content for commercial purposes without our prior written consent;</p>
      <p>(i) use the Website in any way that violates any applicable Commonwealth, State, or Territory law or regulation; or</p>
      <p>(j) encourage or assist any third party to do any of the foregoing.</p>
    </div>

    <p>7.2 We reserve the right to investigate and take appropriate action, including suspension or termination of your Account, against anyone who, in our sole discretion, violates this clause.</p>

    <h2>8. Intellectual Property Rights</h2>
    <p>8.1 All Content on the Website, including but not limited to articles, news reports, price guides, valuations, images, graphics, logos, icons, audio clips, digital downloads, data compilations, software, and the overall design and look and feel of the Website, is, unless otherwise credited, owned by or licensed to The Collectors Press Pty Ltd and is protected by Australian and international copyright, trade mark, and other Intellectual Property Rights.</p>
    <p>8.2 The names, logos, and trade marks displayed on the Website (including "The Collectors Press" and any associated branding) are the trade marks of The Collectors Press Pty Ltd or their respective owners. Nothing in these Terms grants you any right or licence to use any trade mark displayed on the Website without the prior written permission of the trade mark owner.</p>
    <p>8.3 Subject to your compliance with these Terms and the maintenance of an active Subscription, we grant you a limited, non-exclusive, non-transferable, revocable licence to:</p>
    <div class="indented">
      <p>(a) access and view Content on the Website for your personal, non-commercial use;</p>
      <p>(b) download or print single copies of Content for your own personal, non-commercial reference.</p>
    </div>
    <p>8.4 This licence does not permit you to:</p>
    <div class="indented">
      <p>(a) modify, reproduce, distribute, or create derivative works from any Content;</p>
      <p>(b) publicly display, perform, or communicate any Content to the public;</p>
      <p>(c) use any Content for commercial purposes, including resale or redistribution; or</p>
      <p>(d) remove any copyright, trade mark, or other proprietary notices from any Content.</p>
    </div>
    <p>8.5 The licence granted under clause 8.3 automatically terminates upon expiry or termination of your Subscription or upon any breach of these Terms.</p>

    <h2>9. Disclaimers — Collectible Valuation and Price Guide Content</h2>
    <p>9.1 The Content on the Website, including without limitation any price guides, valuations, market commentary, and collectible assessments (relating to trading card games, sports cards, and other collectible items), is provided for general informational and educational purposes only.</p>
    <p>9.2 The Content does not constitute, and must not be relied upon as:</p>
    <div class="indented">
      <p>(a) financial advice, investment advice, or tax advice;</p>
      <p>(b) a recommendation or solicitation to buy, sell, or hold any collectible item;</p>
      <p>(c) a guarantee or prediction of the current or future market value of any collectible item; or</p>
      <p>(d) professional advice of any kind.</p>
    </div>

    <p>9.3 The value of collectible items (including trading card games and sports cards) is inherently subjective and may fluctuate significantly based on market conditions, condition, rarity, demand, and other factors. Any valuations, price guides, or estimated values published on the Website are indicative only and may not reflect actual market prices at any given time.</p>
    <p>9.4 We do not guarantee the accuracy, completeness, reliability, or timeliness of any valuation, price guide, or other Content. You acknowledge that you rely on any Content at your own risk.</p>
    <p>9.5 We strongly recommend that you seek independent professional advice (including financial, investment, or legal advice) before making any decision regarding the purchase, sale, or holding of collectible items based on information obtained from the Website.</p>


    <h2>10. Limitation of Liability</h2>
    <p>10.1 Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred on you by the ACL or any other applicable law that cannot be excluded, restricted, or modified by agreement.</p>
    <p>10.2 Subject to clause 10.1, and to the maximum extent permitted by law:</p>
    <div class="indented">
      <p>(a) the Website and all Content are provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied;</p>
      <p>(b) we expressly disclaim all warranties, representations, and conditions not expressly set out in these Terms, including any implied warranties of merchantability, fitness for a particular purpose, and non-infringement;</p>
      <p>(c) we do not warrant that the Website will be uninterrupted, error-free, secure, or free of viruses or other harmful components; and</p>
      <p>(d) we do not warrant that any Content, including price guides and valuations, is accurate, complete, current, or reliable.</p>
    </div>
    <p>10.3 Subject to clause 10.1, to the maximum extent permitted by law, our total aggregate liability to you arising out of or in connection with these Terms, your Subscription, or your use of the Website (whether in contract, tort (including negligence), under statute, or otherwise) is limited to:</p>
    <div class="indented">
      <p>(a) the total Subscription Fees paid by you in the twelve (12) months immediately preceding the event giving rise to the claim; and</p>
      <p>(b) fifty Australian dollars (AUD $50).</p>
    </div>
    <p>10.4 Subject to clause 10.1, to the maximum extent permitted by law, we will not be liable to you for any:</p>
    <div class="indented">
      <p>(a) indirect, incidental, special, consequential, or punitive damages;</p>
      <p>(b) loss of profits, revenue, business, data, goodwill, or anticipated savings;</p>
      <p>(c) loss arising from any decision made or action taken in reliance on Content (including price guides or valuations); or</p>
      <p>(d) loss or damage arising from circumstances beyond our reasonable control.</p>
    </div>


    <h2>11. Indemnity</h2>
    <p>11.1 You agree to indemnify, defend, and hold harmless The Collectors Press Pty Ltd, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees on a solicitor-client basis) arising out of or in connection with:</p>
    <div class="indented">
      <p>(a) your breach of these Terms;</p>
      <p>(b) your use of the Website or any Content;</p>
      <p>(c) your violation of any applicable law or regulation; or</p>
      <p>(d) your infringement of any Intellectual Property Rights or other rights of any third party.</p>
    </div>
    <p>11.2 This indemnity survives the termination or expiry of these Terms and your Subscription.</p>

    <h2>12. Suspension and Termination</h2>
    <p>12.1 We may, at our sole discretion and without liability to you, immediately suspend or terminate your Account and/or Subscription if:</p>
    <div class="indented">
      <p>(a) you breach any provision of these Terms;</p>
      <p>(b) we reasonably suspect fraudulent, unauthorised, or illegal activity on your Account;</p>
      <p>(c) you fail to pay Subscription Fees when due;</p>
      <p>(d) you share your Account credentials with any third party;</p>
      <p>(e) we are required to do so by law or by a regulatory authority; or</p>
      <p>(f) we decide to discontinue the Website or any part of our services.</p>
    </div>
    <p>12.2 Upon termination:</p>
    <div class="indented">
      <p>(a) your right to access the Website and Subscription Content will cease immediately;</p>
      <p>(b) the licence granted under clause 8.3 will terminate;</p>
      <p>(c) you must cease all use of the Website and delete any downloaded Content (except as retained in accordance with applicable law); and</p>
      <p>(d) any outstanding Subscription Fees will become immediately due and payable.</p>
    </div>

    <p>12.3 Where we terminate your Account for reasons other than your breach of these Terms, we will provide a pro-rata refund for any pre-paid Subscription Fees attributable to the unexpired portion of your Subscription Period.</p>
    <p>12.4 Clauses that by their nature should survive termination (including clauses 8, 9.2, 10, 11, 12, 14, and 17–19) will survive the termination or expiry of these Terms.</p>


    <h2>13. Privacy</h2>
    <p>13.1 We collect, use, and disclose your personal information in accordance with our Privacy Policy, which is available on the Website and forms part of these Terms.</p>
    <p>13.2 Our Privacy Policy has been prepared in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).</p>
    <p>13.3 By creating an Account and using the Website, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.</p>
    <p>13.4 We may send you communications related to your Account and Subscription (including billing confirmations, renewal notices, and service updates). Marketing communications will only be sent in accordance with the Spam Act 2003 (Cth), and you may opt out of marketing communications at any time by using the unsubscribe mechanism provided or by contacting us.</p>


    <h2>14. Third-Party Links and Content</h2>
    <p>14.1 The Website may contain links to third-party websites, services, or content that are not owned or controlled by us.</p>
    <p>14.2 We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
    <p>14.3 The inclusion of any link on the Website does not imply endorsement, approval, or recommendation by us of the linked website or its content.</p>
    <p>14.4 You access third-party websites at your own risk and subject to the terms and conditions of those websites. We recommend that you review the terms and privacy policies of any third-party website you visit.</p>


    <h2>15. Changes to These Terms</h2>
    <p>15.1 We may amend, modify, or update these Terms at any time at our discretion.</p>
    <p>15.2 If we make material changes to these Terms, we will provide you with at least 10 days' notice before the changes take effect, by:</p>
    <div class="indented">
      <p>(a) posting the updated Terms on the Website with a revised "Last Updated" date;</p>
      <p>(b) sending a notification to the email address associated with your Account; or</p>
      <p>(c) displaying a prominent notice on the Website.</p>
    </div>
    <p>15.3 Your continued use of the Website after the effective date of any changes constitutes your acceptance of the amended Terms. If you do not agree to the amended Terms, you must cancel your Subscription and cease using the Website before the changes take effect.</p>


    <h2>16. Governing Law and Jurisdiction</h2>
    <p>16.1 These Terms are governed by and construed in accordance with the laws of Victoria, Australia.</p>
    <p>16.2 Subject to clause 17 (Dispute Resolution), you irrevocably submit to the exclusive jurisdiction of the courts of Victoria, Australia, and the Federal Court of Australia, in relation to any dispute arising out of or in connection with these Terms.</p>


    <h2>17. Dispute Resolution</h2>
    <p>17.1 If a dispute arises in connection with these Terms, the parties agree to follow the procedure set out in this clause before commencing any court proceedings (other than proceedings seeking urgent interlocutory relief).</p>
    <p>17.2 The party claiming a dispute exists must give written notice to the other party specifying the nature of the dispute.</p>
    <p>17.3 The parties must first attempt to resolve the dispute by good faith negotiation within twenty (20) business days of the dispute notice being given.</p>
    <p>17.4 If the dispute is not resolved within the negotiation period, either party may refer the dispute to mediation administered by the Australian Disputes Centre (ADC) (or its successor body) in accordance with the ADC Mediation Guidelines. The costs of mediation will be shared equally by the parties.</p>
    <p>17.5 If the dispute is not resolved within thirty (30) days of the commencement of mediation (or such longer period as agreed by the parties), either party may commence court proceedings.</p>
    <p>17.6 Nothing in this clause prevents either party from seeking urgent interlocutory or injunctive relief from a court of competent jurisdiction at any time.</p>


    <h1>18. General Provisions</h1>
    <h2>18.1 Severability</h2>
    <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the invalidity, illegality, or unenforceability of that provision will not affect the validity or enforceability of the remaining provisions, which will continue in full force and effect. Where possible, the invalid provision will be interpreted or modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.</p>

    <h2>18.2 Entire Agreement</h2>
    <p>These Terms, together with the Privacy Policy and any other policies or guidelines referenced herein, constitute the entire agreement between you and us with respect to your use of the Website and supersede all prior or contemporaneous communications, proposals, and agreements, whether electronic, oral, or written, between you and us regarding the Website.</p>

    <h2>18.3 Assignment</h2>
    <p>You may not assign, transfer, or sub-license any of your rights or obligations under these Terms without our prior written consent. We may assign, transfer, or sub-license our rights and obligations under these Terms to any third party without restriction or notification to you, including in connection with a merger, acquisition, corporate restructuring, or sale of all or substantially all of our assets.</p>

    <h2>18.4 No Waiver</h2>
    <p>Our failure or delay in exercising any right, power, or remedy under these Terms does not operate as a waiver of that right, power, or remedy. A single or partial exercise of any right, power, or remedy does not prevent any further exercise of that or any other right, power, or remedy. A waiver is only effective if it is in writing and signed by us.</p>

    <h2>18.5 Relationship of the Parties</h2>
    <p>Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between you and us.</p>

    <h2>18.6 Notices</h2>
    <p>Any notice to be given under these Terms must be in writing. Notices to you may be sent to the email address associated with your Account. Notices to us must be sent to admin@thecollectorspress.com or our registered address. A notice is deemed to have been received: if sent by email, at the time of transmission (unless the sender receives a delivery failure notification); if sent by post, three (3) business days after posting (for domestic mail) or ten (10) business days after posting (for international mail).</p>

    <h2>18.7 Force Majeure</h2>
    <p>We will not be liable for any failure or delay in performing our obligations under these Terms where such failure or delay arises from circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, terrorism, civil unrest, government action, power failures, internet or telecommunications failures, or industrial disputes.</p>

    <h2>19. Contact Us</h2>
    <p>If you have any questions, concerns, or complaints about these Terms or the Website, please contact us:</p>
    <p>
      The Collectors Press Pty Ltd<br />
      ABN: 96 698 470 147<br />
      Email: admin@thecollectorspress.com<br />
      Website: www.thecollectorspress.com
    </p>

    <p>For complaints, we will endeavour to respond within a reasonable time. If you are not satisfied with our response, you may refer the matter to the applicable external dispute resolution body or regulator.</p>
  </div>
`;

export default function TermsPage() {
  return (
    <main className="bg-white">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
