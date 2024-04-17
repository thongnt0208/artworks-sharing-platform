import * as React from "react";
import Watermark from "watermark-image";
import Img from "./../../assets/logo/logo_notext.png";

interface WatermarkModuleProps {}

interface WatermarkModuleStatus {
  text: string;
  hex: string;
  fontSize: number;
  watermarkHeight: number;
  watermarkWidth: number;
  rgb: any;
}

class WatermarkModule extends React.Component<
  WatermarkModuleProps,
  WatermarkModuleStatus
> {
  mainCanvas: HTMLCanvasElement | null = null;
  watermark: any = "";
  state = {
    text: "Artworkia",
    hex: "#000000",
    rgb: { r: 0, g: 0, b: 0, a: 0.4 },
    fontSize: 23,
    watermarkHeight: 180,
    watermarkWidth: 280
  };

  componentDidMount(): void {
    const { text, rgb, fontSize, watermarkWidth, watermarkHeight } = this.state;
    const fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    this.watermark = new Watermark(this.mainCanvas as HTMLCanvasElement);
    this.watermark.draw(Img, {
      text,
      fillStyle,
      fontSize,
      watermarkWidth,
      watermarkHeight
    });
  }

  saveAsImg = () => {
    this.watermark.save();
  };

  rotate = () => {
    this.watermark.rotate();
  };

  render() {
    return (
      <React.Fragment>
        <div className="watermark-container container">
          <span
            onClick={this.rotate}
            style={{ color: "blue", marginRight: 20 }}
          >
            ratate
          </span>
          <span onClick={this.saveAsImg} style={{ color: "blue" }}>
            saveImg
          </span>

          <div className="canvas-wrap" style={{ paddingTop: "30px" }}>
            <div
              className=""
              style={{
                marginTop: 30,
                flex: 1,
                minWidth: 300,
                width: 500,
                height: "auto"
              }}
            >
              <canvas
                id="canvas"
                style={{ width: "100%" }}
                ref={mainCanvas => (this.mainCanvas = mainCanvas)}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WatermarkModule;
