import React, { useState, useEffect, useRef, useContext } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {Context} from '../../../_Context/Context.js';


const Map = (props) => {
  const { userData, riderData, eventData,  driverData,} = useContext(Context);
  console.log('riderData: ',riderData, 'eventData:',eventData,  'driverData:',driverData,);
  const origin = driverData[0].location;
  console.log(origin)
  const destination = eventData[0].location;
  console.log(destination);
  const riders = riderData.map(({location}) => ({location}) );
  console.log(riders)

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_API_KEY,
      version: 'weekly',
    });
    let map;
    loader.load().then((google) => {
      map = new google.maps.Map(googlemap.current, {
        center: new google.maps.LatLng(39.8097343, -98.5556199),
        zoom: 5,
      });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: origin }, (results, status) => {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
        } else {
          console.error(status);
        }
      });

      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: { query: origin },
          destination: { query: destination },
          waypoints: riders,
          travelMode: 'DRIVING',
        },
        function (response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.error(status);
          }
        }
      );
    });
  }, [riders, destination, origin]);

  return (
    <div>
      <div id="map" ref={googlemap} />
    </div>
  );
};

export default Map;
