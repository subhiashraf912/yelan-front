import { IWelcomeScreenSettings } from "@/types/Welcomer/IWelcomeScreenSettings";
import { useState } from "react";

const WelcomeScreenSettings = ({}) => {
  const [welcomeScreenSettings, setWelcomeScreenSettings] =
    useState<IWelcomeScreenSettings | null>(null);
  return <div></div>;
};

export default WelcomeScreenSettings;
