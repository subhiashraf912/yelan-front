import React, { useState, useEffect } from "react";
import RoundToggleSwitch from "@/components/ui/RoundToggleSwitch";
import { useGuildChannels } from "@/hooks/discord/guild/useGuildChannels";
import { updateWelcomeSystem } from "@/utils/api/update/guild/updateWelcomeSystem";
import Button from "@/components/ui/Button";
import { StylesConfig } from "react-select";
import {
  FormContainer,
  InputContainer,
  Label,
  Input,
  StyledReactSelect,
} from "@/components/ui/FormElements";
import { IWelcomeSystem } from "@/types/Welcomer/IWelcomeSystem";
import useTheme from "@/hooks/application/useTheme";
import IGuildChannel from "@/types/discord/IGuildChannel";
import Alert from "../ui/Alert";

interface WelcomeSystemProps {
  accessToken: string;
  guildId: string;
  welcomeSystem: IWelcomeSystem;
  channels: IGuildChannel[];
}

const WelcomeSystem: React.FC<WelcomeSystemProps> = ({
  accessToken,
  guildId,
  welcomeSystem,
  channels,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [sendAttachment, setSendAttachment] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (welcomeSystem) {
      setEnabled(welcomeSystem.enabled);
      setSendAttachment(welcomeSystem.sendAttachment);
      const selectedChannel = channels.find(
        (channel) => channel.id === welcomeSystem.channelId
      );
      setSelectedChannel({
        label: selectedChannel?.name!,
        value: selectedChannel?.id!,
      });
    }
  }, [welcomeSystem, channels]);

  const handleSubmit = async () => {
    try {
      await updateWelcomeSystem(
        guildId,
        {
          enabled,
          channelId: selectedChannel?.value || null,
          content: (document.getElementById("content") as HTMLInputElement)
            ?.value,
          sendAttachment,
        },
        accessToken
      );
      setAlert({ type: "success", message: "Settings updated successfully!" });
    } catch (error) {
      console.error("Error updating settings:", error);
      setAlert({ type: "error", message: "Failed to update settings." });
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const channelOptions = channels
    .filter((channel) => channel.type === 0)
    .map((channel) => ({
      value: channel.id,
      label: channel.name,
    }));
  const theme = useTheme();

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme.colors.background,
      borderColor: state.isFocused
        ? theme.colors.secondary
        : provided.borderColor,
      color: theme.colors.text,
      boxShadow: state.isFocused
        ? `0px 0px 20px 1px ${theme.colors.primary}`
        : "none",
      transition: "all 0.3s",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.colors.text,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.block,
      boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.3)`,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? theme.colors.secondary
        : provided.backgroundColor,
      color: state.isFocused ? theme.colors.background : theme.colors.text,
      borderRadius: "0.5rem",
      transition: "all 0.2s",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: theme.colors.text,
    }),
  };

  return (
    <>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <FormContainer>
        <InputContainer>
          <Label htmlFor="enabled">Enabled:</Label>
          <RoundToggleSwitch
            id="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="channelId">Channel:</Label>
          <StyledReactSelect
            inputId="channelId"
            value={selectedChannel}
            options={channelOptions}
            isSearchable
            styles={customStyles}
            onChange={(option) =>
              setSelectedChannel(option as { label: string; value: string })
            }
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="content">Content:</Label>
          <Input
            id="content"
            defaultValue={welcomeSystem?.content}
            placeholder="Enter content"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="sendAttachment">Send Attachment:</Label>
          <RoundToggleSwitch
            id="sendAttachment"
            checked={sendAttachment}
            onChange={(e) => setSendAttachment(e.target.checked)}
          />
        </InputContainer>
        <Button onClick={handleSubmit}>Submit</Button>
      </FormContainer>
    </>
  );
};

export default WelcomeSystem;
