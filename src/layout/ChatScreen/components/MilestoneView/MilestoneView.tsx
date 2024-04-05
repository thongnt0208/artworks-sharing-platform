import { Badge } from "primereact/badge";
import { Timeline } from "primereact/timeline";
import { formatTime } from "../../../../util/TimeHandle";
import { MilestoneItemType } from "../../ChatRelatedTypes";
import "./MilestoneView.scss";
import { Panel } from "primereact/panel";
// -------------------------------------------------------------

type Props = { data: MilestoneItemType[] };

export default function MilestoneView({ data }: Props) {
  const headerTemplate = (options: any) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="milestone-view-header w-full" style={{ textAlign: "center" }}>
          <p className="text-cus-h3-bold pl-5">Theo dõi quá trình</p>
        </div>
        <div>{options.togglerElement}</div>
      </div>
    );
  };

  return (
    <Panel headerTemplate={headerTemplate} toggleable collapsed>
      <div className="milestone-view-container">
        <div className="milestone-view-content">
          <Timeline
            value={data}
            opposite={(milestone) => <Badge value={milestone.milestoneName} severity="info" />}
            content={(milestone) => (
              <small className="text-cus-normal">
                {formatTime(milestone.createdOn, "dd/MM/yyyy HH:mm")}
              </small>
            )}
          />
        </div>
      </div>
    </Panel>
  );
}
