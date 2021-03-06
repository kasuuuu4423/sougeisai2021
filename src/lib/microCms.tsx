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
        const queries = {
            filters: 'area_id[equals]'+areaId,
            limit: 100,
        };
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

    public static getAreaInfo = (id: string, callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/area/"+id;
        const headers = {
            "X-API-KEY": XAPIKEY,
        };
        Axios
            .get<GetEvent>(url, {headers: headers})
            .then(res => {
                callback(res["data"]);
                return res;
            })
            .catch(error => {
                return error;
            });
    }

    public static getEventsEvent = (callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/event";
        const queries = {
            filters: 'type[equals]event[or]type[equals]showcase[or]type[equals]interactive',
            limit: 100,
        };
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

    public static getSiteInfo = (callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/siteinfo";
        const queries = {};
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

    public static getLabs = (callback=(res: {})=>{}) =>{
        const url = "https://sougeisai2021.microcms.io/api/v1/lab";
        const queries = {};
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