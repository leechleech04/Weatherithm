const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 표준 위도1(degree)
const SLAT2 = 60.0; // 표준 위도2(degree)
const OLON = 126.0; // 기준점의 경도(degree)
const OLAT = 38.0; // 기준점의 위도(degree)
const XO = 43; // 기준점의 X좌표(GRID)
const YO = 136; // 기준점의 Y좌표(GRID)

const DEGRAD = Math.PI / 180.0;

const re = RE / GRID;
const slat1 = SLAT1 * DEGRAD;
const slat2 = SLAT2 * DEGRAD;
const olon = OLON * DEGRAD;
const olat = OLAT * DEGRAD;

const sn =
  Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
  Math.tan(Math.PI * 0.25 + slat1 * 0.5);
const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
const sfPow = (Math.pow(sf, snLog) * Math.cos(slat1)) / snLog;
const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
const roRes = (re * sfPow) / Math.pow(ro, snLog);

function convertLatLonToGrid(lat: number, lon: number) {
  const rs: { x: number; y: number } = { x: 0, y: 0 };
  const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  const raPow = (re * sfPow) / Math.pow(ra, snLog);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= snLog;

  rs.x = Math.floor(raPow * Math.sin(theta) + XO + 0.5);
  rs.y = Math.floor(roRes - raPow * Math.cos(theta) + YO + 0.5);

  return rs;
}

export default convertLatLonToGrid;
