import {
	Box,
	Button,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useSetAtom } from "jotai";
import {
	customDialogMessage,
	customDialogOpen,
	customDialogType,
	customDialogError,
} from "../../CustomDialog/CustomDialog";

interface MeasurementsInterface {
	measurementRawData: any[];
	getData: Function;
}

const Measurements: FC<MeasurementsInterface> = ({ measurementRawData, getData }) => {
	const setCustomMessage = useSetAtom(customDialogMessage);
	const setCustomDialogOpen = useSetAtom(customDialogOpen);
	const setCustomDialogType = useSetAtom(customDialogType);
	const setCustomDialogError = useSetAtom(customDialogError);

	const deleteMeasurement = async (id: Number) => {
		const requestOptions = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/measurements/${id}`, requestOptions);
		if (response.status == 404) {
			setCustomDialogType("warning");
			setCustomDialogError("404");
			setCustomMessage("Something Went Wrong");
			setCustomDialogOpen(true);
			return;
		}

		if (response.ok) {
			setCustomDialogType("success");
			setCustomMessage("Deleted Successfully!");
			setCustomDialogError("");
			setCustomDialogOpen(true);
		} else {
			setCustomDialogType("warning");
			setCustomMessage("Something Went Wrong");
			setCustomDialogOpen(true);
		}

		getData();
	};

	const generateRows = (measurementData: any) => {
		return (
			<TableRow key={measurementData.id}>
				<TableCell>{measurementData.id}</TableCell>
				<TableCell>{measurementData.date_measurement}</TableCell>
				<TableCell>{measurementData.age}</TableCell>
				<TableCell>{measurementData.ra_achslaenge}</TableCell>
				<TableCell>{measurementData.la_achslaenge}</TableCell>
				<TableCell>
					<Button
						sx={{ display: "flex", gap: 1 }}
						onClick={() => {
							deleteMeasurement(measurementData.id);
						}}>
						<DeleteIcon sx={{ color: "red" }} />
					</Button>
				</TableCell>
			</TableRow>
		);
	};

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
							<TableCell align="left"></TableCell>
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
