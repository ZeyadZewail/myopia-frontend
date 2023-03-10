import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomizedDot } from "../RefractionGraph/RefractionGraph";

interface DetailsGraphInterface {
	data: object[];
	patientData: Object[];
	width: number;
	height: number;
	xLabel: string;
	yLabel: string;
	domain: any[];
}

const EyesightGraph: FC<DetailsGraphInterface> = ({ data, patientData, width, height, domain, xLabel, yLabel }) => {
	const [combined, setCombined] = useState<any[]>([]);
	function compare(a: any, b: any) {
		if (Number(a.name) < Number(b.name)) {
			return -1;
		}
		if (Number(a.name) > Number(b.name)) {
			return 1;
		}
		return 0;
	}

	useEffect(() => {
		if (patientData.length != 0) {
			const mergedObjects = mergeObjects(data, patientData, "name");
			mergedObjects.sort(compare);
			setCombined(mergedObjects);
		}
	}, [data, patientData]);

	return (
		<div>
			{data.length === 0 ? (
				<Typography variant="h2" sx={{ position: "relative", top: "42%", left: "27%", height: 0, zIndex: 10 }}>
					No Data
				</Typography>
			) : null}
			<Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
				{yLabel}
			</Typography>
			<LineChart
				width={width}
				height={height}
				data={combined}
				margin={{
					top: 0,
					right: 0,
					left: 10,
					bottom: 10,
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					label={{ value: xLabel, offset: -10, position: "insideBottom" }}
					interval={0}
					dataKey="name"
					dy={5}
					padding={{ left: 20, right: 20 }}
				/>
				<YAxis domain={domain} dx={-5} />
				<Tooltip />
				<Legend
					layout="vertical"
					verticalAlign="top"
					align="right"
					wrapperStyle={{
						paddingLeft: "20px",
					}}
				/>

				<Line type="monotone" dataKey={98} stroke="red" />
				<Line type="monotone" dataKey={50} stroke="#FDE541" />
				<Line type="monotone" dataKey={25} stroke="#FDE541" />
				<Line type="monotone" dataKey={10} stroke="green" />
				<Line type="monotone" dataKey={5} stroke="green" />
				<Line type="monotone" dataKey={2} stroke="green" />
				<Line
					type="monotone"
					dot={<CustomizedDot stroke="black" />}
					connectNulls
					dataKey="Rechtes Auge"
					stroke="black"
				/>
				<Line
					type="monotone"
					dot={<CustomizedDot stroke="#00BFFF" />}
					connectNulls
					dataKey="Linkes Auge"
					stroke="#00BFFF"
				/>
			</LineChart>
		</div>
	);
};

export default EyesightGraph;

function mergeObjects(list1: any[], list2: any[], prop: string) {
	return [
		...list1.reduce((acc, obj1) => {
			const obj2 = list2.find((o) => o[prop] === obj1[prop]);
			if (obj2) {
				acc.push({ ...obj1, ...obj2 });
			} else {
				acc.push(obj1);
			}
			return acc;
		}, []),
		...list2.reduce((acc, obj1) => {
			const obj2 = list1.find((o) => o[prop] === obj1[prop]);
			if (!obj2) {
				acc.push(obj1);
			}
			return acc;
		}, []),
	];
}
