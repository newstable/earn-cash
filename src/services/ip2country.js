import maxmind from 'maxmind';

const lookup = async ip => {
    const lookup = await maxmind.open('src/dbip-country-lite-2023-02.mmdb');
    var data = lookup.get(ip);
    if (data === null) {
        data = "WW";
    } else {
        data = data.country.iso_code;
    }
    return data;
}

export default lookup;