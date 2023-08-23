const private_key = "ee1ded3ae5f3065dcd458ae7e80c7ca7"
const ayet = async() => {
    const response = await fetch(`https://www.ayetstudios.com/offers/get/12904?apiKey=${private_key}`);
    const data = await response.json();

    console.log(data);
}

export default ayet;