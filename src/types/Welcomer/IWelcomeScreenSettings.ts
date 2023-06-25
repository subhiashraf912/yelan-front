export interface CanvasTextElement {
  shadow: {
    shadowColor: string;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
  };
  color: string;
  text: string;
  size: number;
  font: string;
  x: number;
  y: number;
  align: string;
}

export interface IWelcomeScreenSettings {
  avatar: {
    stroke: {
      color: string;
      width: number;
    };
    radius: number;
    x: number;
    y: number;
  };
  statusCircle: {
    radius: number;
    margin: number;
    x: number;
    y: number;
  };
  welcomeText: CanvasTextElement;
  subtitleText: CanvasTextElement;
  memberCountText: CanvasTextElement;
  overlay: {
    opacity: number;
    margin: number;
  };
  guildId: string;
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImageUrl: string;
}

export type WelcomeScreenSettingsWithoutBackground = Omit<
  IWelcomeScreenSettings,
  | "guildId"
  | "width"
  | "height"
  | "backgroundColor"
  | "backgroundImageUrl"
  | "stroke"
  | "overlay"
>;
