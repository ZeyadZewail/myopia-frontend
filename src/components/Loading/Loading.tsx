import { Box, Typography, CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100%",
				justifyContent: "center",
				width: "100%",
				gap: 4,
			}}>
			<Typography variant="h1">Loading</Typography>
			<CircularProgress sx={{ scale: "1.5" }} />
		</Box>
	);
};

export default Loading;
