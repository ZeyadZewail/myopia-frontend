import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Patient from "../../types/Patient";
import Loading from "../Loading/Loading";
import EditForm from "./EditForm/EditForm";
import GraphsController from "./Graphs/GraphsController/GraphsController";

const Details = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [patient, setPatient] = useState<Patient>({} as Patient);
	const [loading, setLoading] = useState(true);

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
		setLoading(false);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 8 }}>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
					<EditForm patient={patient} /> <GraphsController patient={patient} />
				</Fragment>
			)}
		</Box>
	);
};

export default Details;
