import moment from 'moment';
import axios from 'axios';

const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?`;

const todayShortRange = async (serviceKey: string, x: number, y: number) => {
  const todayDate = moment().format('YYYYMMDD');

  const data = await axios
    .get(
      `${apiUrl}serviceKey=${serviceKey}&numOfRows=290&pageNo=1&base_date=${todayDate}&base_time=0200&nx=${x}&ny=${y}&dataType=JSON`
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  return data.response.body.items.item;
};

const veryShortRange = async (serviceKey: string, x: number, y: number) => {
  const base_date = moment().format('YYYYMMDD');
  const base_time = moment().format('HH00');

  const data = await axios
    .get(
      `${apiUrl}serviceKey=${serviceKey}&numOfRows=8&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${x}&ny=${y}&dataType=JSON`
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  return data.response.body.items.item;
};

export default todayShortRange;
