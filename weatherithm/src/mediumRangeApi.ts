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

const getMediumRangeLand = async (serviceKey: string) => {
  let tmFc;
  if (moment().hour() < 6) {
    tmFc = moment().subtract(1, 'days').format('YYYYMMDD0600');
  } else {
    tmFc = moment().format('YYYYMMDD0600');
  }

  const landRegions = [
    { regId: '11B00000', name: '서울·인천·경기도' },
    { regId: '11D10000', name: '강원도 영서' },
    { regId: '11D20000', name: '강원도 영동' },
    { regId: '11C20000', name: '대전·세종·충청남도' },
    { regId: '11C10000', name: '충청북도' },
    { regId: '11F20000', name: '광주·전라남도' },
    { regId: '11F10000', name: '전북자치도' },
    { regId: '11H10000', name: '대구·경상북도' },
    { regId: '11H20000', name: '부산·울산·경상남도' },
    { regId: '11G00000', name: '제주도' },
  ];

  const result: any[] = [];

  for (const region of landRegions) {
    const params = new URLSearchParams();
    params.append('serviceKey', serviceKey);
    params.append('numOfRows', '1');
    params.append('pageNo', '1');
    params.append('dataType', 'JSON');
    params.append('regId', region.regId);
    params.append('tmFc', tmFc);

    const data = await axios
      .get(mediumRangeLandUrl, { params })
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching data:', error);
        return null;
      });
    result.push(data.response.body.items.item[0]);
  }
  return result;
};

export { getMediumRangeOutlook, getMediumRangeLand };
