import { useState, useEffect } from "react";
import Markers from "./Markers";

export default function ChargingStations({ directions, map, stationType }) {
    const [chargingStations, setChargingStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const TYPES = {
        NORMAL: 'Normal',
        FAST: 'Rápido'
    };
    const stationsEndpoint = 'https://tblx.getsandbox.com/charging-stations';

    const getStations = async () => {
        console.log('getting all charging stations');
        const cache = localStorage.getItem('allStations');

        if (cache) {
            return JSON.parse(cache);
        }
        else {
            const stations = await fetch(stationsEndpoint, { method: 'GET' })
                .then(response => response.json());
            localStorage.setItem('allStations', JSON.stringify(stations));
            return stations;
        }
    }

    const filterStationsByRelevant = (stations) => {
        console.log('filtering relevant charging stations');
        const cache = localStorage.getItem('relevantStations');

        if (cache) {
            return JSON.parse(cache);
        }
        else {
            const pathPoints = directions.routes[0].overview_path;

            const newStations = stations.reduce((res, s) => {
                for (let a = 0; a < pathPoints.length; a++) {
                    const pathPointCoord = pathPoints[a],
                        stationCoord = new window.google.maps.LatLng(s.latitude, s.longitude),

                        stationLocation = s.location,
                        stationAddress = s.address,
                        stationSocketType = s.socket_type,
                        stationSocketNr = s.socket_number;

                    const distanceBeetweenPoints = window.google.maps.geometry.spherical.computeDistanceBetween(pathPointCoord, stationCoord);

                    if (distanceBeetweenPoints <= 2000) {
                        const location = (stationLocation !== '-' && stationLocation !== null) ?
                            `<span><b>Location:</b> ${stationLocation}</span><br>` : '';
                        const content = `<div><span><b>Address:</b> ${stationAddress}</span><br><span>${location}<b>Socket type:</b> ${stationSocketType}</span><br><br><span><b>Socket number:</b> ${stationSocketNr}</span></div>`;
                        res.push({
                            latitude: s.latitude,
                            longitude: s.longitude,
                            content: content,
                            socket_type: stationSocketType
                        });
                        break;
                    }
                }
                return res;
            }, []);

            localStorage.setItem('relevantStations', JSON.stringify(newStations));
            return newStations;
        }
    }

    const filterStationsByType = (type) => {
        if (type !== 'ALL') {
            console.log('filtering charging stations by type');
            const stationType = TYPES[type];
            const filteredStations = chargingStations.filter((s) => s.socket_type.includes(stationType));
            return filteredStations;
        }
        else {
            return chargingStations;
        }
    }

    // Get all charging stations and filter by relevant
    useEffect(() => {
        if (directions) {
            getStations().then((s) => {
                const relevantStations = filterStationsByRelevant(s);
                setChargingStations(relevantStations);
                setFilteredStations(relevantStations);
            });
        }
    }, [directions]);

    // Filter stations by type
    useEffect(() => {
        setFilteredStations(filterStationsByType(stationType));
    }, [stationType]);

    return (
        <Markers map={map} stations={filteredStations} />
    )
}
