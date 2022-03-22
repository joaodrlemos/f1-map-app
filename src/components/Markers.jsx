import { useState, useEffect } from "react";
import icon from "../assets/plug-icon.png";

export default function Markers({ map, stations }) {
    const [info, setInfo] = useState(null);
    const [renderedStations, setRenderedStations] = useState([]);

    const renderStations = () => {
        console.log('rendering charging stations');
        renderedStations.forEach(s => s.setMap(null));
        const render = [];

        stations.forEach(station => {
            const stationlatlng = new window.google.maps.LatLng(station.latitude, station.longitude);
            const content = station.content;

            const marker = new window.google.maps.Marker({
                position: stationlatlng,
                icon: icon,
            });

            if (content) {
                marker.addListener("click", () => {
                    info.setContent(content);
                    info.open({ anchor: marker, map });
                });
            }
            render.push(marker);
            marker.setMap(map);
        });
        setRenderedStations(render);
    }

    useEffect(() => {
        if (map) {
            const infoWindow = new window.google.maps.InfoWindow({
                content: null,
            });
            setInfo(infoWindow);
        }
    }, [map]);

    useEffect(() => {
        if (map && stations) {
            renderStations();
        }
    }, [map, stations]);

    return null;
}
