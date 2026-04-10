import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Panel, PanelHeader, PanelBody, PanelFooter } from "./Panel";

const meta = {
  title: "UI/Panel",
  component: Panel,
  tags: ["autodocs"],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HelpPanel: Story = {
  render: () => (
    <div className="w-[660px] max-w-full">
      <Panel>
        <PanelBody>
          <h2>Need more help?</h2>

          <p>
            Please visit our <a href="#">Help Center</a> for more information
            about Atlantic subscriptions and products.
          </p>

          <p>
            If you'd like to speak directly with a representative, please{" "}
            <a href="#">contact our Customer Care team</a>.
          </p>
        </PanelBody>

        <PanelFooter>
          <span>Missing an issue of the print magazine?</span>
          <a href="#">Let us know &gt;</a>
        </PanelFooter>
      </Panel>
    </div>
  ),
};

export const WithHeaderBodyAndFooter: Story = {
  render: () => (
    <div className="w-165 max-w-full">
      <Panel>
        <PanelHeader
          title="Subscription support"
          subtitle="Find answers to common subscription and account questions."
        />

        <PanelBody>
          <p>
            You can browse our support resources, manage your subscription, and
            find help for billing, delivery, and account access.
          </p>

          <p>
            Visit the <a href="#">Help Center</a> to explore all support topics.
          </p>
        </PanelBody>

        <PanelFooter>
          <span>Still need help?</span>
          <a href="#">Contact support &gt;</a>
        </PanelFooter>
      </Panel>
    </div>
  ),
};

export const WithHeaderActions: Story = {
  render: () => (
    <div className="w-165 max-w-full">
      <Panel>
        <PanelHeader
          title="Manage subscription"
          subtitle="Quick access to the most common account actions."
          actions={
            <a
              href="#"
              className="text-[14px] text-[#2e6da9] underline whitespace-nowrap"
            >
              View account
            </a>
          }
        />

        <PanelBody>
          <p>
            Update your payment details, change your delivery address, or review
            your subscription plan settings.
          </p>
        </PanelBody>
      </Panel>
    </div>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <div className="w-165 max-w-full">
      <Panel>
        <PanelBody>
          <h2>Editorial note</h2>

          <p>
            This panel only uses the body component. It is useful when you do
            not need a separate header or footer but still want the same panel
            shell and typography styling.
          </p>

          <p>
            You can also include <a href="#">inline links</a> and richer text
            content here.
          </p>
        </PanelBody>
      </Panel>
    </div>
  ),
};

export const HeaderAndBodyOnly: Story = {
  render: () => (
    <div className="w-165 max-w-full">
      <Panel>
        <PanelHeader
          title="Delivery update"
          subtitle="Information about print magazine delivery timing."
        />

        <PanelBody>
          <p>
            Delivery dates can vary depending on your region and local postal
            schedules. Please allow a few extra business days before reporting a
            missed issue.
          </p>
        </PanelBody>
      </Panel>
    </div>
  ),
};

export const FooterLayoutExample: Story = {
  render: () => (
    <div className="w-165 max-w-full">
      <Panel>
        <PanelBody>
          <h2>Renew your subscription</h2>

          <p>
            Continue enjoying full access to our articles, essays, and print
            editions by renewing your subscription.
          </p>
        </PanelBody>

        <PanelFooter>
          <span>Your plan expires in 5 days.</span>
          <a href="#">Renew now &gt;</a>
        </PanelFooter>
      </Panel>
    </div>
  ),
};