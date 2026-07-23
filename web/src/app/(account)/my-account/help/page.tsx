import { Panel, PanelBody, PanelFooter } from "@/components/ui/panel/Panel";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getIsSubscriber } from "@/features/auth/queries/getIsSubscriber";


export default async function AccountHelpPage() {
  const currentUserResult = await getCurrentUser();
  const user = currentUserResult ?? { name: "User", id: "" };
  const subscriberInfo = await getIsSubscriber(user?.id);
  const isSubscriber = !!subscriberInfo?.is_subscriber;

  return (
    <div>
      <div className="w-165 max-w-full">
        <Panel>
          <PanelBody>
            <h2>How can we help you?</h2>

            <p>
              Here are some guides that other readers have found
              useful...
            </p>
          </PanelBody>

          {/* <PanelFooter>
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
          </PanelFooter> */}
        </Panel>

        {isSubscriber && ( 
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
        )}
      </div>
    </div>
  );
}
