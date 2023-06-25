import React from "react";
import {
  ElementSettingsContainer,
  StyledInput,
  StyledInputLabel,
} from "../ui/DropDownMenu";

interface ElementSettingsProps {
  settings: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

// const ElementSettings: React.FC<ElementSettingsProps> = ({
//   settings,
//   onChange,
// }) => {
//   console.log(`ElementSettings: ${JSON.stringify(settings)}`);

//   const handleNestedChange = (key: string, subKey: string, value: any) => {
//     const updatedNestedValue = { ...settings[key], [subKey]: value };
//     onChange(key, updatedNestedValue);
//   };

//   return (
//     <>
//       {Object.entries(settings).map(([key, value]) => (
//         <div key={key}>
//           <label>
//             {key}:
//             {typeof value === "object" && !Array.isArray(value) ? (
//               <>
//                 {Object.entries(value).map(([subKey, subValue]) => (
//                   <div key={subKey}>
//                     <label>
//                       {subKey}:
//                       <input
//                         type="text"
//                         value={JSON.stringify(subValue)}
//                         onChange={(e) =>
//                           handleNestedChange(key, subKey, e.target.value)
//                         }
//                       />
//                     </label>
//                   </div>
//                 ))}
//               </>
//             ) : (
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => onChange(key, e.target.value)}
//               />
//             )}
//           </label>
//         </div>
//       ))}
//     </>
//   );
// };

const ElementSettings: React.FC<ElementSettingsProps> = ({
  settings,
  onChange,
}) => {
  console.log(`ElementSettings: ${JSON.stringify(settings)}`);
  return (
    <>
      {Object.entries(settings).map(([key, value]) => (
        <ElementSettingsContainer key={key}>
          <StyledInputLabel>{key}:</StyledInputLabel>
          {typeof value === "object" ? (
            <>
              {Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <StyledInputLabel>{subKey}:</StyledInputLabel>
                  <StyledInput
                    type="text"
                    value={JSON.stringify(subValue)}
                    onChange={(e) =>
                      onChange(`${key}.${subKey}`, e.target.value)
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            <StyledInput
              type="text"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
            />
          )}
        </ElementSettingsContainer>
      ))}
    </>
  );
};

export default ElementSettings;
