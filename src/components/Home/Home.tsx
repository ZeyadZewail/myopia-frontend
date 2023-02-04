import { Box, Table, TableRow, TextField, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Autocomplete from "@mui/material/Autocomplete";
import SearchBar from "../SearchBar/SearchBar";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useEffect, useState } from "react";
import DetailedSearch from "../DetailedSearch/DetailedSearch";
import Patient from "../../types/Patient";

const Home = () => {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		getPatients();
	}, []);

	const getPatients = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch("/api/patients/?limit=10", requestOptions);
		const responseData = await response.json();
		setPatients(responseData as Patient[]);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 4 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography fontWeight={"500"} variant="h4">
					Übersicht
				</Typography>
				<SearchBar spacedBetween={false} />
			</Box>
			<Box>
				<TableContainer sx={{ border: "1px solid #DFDFDF", borderRadius: "20px 20px 0px 0px" }}>
					<Table>
						<TableHead>
							<TableCell>Nr</TableCell>
							<TableCell>Patientenname</TableCell>
							<TableCell>Geburtstag</TableCell>
							<TableCell>Zuletzt bearbeitet</TableCell>
							<TableCell></TableCell>
						</TableHead>
						<TableBody>{patients.map((p) => generateRow(p))}</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				{`Anzahl Patienten: ${patients.length}`}
			</Typography>
			<Typography fontWeight={"500"} variant="h4">
				Detailsuche
			</Typography>
			<DetailedSearch />
		</Box>
	);
};

export default Home;

const generateRow = (patient: Patient) => {
	return (
		<TableRow>
			<TableCell>{patient.id.toString().padStart(2, "0")}</TableCell>
			<TableCell>{`${patient.last_name},${patient.first_name}`}</TableCell>
			<TableCell>{patient.birth_date}</TableCell>
			<TableCell>{new Date(patient.last_update).toUTCString()}</TableCell>
			<TableCell sx={{ display: "flex", color: "#395FCF", cursor: "pointer", gap: 1 }}>
				<EditIcon />
				<Typography>Edit</Typography>
			</TableCell>
		</TableRow>
	);
};
