import React, { useState } from "react";
import styled from "styled-components";
import { IWelcomeScreenSettings } from "@/types/Welcomer/IWelcomeScreenSettings";
import CanvasEditor from "./CanvasEditor";
import { FormContainer } from "../ui/FormElements";

const WelcomeScreenSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CanvasWrapper = styled.div`
  width: 500px;
  height: 300px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const WelcomeScreenSettings = ({
  welcomeScreenSettings,
}: {
  welcomeScreenSettings: IWelcomeScreenSettings;
}) => {
  const [settings, setSettings] = useState(welcomeScreenSettings);

  const handleSave = (newSettings: IWelcomeScreenSettings) => {
    setSettings(newSettings);
  };

  return (
    <FormContainer>
      <WelcomeScreenSettingsWrapper>
        <h2>Welcome Screen Settings</h2>
        <p>
          Use the canvas editor below to adjust the settings for your welcome
          screen.
        </p>
        {/* <CanvasWrapper> */}
        <CanvasEditor settings={settings} onSave={handleSave} />
        {/* </CanvasWrapper> */}
        <button onClick={() => console.log(settings)}>Submit</button>
      </WelcomeScreenSettingsWrapper>
    </FormContainer>
  );
};

export default WelcomeScreenSettings;
