import { TableRow, TableCell, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Patient from "../../types/Patient";
import EditIcon from "@mui/icons-material/Edit";

interface rowInterface {
	patient: Patient;
}

const PatientRow: FC<rowInterface> = ({ patient }) => {
	const navigate = useNavigate();

	return (
		<TableRow key={patient.first_name + patient.first_name + patient.birth_date}>
			<TableCell>{patient.id.toString().padStart(2, "0")}</TableCell>
			<TableCell>{`${patient.last_name}`}</TableCell>
			<TableCell>{`${patient.first_name}`}</TableCell>
			<TableCell>{patient.birth_date}</TableCell>
			<TableCell>{new Date(patient.last_update).toUTCString()}</TableCell>
			<TableCell sx={{ display: "flex", color: "#395FCF", cursor: "pointer", gap: 1 }}>
				<Button
					sx={{ display: "flex", gap: 1 }}
					onClick={() => {
						navigate(`/details/${patient.id}`);
					}}>
					<EditIcon />
					<Typography textTransform={"none"}>Edit</Typography>
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default PatientRow;
