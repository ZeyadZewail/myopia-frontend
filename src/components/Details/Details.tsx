import { Box, Divider, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Patient from "../../types/Patient";
import Error404 from "../Error404/Error404";
import Loading from "../Loading/Loading";
import Analysis from "./Analysis/Analysis";
import DoctorRating from "./DoctorRating/DoctorRating";
import EditForm from "./EditForm/EditForm";
import GeneralRisks from "./GeneralRisks/GeneralRisks";
import GraphsController from "./Graphs/GraphsController/GraphsController";
import MeasurementForm from "./MeasurementForm/MeasurementForm";
import Measurements from "./Measurements/Measurements";
import RefractionForm from "./RefractionForm/RefractionForm";

const Details = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [patient, setPatient] = useState<Patient>({} as Patient);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<number>(0);
	const [firstDiagramData1, setFirstDiagramData1] = useState<any[]>([]);
	const [firstDiagramData2, setFirstDiagramData2] = useState<any[]>([]);
	const [secondDiagramData, setSecondDiagramData] = useState<any[]>([]);
	const [refractionDiagramData, setRefractionDiagramData] = useState<any[]>([]);
	const [measurementRawData, setMeasurementRawData] = useState<any[]>([]);
	const [measurementData, setMeasurementData] = useState<any[]>([]);
	const [measurementGrowthData, setMeasurementGrowthData] = useState<any[]>([]);
	const [doctorRatingData, setDoctorRatingData] = useState<any[]>([]);

	useEffect(() => {
		getPatientInfo();
	}, [id]);

	useEffect(() => {
		getData();
	}, [patient]);

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
	};

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
		setRefractionDiagramData(parseRefraction(refractionData));

		const measurementDataResponse = await fetch(`/api/measurements/${patient.id}`, requestOptions);
		const measurementData = await measurementDataResponse.json();
		setMeasurementRawData(measurementData);
		setMeasurementData(parseMeasurementData(measurementData));

		const measurementGrowthDataResponse = await fetch(`/api/measurements/${patient.id}`, requestOptions);
		const measurementGrowthData = await measurementGrowthDataResponse.json();
		setMeasurementGrowthData(parseMeasurementGrowthData(measurementGrowthData));

		const doctorRatingDataResponse = await fetch(`/api/doctor_rating/${patient.id}`, requestOptions);
		const doctorRatingData = await doctorRatingDataResponse.json();
		setDoctorRatingData(doctorRatingData);
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
							<Typography variant="h2">
								{patient.first_name + ", " + patient.last_name} <Divider sx={{ mt: 2 }} />
							</Typography>
						</Box>
						<Box sx={{ display: "flex", gap: 4 }}>
							<EditForm patient={patient} />
							<Box sx={{ width: "50%", display: "flex", gap: "inherit" }}>
								<MeasurementForm patient={patient} />
								<RefractionForm patient={patient} />
							</Box>
						</Box>
						<GraphsController
							patient={patient}
							firstDiagramData1={firstDiagramData1}
							firstDiagramData2={firstDiagramData2}
							secondDiagramData={secondDiagramData}
							refractionDiagramData={refractionDiagramData}
							measurementData={measurementData}
							measurementGrowthData={measurementGrowthData}
						/>
						<GeneralRisks patient={patient} />
						<DoctorRating patient={patient} doctorRatingData={doctorRatingData} />
						<Analysis
							id={patient.id}
							aeugenlange={measurementData[0]}
							augenlangenzunahme={measurementGrowthData.at(-1)}
							augenlangenzunahme_diff={refractionDiagramData.at(-1)}
						/>
						<Measurements measurementRawData={measurementRawData} />
					</Box>
				)}
			</Error404>
		</Box>
	);
};

export default Details;

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
