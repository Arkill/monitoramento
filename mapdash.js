// Inicialização do mapa centralizado em Manaus
const map = L.map('map').setView([-3.119027, -60.021731], 12);

// Adicionando o tile layer (usando OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Função para criar e mover veículos
function createVehicle({ iconUrl, startCoords, endCoords, vehicleId, vehicleName, vehicleBrand, vehiclePlate }) {
  const vehicleIcon = new L.Icon({
    iconUrl,
    iconSize: [60, 40],
    iconAnchor: [30, 40],
  });

  const vehicleMarker = L.marker(startCoords, { icon: vehicleIcon }).addTo(map);
  vehicleMarker.bindPopup(`
    <b>Marca:</b> ${vehicleBrand}<br>
    <b>Nome:</b> ${vehicleName}<br>
    <b>Placa:</b> ${vehiclePlate}<br>
    <b>Velocidade:</b> 0 km/h
  `);

  const routeLine = L.polyline([], { color: 'blue', weight: 4 }).addTo(map);

  L.Routing.control({
    waypoints: [L.latLng(startCoords), L.latLng(endCoords)],
    createMarker: () => null,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    show: false,
  }).on('routesfound', (e) => {
    const routeCoordinates = e.routes[0].coordinates;
    moveVehicleOnRoute(vehicleMarker, routeLine, routeCoordinates, vehicleId);
  }).addTo(map);
}

// Função para mover o veículo ao longo da rota
function moveVehicleOnRoute(marker, routeLine, routeCoordinates, vehicleId) {
  let index = 0;

  function move() {
    if (index < routeCoordinates.length) {
      const coords = routeCoordinates[index];
      marker.setLatLng(coords);
      routeLine.addLatLng(coords);

      // Simula variação na velocidade
      const speed = Math.floor(Math.random() * 40 + 20);
      marker.setPopupContent(`
        <b>Velocidade:</b> ${speed} km/h
      `);

      // Atualiza a velocidade na interface
      const vehicleElement = document.getElementById(vehicleId);
      if (vehicleElement) {
        vehicleElement.querySelector('.vehicle-speed').textContent = `${speed} km/h`;
      }

      index++;
      setTimeout(move, 1000);
    }
  }

  move();
}

// Função de geocodificação reversa
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    const data = await response.json();
    return data.address ? `${data.address.road || ''}, ${data.address.city || ''}` : 'Endereço não encontrado';
  } catch (error) {
    console.error('Erro na geocodificação reversa:', error);
    return 'Erro ao obter endereço';
  }
}

// Atualização de horas do motor
let carEngineHours = 2.5;
let bikeEngineHours = 1.25;

function formatHours(hours) {
  const totalSeconds = Math.floor(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateEngineHours() {
  const carIgnition = document.getElementById('car-ignition').innerText.trim();
  const bikeIgnition = document.getElementById('bike-ignition').innerText.trim();

  if (carIgnition === 'Ligada') {
    carEngineHours += 1 / 3600;
    document.getElementById('car-engine-hours').innerText = formatHours(carEngineHours);
  }

  if (bikeIgnition === 'Ligada') {
    bikeEngineHours += 1 / 3600;
    document.getElementById('bike-engine-hours').innerText = formatHours(bikeEngineHours);
  }
}

setInterval(updateEngineHours, 1000);

// Criar veículos
createVehicle({
  iconUrl: 'img/r15.png',
  startCoords: [-3.098264, -59.986498],
  endCoords: [-3.119027, -60.021731],
  vehicleId: 'moto-info',
  vehicleName: 'Yamaha R15',
  vehicleBrand: 'Yamaha',
  vehiclePlate: 'ABC-1234',
});

// Adicionar o Chevrolet Celta
createVehicle({
  iconUrl: 'img/Celta.png', // Caminho do ícone do veículo
  startCoords: [-3.119027, -60.021731], // Coordenadas iniciais do Celta
  endCoords: [-3.072237, -60.017906], // Coordenadas finais do Celta
  vehicleId: 'celta-info', // ID único para o Celta
  vehicleName: 'Chevrolet Celta', // Nome do veículo
  vehicleBrand: 'Chevrolet', // Marca do veículo
  vehiclePlate: 'XYZ-5678', // Placa do veículo
});
