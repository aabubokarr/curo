import React from "react";
import {
  Card as MuiCard,
  CardContent,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { theme } from "../../../constants/theme";

const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = true,
  ...props
}) => {
  const paddingMap = {
    none: 0,
    sm: 2,
    md: 3,
    lg: 4,
  };

  const shadowMap = {
    none: "none",
    sm: "0 2px 8px rgba(0, 0, 0, 0.04)",
    md: "0 8px 30px rgba(0, 0, 0, 0.06)",
    lg: "0 15px 45px rgba(0, 0, 0, 0.08)",
  };

  return (
    <MuiCard
      elevation={0}
      className={className}
      sx={{
        position: "relative",
        overflow: "hidden",

        borderRadius: "20px",

        border: `1px solid ${alpha(
          theme.colors.border.light,
          0.8
        )}`,

        background: `
          linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.98),
            rgba(248, 250, 252, 0.95)
          )
        `,

        boxShadow: shadowMap[shadow],

        backdropFilter: "blur(12px)",

        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

        ...(hover && {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 18px 45px rgba(0, 0, 0, 0.10)",
            borderColor: alpha(
              theme.colors.primary.main,
              0.2
            ),
          },
        }),

        // Subtle decorative glow
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: alpha(
            theme.colors.primary.main,
            0.06
          ),
          pointerEvents: "none",
        },

        ...props.sx,
      }}
      {...props}
    >
      <CardContent
        sx={{
          position: "relative",
          p: paddingMap[padding],

          "&:last-child": {
            pb: paddingMap[padding],
          },
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
