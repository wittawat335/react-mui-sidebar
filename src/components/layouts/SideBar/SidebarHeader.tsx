import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, HTMLAttributes } from "react";
import { FaReact } from "react-icons/fa";

interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #07b7fa;
  font-size: 24px;
  font-weight: 700;

  background: #18191a;
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader: FC<SidebarHeaderProps> = ({
  children,
  rtl,
  ...rest
}) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: "flex" }}>
        <StyledLogo rtl={rtl}>
          <FaReact size={40} />
        </StyledLogo>
        <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
          React App
        </Typography>
      </div>
    </StyledSidebarHeader>
  );
};
