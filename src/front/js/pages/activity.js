import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import MasaIMG from "../../img/masacrit.jpg";

export const Activity = () => {
	const { actions } = useContext(Context);
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		fetch(process.env.BACKEND_URL + "/api/activity/", {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => setActivity(responseJson));
	}, []);

	let activitymap = [];
	if (activity != null) {
		activitymap = activity.map((eachactivity, index) => {
			return (
				<div key={index}>
					<div className="css-header card-header p-4">Actividad</div>
					<div className="css-body card-body">
						<p>
							nombre:
							{eachactivity.name}
						</p>
						<p>
							ruta:
							{eachactivity.route}
						</p>
						<p>
							dificultad:
							{eachactivity.dificulty}
						</p>
						<p>
							descripcion:
							{eachactivity.description}
						</p>
					</div>
				</div>
			);
		});
	}
	return (
		<div>
			<img className="img-activity py-4 rounded border border-warning" src={MasaIMG} />
			<div className="row">
				<div className="card card-vista">{activity ? activitymap : ""}</div>
			</div>
		</div>
	);
};
