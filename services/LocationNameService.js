import axios from 'axios';

class FetchLocationService {
  constructor() {}

  BASE_URL = 'https://geocode.maps.co/reverse';
  RESPONSE_OK = 200;

  searchParams = {
    lat: '0',
    lon: '0',
  };

  //https://geocode.maps.co/reverse?lat={latitude}&lon={longitude}

  async getLocationName({ latitude = '0', longitude = '0' }) {
    const { searchParams, BASE_URL, RESPONSE_OK } = this;
    searchParams.lat = latitude;
    searchParams.lon = longitude;

    const response = await axios.get(BASE_URL, {
      params: searchParams,
    });
    if (response.status !== RESPONSE_OK) {
      throw new Error(response.status);
    }

    return response.data;
  }
}

const locationService = new FetchLocationService();

export default locationService;
