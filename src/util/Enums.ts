export const proposalStatusEnums = [
  {
    name: "Waiting",
    value: 0,
    vietnamese: "Đang chờ",
  },
  {
    name: "Accepted",
    value: 1,
    vietnamese: "Đã chấp nhận",
  },
  {
    name: "Declined",
    value: 2,
    vietnamese: "Bị từ chối",
  },
  {
    name: "InitPayment",
    value: 3,
    vietnamese: "Đã đặt cọc",
  },
  {
    name: "CompletePayment",
    value: 4,
    vietnamese: "Thanh toán xong",
  },
  {
    name: "Cancelled",
    value: 5,
    vietnamese: "Bị hủy",
  },
  {
    name: "Completed",
    value: 6,
    vietnamese: "Hoàn thành",
  },
  {
    name: "ConfirmPayment",
    value: 7,
    vietnamese: "Đã xác nhận thanh toán",
  }
];

export const reportTypeEnums = [
  {
    id: 0,
    name: "Harassment",
    value: "Harassment",
    vietnamese: "Quấy rối",
  },
  {
    id: 1,
    name: "HateSpeech",
    value: "HateSpeech",
    vietnamese: "Lời lẽ thù địch",
  },
  {
    id: 2,
    name: "Spam",
    value: "Spam",
    vietnamese: "Tin rác",
  },
  {
    id: 3,
    name: "Impersonation",
    value: "Impersonation",
    vietnamese: "Tin giả mạo",
  },
  {
    id: 4,
    name: "InappropriateContent",
    value: "InappropriateContent",
    vietnamese: "Nội dung không phù hợp",
  },
  {
    id: 5,
    name: "Other",
    value: "Other",
    vietnamese: "Khác",
  },
];

/**
 * Translates a proposal status code into its corresponding string representation.
 *
 * @param status - The status code to be translated.
 * @returns The string representation of the status code.
 */
export function translateProposalStatus(status: string): string {
  let result: string = "Không thể xác định";

  let finding = proposalStatusEnums.find((element) => {
    if (element.name === status) {
      result = element.vietnamese;
      return true;
    }
    return false;
  });

  if (!finding) result = "Không thể xác định";

  return result;
}

export const requestStatusEnums = [
  {
    name: "Waiting",
    value: 0,
    vietnamese: "Đang đợi",
  },
  {
    name: "Accepted",
    value: 1,
    vietnamese: "Đã chấp nhận",
  },
  {
    name: "Declined",
    value: 2,
    vietnamese: "Đã từ chối",
  },
];

/**
 * This function is used to translate request status
 * 
 * @param status - The status code to be translated. 
 * @returns The string representation of the status code.
 * @example
 * var status = translateRequestStatus("Waiting"); //expected to return "Đang đợi"
 * @version 1.0.0
 * @author @thongnt0208
 */
export function translateRequestStatus(status: string): string {
  let result: string = "Không thể xác định";

  let finding = requestStatusEnums.find((element) => {
    if (element.name === status) {
      result = element.vietnamese;
      return true;
    }
    return false;
  });

  if (!finding) result = "Không thể xác định";

  return result;
}