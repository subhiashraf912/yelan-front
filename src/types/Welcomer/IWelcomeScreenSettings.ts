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
  welcomeText: {
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
  };
  subtitleText: {
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
  };
  memberCountText: {
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
  };
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
