import { Box, Table, TableRow, TextField, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Patient {
	id: Number;
	first_name: string;
	last_name: string;
	birth_date: string;
	last_update: string;
}

const Home = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		getPatients();
	}, [searchParams]);

	const getPatients = async () => {
		const params = Object.fromEntries([...searchParams]);
		const { first_name, last_name, birth_date } = params;

		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name, last_name, birth_date }),
		};

		const response = await fetch("/api/patients/search", requestOptions);
		const responseData = await response.json();
		console.log("response", responseData);
		if (response.ok) {
			setPatients(responseData as Patient[]);
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 4 }}>
			<SearchBar spacedBetween={true} />
			<Typography fontWeight={"500"} variant="h4">
				Search Results
			</Typography>
			<Box>
				<TableContainer sx={{ border: "1px solid #DFDFDF", borderRadius: "20px 20px 0px 0px" }}>
					<Table>
						<TableHead>
							<TableCell>Nr</TableCell>
							<TableCell>Nachname</TableCell>
							<TableCell>Vorname</TableCell>
							<TableCell>Geburtstag</TableCell>
							<TableCell>Zuletzt bearbeitet</TableCell>
							<TableCell></TableCell>
						</TableHead>
						<TableBody>{patients.length > 0 ? patients.map((p) => generateRow(p)) : null}</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				{`Anzahl Patienten: ${patients.length}`}
			</Typography>
		</Box>
	);
};

export default Home;

const generateRow = (patient: Patient) => {
	return (
		<TableRow>
			<TableCell>{patient.id.toString().padStart(2, "0")}</TableCell>
			<TableCell>{`${patient.last_name}`}</TableCell>
			<TableCell>{`${patient.first_name}`}</TableCell>
			<TableCell>{patient.birth_date}</TableCell>
			<TableCell>{new Date(patient.last_update).toUTCString()}</TableCell>
			<TableCell sx={{ display: "flex", color: "#395FCF", cursor: "pointer", gap: 1 }}>
				<EditIcon />
				<Typography>Edit</Typography>
			</TableCell>
		</TableRow>
	);
};
