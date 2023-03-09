import Typography from "@mui/material/Typography";
import { FC, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
interface RefreactionGraphInterface {
	data: object[];
	width: number;
	height: number;
	xLabel: string;
	yLabel: string;
	domain: any[];
}

const RefractionGraph: FC<RefreactionGraphInterface> = ({ data, width, height, domain, xLabel, yLabel }) => {
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
		data.sort(compare);
	}, [data]);

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
				data={data}
				margin={{
					top: 0,
					right: 0,
					left: 10,
					bottom: 10,
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					label={{ value: xLabel, offset: -10, position: "insideBottom" }}
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

				<Line
					type="monotone"
					dot={<CustomizedDot stroke="black" />}
					connectNulls
					dataKey={"Right refraction"}
					stroke="black"
				/>
				<Line
					type="monotone"
					dot={<CustomizedDot stroke="#00BFFF" />}
					connectNulls
					dataKey={"Left refraction"}
					stroke="#00BFFF"
				/>
			</LineChart>
		</div>
	);
};

export default RefractionGraph;

export const CustomizedDot = (props: any) => {
	const { cx, cy, stroke, payload, value } = props;

	return value && cx && cy ? (
		<CloseIcon x={cx - 10} y={cy - 10} width={20} height={20} stroke={stroke} sx={{ color: stroke }} />
	) : null;
};
