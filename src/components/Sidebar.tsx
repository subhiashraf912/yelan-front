import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { features } from "@/utils/constants";
import Link from "next/link";
import { IFeature } from "@/types/IFeature";
import { useRouter } from "next/router";

const ToggleSidebarButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;
  padding-left: 12px;
  padding-top: 2px;
`;

interface SidebarProps {
  onToggle: () => void;
  isOpen: boolean;
}
const FeatureLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

//FIXED BUTTON FOR THE SIDEBAR, BECAUSE WHEN THE SIDEBAR IS HIDDEN THIS BUTTON WILL BE ON TO BRING THE SIDEBAR BACK
const FixedSidebarToggleButton = styled.button<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
  position: fixed;
  top: 80px;
  left: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const Sidebar: React.FC<SidebarProps> = ({ onToggle, isOpen }) => {
  const router = useRouter();
  const { guildId } = router.query;
  return (
    <>
      <FixedSidebarToggleButton isOpen={isOpen} onClick={onToggle}>
        <FiMenu />
      </FixedSidebarToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <h2>
          <ToggleSidebarButton onClick={onToggle}>
            <FiMenu />
          </ToggleSidebarButton>
          Features
        </h2>
        <ul>
          {features.map((feature: IFeature) => (
            <li key={feature.id}>
              <Link href={`/guilds/${guildId}/${feature.name}`} passHref>
                <FeatureLink>{feature.displayName}</FeatureLink>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.block};
  padding: 1rem;
  overflow-y: auto;
  //   z-index: 1000;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
`;
export default Sidebar;
