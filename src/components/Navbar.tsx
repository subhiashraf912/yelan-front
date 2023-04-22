// src/components/Navbar.tsx
import React, { use, useState } from "react";
import styled from "styled-components";
import User from "@/types/User";

interface NavbarProps {
  bot: User;
  userUsername:string
  user: User | null;
  navItems: { url: string; name: string }[];
  error: string | null;
  onLogin: () => void;
}
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: visible;
  position: sticky;
  top: 0;
  z-index: 100;
`;
 
const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(-3);
  }
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 1rem;
`;

const DropdownMenu = styled.div<{ open: boolean }>`
  position: absolute;
  right: 1rem;
  top: calc(100% - 92%);
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const DropdownMenuItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  background-color: transparent;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const UserContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
`;
const Navbar: React.FC<NavbarProps> = ({
  bot,
  user,
  navItems,
  error,
  onLogin,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`;
 
  return (
    <NavbarContainer>
      <span>{bot.username}</span>
      <nav>
        {navItems.map((item, index) => (
          <NavLink key={index} href={item.url}>
            {item.name}
          </NavLink>
        ))}
      </nav>
      {user ? (
        <>
          <UserContainer onClick={toggleDropdown}>
            <Avatar src={userAvatarUrl} alt={`${user.username} avatar`} />
         <span >{user.username}{user.discriminator}</span>
          </UserContainer>
          {dropdownOpen && (
            <DropdownMenu open={dropdownOpen}>
              <DropdownMenuItem href="/settings">Settings</DropdownMenuItem>
              <DropdownMenuItem href="http://localhost:3000/api/user/logout">
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </>
      ) : (
        <DropdownMenuItem style={{ cursor: "pointer" }} onClick={onLogin}>
          Login
        </DropdownMenuItem>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
