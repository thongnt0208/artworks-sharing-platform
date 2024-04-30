import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ConfirmProposal } from "../../services/ProposalServices";
import { ProposalType } from "../../ChatRelatedTypes";
import { useState } from "react";
import { toast } from "react-toastify";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";

type Props = {
  selectingProposal: ProposalType;
  refreshProposalList?: () => void;
};

export default function AddConfirmProposal({ selectingProposal, refreshProposalList }: Props) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        dismissableMask
        accept={() => {
          ConfirmProposal(selectingProposal?.id).then(() => {
            toast.success("Xác nhận thành công");
            refreshProposalList && refreshProposalList();
          }).catch((err)=> CatchAPICallingError(err, navigate));
        }}
        reject={() => setVisible(false)}
        message={
          <>
            <p>
              Chọn xác nhận nghĩa là bạn đã hoàn toàn hài lòng với sản phẩm cuối cùng của Nhà sáng
              tạo. Xu sẽ được chuyển cho Nhà sáng tạo.
            </p>
            <p>Hành động này không thể hoàn tác.</p>
          </>
        }
        headerStyle={{ border: "none", padding: "8px" }}
        style={{ width: "25vw" }}
      />
      <h3>Xác nhận yêu cầu</h3>
      <Button onClick={() => setVisible(true)}>Xác nhận đúng yêu cầu</Button>
    </>
  );
}
