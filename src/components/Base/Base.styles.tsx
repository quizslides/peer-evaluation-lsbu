import styled from "@emotion/styled";

import Typography from "@/components/Typography/Typography";

interface BodyProps {
  backgroundImage: string | null;
}

interface FooterTextProps {
  color?: string;
}

export const Body = styled.div<BodyProps>`
  background: ${(props) =>
    props.backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${props.backgroundImage})`
      : ""};
  background-size: ${(props) => (props.backgroundImage ? "cover" : "")};
  background-repeat: ${(props) => (props.backgroundImage ? "no-repeat" : "")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const container = styled.div`
  .container {
    width: 100%;
  }

  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }
`;

export const Footer = styled(container)`
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const FooterText = styled(Typography)<FooterTextProps>`
  opacity: "0.5";
  color: ${(props) => (props.color ? props.color : "")};

  &:hover {
    opacity:  "0.7";
`;

export const Main = styled(container)`
  flex: 1 1 0%;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
`;
