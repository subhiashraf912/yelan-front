// components/FeatureCard.tsx
import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import { IFeature } from "@/types/IFeature";
import { DefaultTheme } from "@/theme";
interface CardContainerProps {
  theme: typeof DefaultTheme;
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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const FeatureName = styled.h2`
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

interface FeatureCardProps {
  feature: IFeature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <CardContainer>
      <FeatureIcon>
        <Image
          src={feature.icon}
          width={120}
          height={120}
          alt={`Icon for ${feature.displayName}`}
          quality={100}
        />
      </FeatureIcon>
      <FeatureName>{feature.displayName}</FeatureName>
      <FeatureDescription>{feature.description}</FeatureDescription>
    </CardContainer>
  );
};

export default FeatureCard;
