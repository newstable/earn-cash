import logger from '../lib/log';

const getGeoInfo = async (userIp='') => {
    var ip = userIp
    var info = {ip, country: 'WW'}
    try {
        const geoInfoRes = await fetch(`https://justearn.gg/geo-info${userIp? `?ip=${userIp}`: ''}`)
        const geoInfo = await geoInfoRes.json()
        const info = {...geoInfo}
        return info
    } catch {
        return info
    }
}

export default getGeoInfo;