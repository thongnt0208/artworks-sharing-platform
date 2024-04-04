import { Badge } from "primereact/badge";
import { Timeline } from "primereact/timeline";
import { formatTime } from "../../../../util/TimeHandle";
import { MilestoneItemType } from "../../ChatRelatedTypes";
import "./MilestoneView.scss";
// -------------------------------------------------------------

type Props = { data: MilestoneItemType[] };

export default function MilestoneView({ data }: Props) {
  return (
    <div className="milestone-view-container">
      <div className="milestone-view-header pb-4">
        <p className="text-cus-h2-bold">Theo dõi quá trình</p>
      </div>
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
  );
}
