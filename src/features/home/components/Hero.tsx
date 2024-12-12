import { Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Title } from "../../../components/common/Title";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <>
      <Title title={title} />
      <Typography variant="h5" component="p" gutterBottom>
        {subtitle}
      </Typography>
      <Box my={5}>
        <Button
          variant="contained"
          color="secondary"
          component={NavLink}
          to="/posts"
        >
          Ver posts
        </Button>
      </Box>
      <img src="/src/assets/cody.png" alt="" />
    </>
  );
}
