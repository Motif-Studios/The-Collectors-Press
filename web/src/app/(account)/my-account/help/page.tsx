import { Panel, PanelBody, PanelFooter } from "@/components/ui/panel/Panel";

export default function AccountHelpPage() {
  return (
    <div>
      <div className="w-165 max-w-full">
        <Panel>
          <PanelBody>
            <h2>How can we help you?</h2>

            <p>
              Here are some guides that other Atlantic readers have found
              useful.
            </p>
          </PanelBody>

          <PanelFooter>
            <div className="flex w-full justify-between">
              <h3>Change your email address</h3>
              <p>{">"}</p>
            </div>
          </PanelFooter>
          <PanelFooter>
            <div className="flex w-full justify-between">
              <h3>Change your mailing address</h3>
              <p>{">"}</p>
            </div>
          </PanelFooter>
        </Panel>

        <Panel className="mt-9">
          <PanelBody>
            <h2>Need more help?</h2>

            <p>
              Please visit our Help Center for more information about Atlantic
              subscriptions and products.
            </p>
            <p>
              If you&apos;d like to speak directly with a representative, please
              contact our Customer Care team.
            </p>
          </PanelBody>

          <PanelFooter>
            <div className="flex w-full justify-between">
              <h3>Missing an issue of the print magazine?</h3>
              <p className="underline">Let us Know {">"}</p>
            </div>
          </PanelFooter>
        </Panel>
      </div>
    </div>
  );
}
