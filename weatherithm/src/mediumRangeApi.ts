import axios from 'axios';
import moment from 'moment';

const mediumRangeOutlookUrl =
  'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst';

const getMediumRangeOutlook = async (serviceKey: string, stnId: string) => {
  let tmFc;
  if (moment().hour() < 6) {
    tmFc = moment().subtract(1, 'days').format('YYYYMMDD0600');
  } else if (moment().hour() < 18) {
    tmFc = moment().format('YYYYMMDD0600');
  } else {
    tmFc = moment().format('YYYYMMDD1800');
  }

  const params = new URLSearchParams();
  params.append('serviceKey', serviceKey);
  params.append('numOfRows', '1');
  params.append('pageNo', '1');
  params.append('dataType', 'JSON');
  params.append('stnId', stnId);
  params.append('tmFc', tmFc);

  const data = await axios
    .get(mediumRangeOutlookUrl, { params })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return data.response.body.items.item[0].wfSv;
};

const mediumRangeLandUrl =
  'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst';

const getMediumRangeLand = async (serviceKey: string, regId: string) => {
  let tmFc;
  if (moment().hour() < 6) {
    tmFc = moment().subtract(1, 'days').format('YYYYMMDD0600');
  } else if (moment().hour() < 18) {
    tmFc = moment().format('YYYYMMDD0600');
  } else {
    tmFc = moment().format('YYYYMMDD1800');
  }

  const params = new URLSearchParams();
  params.append('serviceKey', serviceKey);
  params.append('numOfRows', '1');
  params.append('pageNo', '1');
  params.append('dataType', 'JSON');
  params.append('regId', regId);
  params.append('tmFc', tmFc);

  const data = await axios
    .get(mediumRangeLandUrl, { params })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return data.response.body.items.item;
};

export { getMediumRangeOutlook, getMediumRangeLand };
