import useTheme from "@/hooks/application/useTheme";
import React from "react";
import styled from "styled-components";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
interface SwitchSliderOptions {
  checked: boolean;
}
const SwitchSlider = styled.span<SwitchSliderOptions>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.disabled};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${({ checked }) =>
      checked ? "translateX(26px)" : "translateX(0px)"};
  }

  &:active:before {
    transform: ${({ checked }) =>
      checked ? "translateX(0);" : "translateX(26px);"};
  }
`;

interface RoundToggleSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const RoundToggleSwitch: React.FC<RoundToggleSwitchProps> = ({
  checked,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Switch>
      <SwitchInput {...props} type="checkbox" checked={checked} />
      <SwitchSlider
        checked={checked}
        style={{
          backgroundColor: checked
            ? theme.colors.primary
            : theme.colors.disabled,
        }}
      />
    </Switch>
  );
};

export default RoundToggleSwitch;
