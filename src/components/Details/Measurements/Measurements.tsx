import {
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { FC } from "react";

interface MeasurementsInterface {
	measurementRawData: any[];
}

const Measurements: FC<MeasurementsInterface> = ({ measurementRawData }) => {
	console.log(measurementRawData);
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Typography variant="h2" sx={{ width: "fit-Content" }}>
				Measurements <Divider sx={{ mt: 2 }} />
			</Typography>

			<TableContainer sx={{ border: "1px solid #DFDFDF", borderRadius: "20px 20px 0px 0px" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">Date</TableCell>
							<TableCell align="left">age</TableCell>
							<TableCell align="left">Ra achslaenge</TableCell>
							<TableCell align="left">la achslaenge</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{measurementRawData != undefined ? measurementRawData.map((p) => generateRows(p)) : null}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Measurements;

const generateRows = (measurementData: any) => {
	return (
		<TableRow key={measurementData.id}>
			<TableCell>{measurementData.id}</TableCell>
			<TableCell>{measurementData.date_measurement}</TableCell>
			<TableCell>{measurementData.age}</TableCell>
			<TableCell>{measurementData.ra_achslaenge}</TableCell>
			<TableCell>{measurementData.la_achslaenge}</TableCell>
		</TableRow>
	);
};
