export interface IWelcomeSystem {
  channelId: string | null;
  guildId: string;
  content: string;
  sendAttachment: boolean;
  enabled: boolean;
}
