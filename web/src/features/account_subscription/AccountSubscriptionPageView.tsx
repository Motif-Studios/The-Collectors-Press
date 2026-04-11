import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel/Panel";
import {
  faCheck,
  faArrowUpFromBracket,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";


export async function AccountSubscriptionPageView() {
  return (
    <div>
      <div className="w-165 max-w-full">
        <Panel>
          <PanelHeader title="Become a Kevin Wu subscriber today." />

          <PanelBody className="pt-0">
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-[18px] font-normal text-neutral-500">
                  Digital
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black">
                      Unlimited access on any device
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black">
                      12 magazine issues in PDF
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black">
                      Subscriber events and discounts
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[18px] font-normal text-neutral-500">
                  Print &amp; Digital
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] font-semibold text-black">
                      Digital subscription, plus:
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black">
                      12 magazine issues delivered to your door
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[18px] font-normal text-neutral-500">
                  Premium Plus
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] font-semibold text-black">
                      Print &amp; Digital subscription, plus:
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black italic">
                      Kevin Wu
                    </span>
                    <span className="text-[16px] leading-[1.45] text-black">
                      scrapbook
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon icon={faCheck} className="mt-1 text-[#0f6da9]" />
                    <span className="text-[16px] leading-[1.45] text-black">
                      Premium Plus tote bag
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="mt-2">
                Explore Options
              </Button>
            </div>

            <div className="flex items-center gap-6.5 max-[640px]:flex-wrap max-[640px]:gap-4.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.75 font-sans text-[12px] font-bold uppercase tracking-[1.2px] text-[#111] hover:opacity-70 transition cursor-pointer"
              >
                <span>Share</span>
                <Icon icon={faArrowUpFromBracket} className="text-[14px]" />
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.75 font-sans text-[12px] font-bold uppercase tracking-[1.2px] text-[#111] hover:opacity-70 transition cursor-pointer"
              >
                <span>Save</span>
                <Icon icon={faBookmark} className="text-[14px]" />
              </button>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}
