import { Icon } from "@/components/ui/icon/Icon";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "@/components/ui/panel/Panel";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { getMyAccountData } from "./queries";
import Link from "next/link";
import { getCurrentUser } from "../auth/queries/getCurrentUser";
import { getIsSubscriber } from "../auth/queries/getIsSubscriber";

export async function MyAccountPageView() {
  const data = await getCurrentUser();
  const subscriberInfo = await getIsSubscriber(data?.id);
  const isSubscriber = !!subscriberInfo?.is_subscriber;
  const accountMessage = subscriberInfo?.account_message;
  const canChangeMailing = !!subscriberInfo?.can_change_mailing_address;

  return (
    <div>
      <div className="w-165 max-w-full">
        <h2 className="mb-4 text-3xl font-bold">Hello, {data?.name}</h2>
        <Panel>
          <PanelHeader
            title={isSubscriber ? "Thank you for subscribing" : "Subscribe to The Collectors Press"}
            subtitle={
              isSubscriber
                ? "You have full access to subscriber content."
                : "You're currently not subscribed. To subscribe, visit /subscribe."
            }
            actions={<button>See plans</button>}
          />

          {accountMessage && (
            <div className="px-4 pb-4 text-sm text-gray-700">{accountMessage}</div>
          )}

            <PanelFooter>
              <Link className="flex w-full items-center justify-between !no-underline !text-black ![font-family:inherit] visited:!text-black hover:!text-gray-600 hover:!no-underline active:!text-gray-600" href="/my-account/change-email">
                <h3 className="m-0 !no-underline !text-inherit ![font-family:inherit]">Change your email address</h3>
                <p className="m-0 !no-underline !text-inherit ![font-family:inherit]">{">"}</p>
              </Link>
            </PanelFooter>
          <PanelFooter>
            {canChangeMailing ? (
              <Link className="flex w-full items-center justify-between !no-underline !text-black ![font-family:inherit] visited:!text-black hover:!text-gray-600 hover:!no-underline active:!text-gray-600" href="/my-account/change-address">
                <h3 className="m-0 !no-underline !text-inherit ![font-family:inherit]">Change your mailing address</h3>
                <p className="m-0 !no-underline !text-inherit ![font-family:inherit]">{">"}</p>
              </Link>
            ) : (
              <div className="flex w-full justify-between opacity-50 pointer-events-none">
                <h3 className="m-0">Change your mailing address</h3>
                <p className="m-0">{">"}</p>
              </div>
            )}
          </PanelFooter>
        </Panel>

        <Panel className="mt-9">
          <PanelHeader
            title="Your Account"
            // actions={<button>Edit</button>}
          />
          <PanelBody>
            <div className="flex flex-col gap-4">
                {/* <div className="flex flex-row"> */}
                    {/* <div className="flex flex-col items-start flex-1">
                        <strong className="w-full">First Name</strong>
                        <div className="w-full">{data.firstName}</div>
                    </div>
                    <div className="flex flex-col items-start flex-1">
                        <strong className="w-full">Last Name</strong>
                        <div className="w-full">{data.lastName}</div>
                    </div> */}
                {/* </div> */}
                {/* <div> */}
                    <div>
                        <strong>Email Address</strong>
                        <div>{data?.name}</div>
                    </div>
                {/* </div> */}
            </div>
          </PanelBody>

          {/* <PanelFooter>
            <div className="flex w-full justify-between items-center">
              <Icon icon={faGoogle} />
              <div>Google account connected</div>
            </div>
          </PanelFooter> */}
        </Panel>
      </div>
    </div>
  );
}
