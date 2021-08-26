import Axios from "axios";
import {XAPIKEY} from "../config/config.microcms";

interface GetResponse {
    "data": {
        "id": string,
        "name": string,
    },
}

interface GetEvent {
    "data": {
        "contents": {[key: string]: string | {[key: string]: string}}[],
    },
}

export default class MicroCms{
    public static getPlaceById = (id: string, callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/place/" + id;
        const queries = { id: '1000' };
        const headers = {
            "X-API-KEY": XAPIKEY,
        };
        Axios
            .get<GetResponse>(url, {params: queries, headers: headers})
            .then(res => {
                callback(res["data"]);
                return res;
            })
            .catch(error => {
                return error;
            });
    }
    public static getEventsByAreaId = (areaId: string, callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/event";
        const queries = { filters: 'area_id[equals]'+areaId };
        const headers = {
            "X-API-KEY": XAPIKEY,
        };
        Axios
            .get<GetEvent>(url, {params: queries, headers: headers})
            .then(res => {
                callback(res["data"]);
                return res;
            })
            .catch(error => {
                return error;
            });
    }
}