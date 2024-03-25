import { proposalStatusEnums } from "../const/uiConstants";

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
