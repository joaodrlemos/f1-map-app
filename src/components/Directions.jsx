import { useEffect } from "react";

const Directions = ({ directions, setDirections, map }) => {
  const defaultDirectionRequest = {
    origin: "Aeroporto de Lisboa",
    destination: "Autódromo Internacional do Algarve",
    travelMode: "DRIVING",
  };

  const getDirections = () => {
    const cache = localStorage.getItem("directions");

    if (cache) {
      setDirections(JSON.parse(cache));
    } else {
      const directionService = new window.google.maps.DirectionsService();
      directionService.route(defaultDirectionRequest, (result, status) => {
        if (status === "OK") {
          localStorage.setItem("directions", JSON.stringify(result));
          setDirections(result);
        }
      });
    }
  };

  const renderDirections = () => {
    const renderer = new window.google.maps.DirectionsRenderer();
    renderer.setDirections(directions);
    renderer.setMap(map);
  };

  // Get directions from google api
  useEffect(() => {
    if (map) {
      getDirections();
    }
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  // Render directions on map
  useEffect(() => {
    if (directions) {
      renderDirections();
    }
  }, [directions]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Directions;
