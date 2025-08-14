window.addEventListener('load', () => {
  let mapInstance = null
  let markerInstance = null

  function initMap(lat, lng) {
    if (!mapInstance) {
      mapInstance = L.map('map').setView([lat, lng], 15)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(mapInstance)
    } else {
      mapInstance.setView([lat, lng], 15)
    }

    if (markerInstance) {
      markerInstance.setLatLng([lat, lng])
    } else {
      markerInstance = L.marker([lat, lng]).addTo(mapInstance)
    }
  }

  function reverseGeocode(lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
      .then(res => res.json())
      .then(data => {
        const name = data.display_name || 'Location name not found'
        document.getElementById('placeName').textContent = name
      })
      .catch(err => {
        document.getElementById('placeName').textContent = 'Failed to get location name'
      })
  }

  function searchLocation(query) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          initMap(lat, lng)
          document.getElementById('location').textContent = `Latitude: ${lat}, Longitude: ${lng}`
          document.getElementById('placeName').textContent = data[0].display_name
        } else {
          document.getElementById('placeName').textContent = 'Location not found'
        }
      })
      .catch(() => {
        document.getElementById('placeName').textContent = 'Error searching location'
      })
  }

  document.getElementById('locateBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      document.getElementById('location').textContent = 'Geolocation not supported'
      return
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        document.getElementById('location').textContent = `Latitude: ${lat}, Longitude: ${lng}`
        initMap(lat, lng)
        reverseGeocode(lat, lng)
      },
      err => {
        document.getElementById('location').textContent = 'Failed to get location: ' + err.message
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })

  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim()
    if (query.length > 0) {
      searchLocation(query)
    }
  })
})
