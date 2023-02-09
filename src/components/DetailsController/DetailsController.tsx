import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import DetailsGraph from "../DetailsGraph/DetailsGraph";

const DetailsController = () => {
	const [data1, setData1] = useState<any[]>([]);
	const [data2, setData2] = useState<any[]>([]);
	const [gender, setGender] = useState("male");
	const [ethnicity, setEthnicity] = useState("caucasian");

	useEffect(() => {
		getData();
	}, [gender, ethnicity]);

	const getData = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/data/?gender=${gender}&ethnicity=${ethnicity}`, requestOptions);
		const responseData = await response.json();
		console.log("response", responseData);
		let { data1, data2 } = parseData(responseData);
		console.log(data1);
		setData1(data1);
		setData2(data2);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Box sx={{ display: "flex", gap: 2, width: "50%" }}>
				<FormControl fullWidth>
					<InputLabel id="Gender-select-label">Gender</InputLabel>
					<Select
						labelId="Gender-label"
						id="Gender-select"
						value={gender}
						label="Gender"
						onChange={(e) => {
							setGender(e.target.value);
						}}>
						<MenuItem value={"male"}>Male</MenuItem>
						<MenuItem value={"female"}>Female</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="Ethnicity-select-label">Ethnicity</InputLabel>
					<Select
						labelId="Ethnicity-label"
						id="Ethnicity-select"
						value={ethnicity}
						label="Ethnicity"
						onChange={(e) => {
							setEthnicity(e.target.value);
						}}>
						<MenuItem value={"caucasian"}>Caucasian</MenuItem>
						<MenuItem value={"asian"}>Asian</MenuItem>
						<MenuItem value={"other"}>Other</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box display={"flex"}>
				<DetailsGraph data={data1} width={700} height={400} domain={[20]} xLabel={"Alter"} yLabel={"Augenlänge"} />
				<DetailsGraph
					data={data2}
					width={700}
					height={400}
					domain={[-0.1, 0.45]}
					xLabel={"Alter"}
					yLabel={"Augenlängenzunahme"}
				/>
			</Box>
		</Box>
	);
};

export default DetailsController;

const parseData = (data: any) => {
	const data1 = [];
	const data2 = [];

	let counter = 0;
	for (let i in data) {
		data1.push({ name: i });
		data2.push({ name: i });

		for (let j in data[i]) {
			data1[counter] = { ...data1[counter], [Number(j)]: Number(data[i][j][0]).toFixed(3) };
			data2[counter] = { ...data2[counter], [Number(j)]: Number(data[i][j][1]).toFixed(3) };
		}

		counter++;
	}

	return { data1, data2 };
};
