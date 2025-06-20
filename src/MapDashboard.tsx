import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from "axios"




const vehicleIcon = new L.Icon({
    iconUrl: 'dump-truck.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const zoneIcon = new L.Icon({
    iconUrl: 'location.png',
    iconSize: [25, 25],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

interface Vehicle {
    id: string
    name: string
    status: string
    load_capacity: number
    fuel_capacity: number
    type: string
    latitude: number
    longitude: number
}

interface Zone {
    id: string
    type: string
    material: string
    quantity: number
    latitude: number
    longitude: number
}



export default function MapDashboard() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    // Fetch vehicle data on component mount
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/allVehicle/info')
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data)
            })
            .catch((err) => console.error('Failed to load vehicles:', err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/allzone/info')
            .then((res) => res.json())
            .then((data) => {
                setZones(data)
            })
            .catch((err) => console.error('Failed to load zones:', err))
    }, [])


    const initialCenter = vehicles.length
        ? [vehicles[0].latitude, vehicles[0].longitude]
        : [52.52, 13.405]; // fallback to Berlin

    const handleVehicleClick = (vehicle: Vehicle) => ({
        click: () => {
            setSelectedVehicle(vehicle)
            setSelectedZone(null)
            try {
                axios.post('http://localhost:3000/api/v1/task/setSelectedVehicle', {
                    userId: 'sensmore_dev_operator',
                    vehicle: vehicle
                })
            } catch (error) {
                console.error('Error sending selected vehicle:', error);
            }

        },
    })

    const handleZoneClick = (zone: Zone) => ({
        click: () => {
            setSelectedZone(zone)
            setSelectedVehicle(null)
        },
    });


    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '50vw' }}>
            {/* Map Section */}
            <div style={{ flex: '1 0 50%' }}>
                <MapContainer center={initialCenter as [number, number]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


                    {/* Vehicle Markers */}
                    {vehicles.map((vehicle) => (
                        <Marker
                            key={vehicle.id}
                            position={[vehicle.latitude, vehicle.longitude]}
                            icon={vehicleIcon}
                            eventHandlers={handleVehicleClick(vehicle)}

                        >
                            <Popup>{vehicle.name}</Popup>
                        </Marker>
                    ))}

                    {/* Zone Polygons */}
                    {zones.map((zone) => (
                        <Marker
                            key={zone.id}
                            position={[zone.latitude, zone.longitude]}
                            icon={zoneIcon}
                            eventHandlers={handleZoneClick(zone)}
                        >
                            <Popup>{zone.type}</Popup>
                        </Marker>
                    ))}


                </MapContainer>
            </div>



            {/* Info Panel Section */}
            <div style={{ flex: '1 0 40%', padding: '1rem', backgroundColor: '#fffff' }}>
                {selectedVehicle && (
                    <div>
                        <h2>Vehicle Information</h2>
                        <p><strong>Name:</strong> {selectedVehicle.name}</p>
                        <p><strong>Load Capacity:</strong> {selectedVehicle.load_capacity} T </p>
                        <p><strong>Fuel Capacity:</strong> {selectedVehicle.fuel_capacity}</p>
                        <p><strong>Type:</strong> {selectedVehicle.type}</p>
                        <p><strong>Status:</strong> {selectedVehicle.status}</p>
                        <p><strong>Latitude:</strong> {selectedVehicle.latitude}</p>
                        <p><strong>Longitude:</strong> {selectedVehicle.longitude}</p>
                    </div>
                )}

                {selectedZone && (
                    <div>
                        <h2>Zone Information</h2>
                        <p><strong>Type:</strong> {selectedZone.type}</p>
                        <p><strong>Material:</strong> {selectedZone.material}</p>
                        <p><strong>Latitude:</strong> {selectedZone.latitude}</p>
                        <p><strong>Longitude:</strong> {selectedZone.longitude}</p>
                    </div>
                )}

                {!selectedVehicle && !selectedZone && (
                    <p>Select a vehicle or zone on the map to view details.</p>
                )}
            </div>
        </div>
    );
}