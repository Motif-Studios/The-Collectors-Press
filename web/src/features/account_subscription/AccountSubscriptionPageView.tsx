"use client";

import { useState } from "react";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel/Panel";
import { API_BASE_URL } from "@/lib/env";

function ManageBillingButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/subscription/billing_portal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, returnUrl: window.location.href }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Failed to open billing portal");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Failed to open billing portal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="cursor-pointer inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening portal…" : "Manage Billing"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function BillingManagementPageView({ userId }: { userId: string }) {
  return (
    <div>
      <div className="w-165 max-w-full">
        <Panel>
          <PanelHeader
            title="Billing Management"
            subtitle="Manage your subscription, update payment details, or view billing history through Stripe."
          />
          <PanelBody>
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Click the button below to open the Stripe billing portal where you can:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                <li>Update your payment method</li>
                <li>View past invoices</li>
                <li>Cancel or modify your subscription</li>
              </ul>
              <ManageBillingButton userId={userId} />
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}