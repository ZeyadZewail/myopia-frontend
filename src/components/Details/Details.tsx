import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Patient from "../../types/Patient";
import GraphsController from "./Graphs/GraphsController/GraphsController";

const Details = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [patient, setPatient] = useState<Patient>({} as Patient);

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
		setPatient(responseData as Patient);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 4 }}>
			<GraphsController patient={patient} />
		</Box>
	);
};

export default Details;
