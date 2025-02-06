import moment from 'moment';
import axios from 'axios';

const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?`;

const getShortRange = async (serviceKey: string, x: number, y: number) => {
  const todayDate = moment().format('YYYYMMDD');
  const data = await axios
    .get(
      `${apiUrl}serviceKey=${serviceKey}&numOfRows=12&pageNo=1&base_date=${todayDate}&base_time=0200&nx=${x}&ny=${y}&dataType=JSON`
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return data.response.body.items;
};

export default getShortRange;
