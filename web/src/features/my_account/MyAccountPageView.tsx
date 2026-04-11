import { Icon } from "@/components/ui/icon/Icon";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "@/components/ui/panel/Panel";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { getMyAccountData } from "./queries";

export async function MyAccountPageView() {
  const data = await getMyAccountData();

  return (
    <div>
      <div className="w-165 max-w-full">
        <h2 className="mb-4 text-3xl font-bold">Hello, {data.firstName}</h2>
        <Panel>
          <PanelHeader
            title="Subscribe to The Collectors Press"
            subtitle="If you're not currently a subscriber, join today and enjoy unlimited access."
            actions={<button>See plans</button>}
          />

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
          <PanelHeader
            title="Your Account"
            actions={<button>Edit</button>}
          />
          <PanelBody>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <div className="flex flex-col items-start flex-1">
                        <strong className="w-full">First Name</strong>
                        <div className="w-full">{data.firstName}</div>
                    </div>
                    <div className="flex flex-col items-start flex-1">
                        <strong className="w-full">Last Name</strong>
                        <div className="w-full">{data.lastName}</div>
                    </div>
                </div>
                <div>
                    <div>
                        <strong>Email Address</strong>
                        <div>{data.email}</div>
                    </div>
                </div>
            </div>
          </PanelBody>

          <PanelFooter>
            <div className="flex w-full justify-between items-center">
              <Icon icon={faGoogle} />
              <div>Google account connected</div>
            </div>
          </PanelFooter>
        </Panel>
      </div>
    </div>
  );
}
