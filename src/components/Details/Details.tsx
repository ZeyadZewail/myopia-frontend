import { Box, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Patient from "../../types/Patient";
import Error404 from "../Error404/Error404";
import Loading from "../Loading/Loading";
import EditForm from "./EditForm/EditForm";
import GeneralRisks from "./GeneralRisks/GeneralRisks";
import GraphsController from "./Graphs/GraphsController/GraphsController";
import MeasurementForm from "./MeasurementForm/MeasurementForm";
import RefractionForm from "./RefractionForm/RefractionForm";

const Details = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [patient, setPatient] = useState<Patient>({} as Patient);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<number>(0);

	useEffect(() => {
		getPatientInfo();
	}, [id]);

	const getPatientInfo = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/patients/${id}`, requestOptions);
		const responseData = await response.json();
		if (response.status == 404) {
			setError(404);
			return;
		}
		setPatient(responseData as Patient);
		setLoading(false);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 8 }}>
			<Error404 error={error} message={"Patient Not Found."}>
				{loading ? (
					<Loading />
				) : (
					<Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
						<Box sx={{ display: "flex", gap: 0, width: "100%" }}>
							<Typography variant="h2">{patient.first_name + ", " + patient.last_name}</Typography>
						</Box>
						<Box sx={{ display: "flex" }}>
							<EditForm patient={patient} />
							<MeasurementForm patient={patient} />
							<RefractionForm patient={patient} />
						</Box>
						<GraphsController patient={patient} />
						<GeneralRisks patient={patient} />
					</Box>
				)}
			</Error404>
		</Box>
	);
};

export default Details;
