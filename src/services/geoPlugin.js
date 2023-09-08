import logger from '../lib/log';
import { PUBLIC_GEO_URL } from "$env/static/public";

const getGeoInfo = async (userIp='') => {
    var ip = userIp
    var info = {ip, country: 'WW'}
    try {
        const geoInfoRes = await fetch(`${PUBLIC_GEO_URL}${userIp? `?ip=${userIp}`: ''}`)
        const geoInfo = await geoInfoRes.json()
        const info = {...geoInfo}
        return info
    } catch {
        return info
    }
}

export default getGeoInfo;