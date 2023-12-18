/**
 * This function is used to get the list of buttons in the ArtworkDetailScreen
 * @param navigate function to navigate to another screen
 * @param Ids (opt) an array of Ids can be used in navigation in format {idName: string, value: string}
 * @returns the list of buttons
 * @example
 * const buttonsList = getButtonsList(navigate);
 * 
 * <div className="side-buttons-container col col-2">
              {buttonsList.map((button, index) => {
                return (
                  <SquareButton
                    key={index}
                    title={button.title}
                    thumbnailImg={button.thumbnailImg}
                    thumbnailAlt={button.thumbnailAlt}
                    onClick={() => {
                      button.onclick();
                    }}
                  />
                );
              })}
            </div>
 * @author ThongNT
 * @version 1.0.0
 */
export function getButtonsList(
  navigate: any,
  Ids?: [{ idName: string; value: string }]
): Array<{
  title: string;
  thumbnailImg: string;
  thumbnailAlt: string;
  onclick: (id?: any) => void;
}> {
  return [
    {
      title: "Theo dõi",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Thuê",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Tài nguyên",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Lưu",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Chia sẻ",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Báo cáo",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
        console.log("baos caos");
      },
    },
  ];
}
