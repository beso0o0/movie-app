import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {eyebrow ? (
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.2em", color: "primary.main", fontWeight: 700 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography
        variant="h3"
        sx={{ mb: subtitle ? 1 : 0, overflowWrap: "break-word", minWidth: 0 }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}

export default SectionHeading;
