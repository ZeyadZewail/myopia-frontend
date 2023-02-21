import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Patient from "../../../../types/Patient";
import EyesightGraph from "../EyesightGraph/EyesightGraph";
import RefractionGraph from "../RefractionGraph/RefractionGraph";

interface DetailsControllerInterface {
	patient: Patient;
}

const GraphsController: FC<DetailsControllerInterface> = ({ patient }) => {
	const [firstDiagramData1, setFirstDiagramData1] = useState<any[]>([]);
	const [firstDiagramData2, setFirstDiagramData2] = useState<any[]>([]);
	const [secondDiagramData, setSecondDiagramData] = useState<any[]>([]);
	const [refractionDiagramData, setRefractionDiagramData] = useState<any[]>([]);
	const [measurementData, setMeasurementData] = useState<any[]>([]);
	const [measurementGrowthData, setMeasurementGrowthData] = useState<any[]>([]);

	useEffect(() => {
		getData();
	}, [patient]);

	const getData = async () => {
		if (!patient.gender || !patient.ethnicity || !patient.id) {
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
		let [data1, data2] = parseFirst(responseData["firstDiagram"]);

		setFirstDiagramData1(data1);
		setFirstDiagramData2(data2);

		let data3 = parseSecond(responseData["secondDiagram"]);
		setSecondDiagramData(data3);

		const refractionResponse = await fetch(`/api/refactory/${patient.id}`);
		const refractionData = await refractionResponse.json();
		console.log("refactory", refractionData);
		setRefractionDiagramData(parseRefraction(refractionData));

		const measurementDataResponse = await fetch(`/api/measurements/${patient.id}`, requestOptions);
		const measurementData = await measurementDataResponse.json();
		setMeasurementData(parseMeasurementData(measurementData));

		const measurementGrowthDataResponse = await fetch(`/api/measurements/growth/${patient.id}`, requestOptions);
		const measurementGrowthData = await measurementGrowthDataResponse.json();
		setMeasurementGrowthData(parseMeasurementGrowthData(measurementGrowthData));
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Box display={"flex"}>
				<EyesightGraph
					data={firstDiagramData1}
					width={700}
					height={400}
					domain={[20]}
					xLabel={"Alter"}
					yLabel={"Augenlänge"}
					patientData={measurementData}
				/>
				<EyesightGraph
					data={secondDiagramData}
					width={700}
					height={400}
					domain={[-0.2]}
					xLabel={"Alter"}
					yLabel={"Achslängenwachstum [mm]"}
					patientData={measurementGrowthData}
				/>
			</Box>
			<Box display={"flex"}>
				<RefractionGraph
					data={refractionDiagramData}
					width={700}
					height={400}
					domain={[0, 3]}
					xLabel={"Alter"}
					yLabel={"Refraktion"}
				/>
			</Box>
		</Box>
	);
};

export default GraphsController;

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

const parseMeasurementData = (data: any) => {
	const data1 = [];

	let counter = 0;
	for (let i in data) {
		data1.push({ name: data[i]["age"].toString() });

		data1[counter] = { ...data1[counter], ["Rechtes Auge"]: Number(data[i]["ra_achslaenge"]).toFixed(3) };
		data1[counter] = { ...data1[counter], ["Linkes Auge"]: Number(data[i]["la_achslaenge"]).toFixed(3) };
		counter++;
	}

	return data1;
};

const parseMeasurementGrowthData = (data: any) => {
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
