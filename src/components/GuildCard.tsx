import Image from "next/image";
import styled from "styled-components";
import IGuild from "@/types/IGuild";
interface CardContainerProps {
  isBotMember: boolean;
}
const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 260px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.block};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  filter: ${({ isBotMember }) => (isBotMember ? "none" : "grayscale(1)")};

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:hover .light-sweep {
    opacity: 1;
    transform: translateY(0) rotate(30deg);
  }
`;

const GuildIcon = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  img {
    border-radius: 50%;
  }
`;

const LightSweep = styled.div`
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  filter: blur(10px);
  opacity: 0;
  transform: translateY(100%) rotate(30deg);
  transition: all 0.5s ease;
`;

const GuildName = styled.h2`
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
`;
const Button = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px;
  margin-top: 12px;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

interface GuildCardProps {
  guild: IGuild;
  isBotMember?: boolean;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, isBotMember }) => {
  const { id, name, icon } = guild;
  const nameInitials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  const placeholderImage = URL.createObjectURL(
    new Blob(
      [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100%" height="100%" fill="#CCCCCC"/>
        <text x="50%" y="50%" font-size="40" text-anchor="middle" dy=".3em" fill="#FFFFFF">${nameInitials}</text>
      </svg>`,
      ],
      { type: "image/svg+xml" }
    )
  );

  return (
    <CardContainer isBotMember={isBotMember!}>
      <LightSweep className="light-sweep" />
      <GuildIcon>
        {icon ? (
          <Image
            src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`}
            width={120}
            height={120}
            alt={`Server icon for ${name}`}
            quality={100}
          />
        ) : (
          <Image
            src={placeholderImage}
            width={120}
            height={120}
            alt={`Placeholder image for ${name}`}
            quality={100}
          />
        )}
      </GuildIcon>
      <GuildName>{name}</GuildName>
      {isBotMember ? (
        <Button href={`/guilds/${id}`}>Manage Guild</Button>
      ) : (
        <Button
          href={`http://localhost:3000/api/client/add-guild?guildId=${id}`}
        >
          Add to Guild
        </Button>
      )}
    </CardContainer>
  );
};

export default GuildCard;
