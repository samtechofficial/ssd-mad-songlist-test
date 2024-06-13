import { axiosClient } from "../helper/axios";

export function APIGetItems(search:any,limit:any) {
  return axiosClient.get(`search?term=${search}&limit=${limit}`)
}
