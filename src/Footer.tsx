import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 6,
        py: 3,
        backdropFilter: "blur(16px)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h6">Movie Explorer</Typography>
          <Typography color="text.secondary">
            A cleaner movie browser with theme-aware design.
          </Typography>
        </Stack>
        <Typography color="text.secondary">
          Copyright {new Date().getFullYear()} Movie App
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
