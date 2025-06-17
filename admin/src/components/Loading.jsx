import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "500px",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "pink" }} />
    </Box>
  );
};

export default Loading;
