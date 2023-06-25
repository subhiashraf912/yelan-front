// src/components/ElementPicker.tsx
import { WelcomeScreenSettingsWithoutBackground } from "@/types/Welcomer/IWelcomeScreenSettings";
import React, { useState } from "react";
import styled from "styled-components";
import ElementSettings from "../welcomer/ElementSettings";

const ElementPickerButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.secondary : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  transition: 0.3s all;
  margin: 2px;
  width: 50%;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
    transform: translateY(-2px);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const ElementPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ElementSettingsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  z-index: 1;
  transition: all 0.3s ease-in-out;
  @media (max-width: 768px) {
    position: static;
    width: auto;
  }
`;

interface ElementPickerProps {
  localSettings: WelcomeScreenSettingsWithoutBackground;
  setLocalSettings: (data: any) => any;
  onSelect: (elementKey: keyof WelcomeScreenSettingsWithoutBackground) => void;
  onDeselect: () => void;
}

const ElementPicker: React.FC<ElementPickerProps> = ({
  localSettings,
  onSelect,
  onDeselect,
  setLocalSettings,
}) => {
  const [selectedElement, setSelectedElement] = useState<
    keyof WelcomeScreenSettingsWithoutBackground | null
  >(null);

  const handleButtonClick = (
    elementKey: keyof WelcomeScreenSettingsWithoutBackground
  ) => {
    if (selectedElement === elementKey) {
      setSelectedElement(null);
      onDeselect();
    } else {
      setSelectedElement(elementKey);
      onSelect(elementKey);
    }
  };
  const handleElementSettingsChange = (key: string, value: any) => {
    //@ts-ignore
    setLocalSettings((prevSettings) => {
      const newSettings = JSON.parse(JSON.stringify(prevSettings));

      const keyParts = key.split("."); // @ts-ignore
      let currentObj = newSettings[selectedElement];

      for (let i = 0; i < keyParts.length - 1; i++) {
        currentObj = currentObj[keyParts[i]];
      }

      currentObj[keyParts[keyParts.length - 1]] = value;
      return newSettings;
    });
  };
  return (
    <ElementPickerContainer>
      {Object.keys(localSettings).map((key) => (
        <ElementPickerButton
          key={key}
          onClick={() =>
            handleButtonClick(
              key as keyof WelcomeScreenSettingsWithoutBackground
            )
          }
          selected={selectedElement === key ? true : false}
        >
          {key}
          {selectedElement === key && (
            <ElementSettingsContainer>
              <ElementSettings
                settings={localSettings[selectedElement]}
                onChange={handleElementSettingsChange}
              />
            </ElementSettingsContainer>
          )}
        </ElementPickerButton>
      ))}
    </ElementPickerContainer>
  );
};

export default ElementPicker;
