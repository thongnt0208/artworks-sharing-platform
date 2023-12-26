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
  data?: { accountId: string; avatar?: string;}
): Array<{
  title: string;
  thumbnailImg: string;
  thumbnailAlt: string;
  onclick: (id?: any) => void;
}> {
  const blankPic = require("../../assets/defaultImage/blank-100.png")
  return [
    {
      title: "Theo dõi",
      thumbnailImg: data?.avatar || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Thuê",
      thumbnailImg: blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Tài nguyên",
      thumbnailImg: blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Lưu",
      thumbnailImg: blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Chia sẻ",
      thumbnailImg: blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Báo cáo",
      thumbnailImg: blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
        console.log("baos caos");
      },
    },
  ];
}
