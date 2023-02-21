import { Box, Divider, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";

interface MeasurementsInterface {
	firstDiagramData1: any[];
	firstDiagramData2: any[];
	secondDiagramData: any[];
	refractionDiagramData: any[];
	measurementData: any[];
	measurementGrowthData: any[];
}

const Measurements: FC<MeasurementsInterface> = ({
	firstDiagramData1,
	firstDiagramData2,
	secondDiagramData,
	refractionDiagramData,
	measurementData,
	measurementGrowthData,
}) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Typography variant="h2" sx={{ width: "fit-Content" }}>
				Measurements <Divider sx={{ mt: 2 }} />
			</Typography>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Dessert (100g serving)</TableCell>
							<TableCell align="right">Calories</TableCell>
							<TableCell align="right">Fat&nbsp;(g)</TableCell>
							<TableCell align="right">Carbs&nbsp;(g)</TableCell>
							<TableCell align="right">Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Measurements;
