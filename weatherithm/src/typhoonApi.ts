import moment from 'moment';
import axios from 'axios';

const typhoonUrl =
  'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo';

const getTyphoon = async (serviceKey: string) => {
  const params = new URLSearchParams();
  params.append('serviceKey', serviceKey);
  params.append('numOfRows', '10');
  params.append('pageNo', '1');
  params.append('dataType', 'JSON');
  params.append('fromTmFc', moment().subtract(3, 'days').format('YYYYMMDD'));
  params.append('toTmFc', moment().format('YYYYMMDD'));

  const data = await axios
    .get(typhoonUrl, { params })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  if (data.response.header.resultCode == '00') {
    return data.response.body.items.item;
  } else {
    return [];
  }
};

export { getTyphoon };
