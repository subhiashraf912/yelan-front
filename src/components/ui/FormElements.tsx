import styled from "styled-components";
import ReactSelect from "react-select";
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledReactSelect = styled(ReactSelect)`
  flex-grow: 1;
`;
