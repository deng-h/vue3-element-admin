import request from '@/utils/request';

const api_name = '/uav/pathplan'

export function addUavPath(flight: FormData) {
  return request({
    url: `${api_name}/flight`,
    method: 'post',
    params: {
      uavID: flight.get("uavID"),
      longitude: flight.get("longitude"),
      latitude: flight.get("latitude")
    }
  });
}

export function getUavLocation(uavID: string){
  return request({
    url: `${api_name}/getLocation`,
    method: "get",
    params: {
      uavID: uavID
    }
  });
}
