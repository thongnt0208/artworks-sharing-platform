import { Badge } from "primereact/badge";
import { Timeline } from "primereact/timeline";
import { formatTime } from "../../../../util/TimeHandle";
import { MilestoneItemType } from "../../ChatRelatedTypes";
import "./MilestoneView.scss";
// -------------------------------------------------------------

type Props = { data: MilestoneItemType[] };

export default function MilestoneView({ data }: Props) {
  return (
    <Timeline
      value={data}
      opposite={(milestone) => <Badge value={milestone.milestoneName} severity="info" />}
      content={(milestone) => (
        <small className="text-cus-normal">
          {formatTime(milestone.createdOn, "dd/MM/yyyy HH:mm")}
        </small>
      )}
    />
  );
}
