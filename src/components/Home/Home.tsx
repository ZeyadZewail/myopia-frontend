import { Box, Table, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Fragment, useEffect, useState } from "react";
import DetailedSearch from "../DetailedSearch/DetailedSearch";
import Patient from "../../types/Patient";
import PatientRow from "./PatientRow";
import Loading from "../Loading/Loading";

const Home = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, SetLoading] = useState(true);

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
		SetLoading(false);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 4 }}>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
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
									<TableCell>Nachname</TableCell>
									<TableCell>Vorname</TableCell>
									<TableCell>Geburtstag</TableCell>
									<TableCell>Zuletzt bearbeitet</TableCell>
									<TableCell></TableCell>
								</TableHead>
								<TableBody>
									{patients.map((p) => (
										<PatientRow patient={p} />
									))}
								</TableBody>
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
				</Fragment>
			)}
		</Box>
	);
};

export default Home;
