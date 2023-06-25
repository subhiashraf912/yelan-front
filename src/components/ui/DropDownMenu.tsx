import styled from "styled-components";

const StyledDropdown = styled.select`
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  outline: none;
  cursor: pointer;
`;

const StyledInputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  outline: none;
  width: 100%;
  box-sizing: border-box;
`;

const ElementSettingsContainer = styled.div`
  margin-bottom: 16px;
`;

export {
  ElementSettingsContainer,
  StyledDropdown,
  StyledInput,
  StyledInputLabel,
};
