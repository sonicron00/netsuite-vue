import axios from "axios";
import qs from "qs";

type NSRequest = {
    action: string;
    data?: Object;
    errorPolicy?: "none" | "all";
};

export const restlet =
    "/app/site/hosting/restlet.nl?script=customscript_generic_spa_rl&deploy=1";
/* eslint-disable */
export const REST = {
    get: ({ action, data, errorPolicy }: NSRequest) =>
        (errorPolicy === "all" ? resolveReqAll : resolveReqNone)(
            axios.get(
                `${restlet}&action=${action}${
                    data ? "&" + qs.stringify(data) : ""
                }`
            )
        ),
    post: ({ action, data = {}, errorPolicy }: NSRequest) =>
        (errorPolicy === "all" ? resolveReqAll : resolveReqNone)(
            axios.post(restlet, { ...data, action })
        )
};


export const resolveReqNone = async (deferred: Promise<any>): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await deferred;
            const data = tryParse(res.data);
            if (data.success) resolve(data.data as any);

            reject(data as any);
        } catch (e) {
            reject(e as any);
        }
    });

export const resolveReqAll = async (deferred: Promise<any>) => {
    try {
        const res = await deferred;
        const data = tryParse(res.data);
        if (data.success) return { data: data.data, error: null };

        return { data: null, error: data };
    } catch (e) {
        return { data: null, error: e };
    }
};

export function tryParse(data: any) {
    try {
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (e) {
        return data;
    }
}
