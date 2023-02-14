import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Patient from "../../../types/Patient";
import DetailsGraph from "../DetailsGraph/DetailsGraph";
import EyesightGraph from "../EyesightGraph/EyesightGraph";
import RefractionGraph from "../RefractionGraph/RefrecationGraph";

interface DetailsControllerInterface {
	patient: Patient;
}

const DetailsController: FC<DetailsControllerInterface> = ({ patient }) => {
	const [data1, setData1] = useState<any[]>([]);
	const [data2, setData2] = useState<any[]>([]);
	const [data3, setData3] = useState<any[]>([]);
	const [data4, setData4] = useState<any[]>([]);
	const [patientData, setPatientData] = useState<any[]>([]);

	useEffect(() => {
		getData();
		getPatientData();
	}, [patient]);

	const getData = async () => {
		if (!patient.gender || !patient.ethnicity) {
			return;
		}

		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/data/?gender=${patient.gender}&ethnicity=${patient.ethnicity}`, requestOptions);
		const responseData = await response.json();
		console.log("response", responseData);
		let [data1, data2] = parseFirst(responseData["firstDiagram"]);

		setData1(data1);
		setData2(data2);

		let data3 = parseSecond(responseData["secondDiagram"]);
		console.log(data3);
		setData3(data3);

		const refractionResponse = await fetch(`/api/refactory/${patient.id}`);
		const refractionData = await refractionResponse.json();
		setData4(parseRefraction(refractionData));
	};

	const getPatientData = async () => {
		if (!patient.id) {
			return;
		}

		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/measurements/growth/${patient.id}`, requestOptions);
		const responseData = await response.json();

		let data = parsePatientData(responseData);
		console.log("patientData", data);
		setPatientData(data);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Box sx={{ display: "flex", gap: 2, width: "50%" }}>
				<Typography variant="h2">{patient.first_name + " " + patient.last_name}</Typography>
			</Box>
			<Box display={"flex"}>
				<DetailsGraph data={data1} width={700} height={400} domain={[20]} xLabel={"Alter"} yLabel={"Augenlänge"} />
				<DetailsGraph
					data={data2}
					width={700}
					height={400}
					domain={[-0.1, 0.45]}
					xLabel={"Alter"}
					yLabel={"Achsenlänge [mm]"}
				/>
			</Box>
			<Box display={"flex"}>
				<EyesightGraph
					data={data3}
					width={700}
					height={400}
					domain={[-0.2]}
					xLabel={"Alter"}
					yLabel={"Achslängenwachstum [mm]"}
					patientData={patientData}
				/>
				<RefractionGraph data={data4} width={700} height={400} domain={[0, 3]} xLabel={"Alter"} yLabel={"Refraktion"} />
			</Box>
		</Box>
	);
};

export default DetailsController;

const parseFirst = (data: any) => {
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

	return [data1, data2];
};

const parseSecond = (data: any) => {
	const data1 = [];

	let counter = 0;
	for (let i in data) {
		data1.push({ name: i });

		for (let j in data[i]) {
			data1[counter] = { ...data1[counter], [Number(j)]: Number(data[i][j]).toFixed(3) };
		}

		counter++;
	}

	return data1;
};

const parsePatientData = (data: any) => {
	const data1 = [];

	let counter = 0;
	for (let i in data) {
		data1.push({ name: data[i]["age"].toString() });

		data1[counter] = { ...data1[counter], ["Rechtes Auge"]: Number(data[i]["ra_growth_per_year"]).toFixed(3) };
		data1[counter] = { ...data1[counter], ["Linkes Auge"]: Number(data[i]["la_growth_per_year"]).toFixed(3) };
		counter++;
	}

	return data1;
};

const parseRefraction = (data: any) => {
	const data1 = [];

	let counter = 0;
	for (let i in data) {
		data1.push({ name: data[i]["id"].toString() });

		data1[counter] = { ...data1[counter], ["Right refraction"]: Number(data[i]["refactory_right"]).toFixed(3) };
		data1[counter] = { ...data1[counter], ["Left refraction"]: Number(data[i]["refactory_left"]).toFixed(3) };
		counter++;
	}

	return data1;
};
