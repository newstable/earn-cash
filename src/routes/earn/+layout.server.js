export const load = async(request) => {
    var userid = '';

    const token = request.cookies.get("token");
    if (token) {
        const rawData = JSON.parse(atob(token.split(".")[1]));
        userid = rawData["uid"];
    }
    const user = await request.getAuthenticatedUser()

    // TODO: do better

    // const ip = request.getClientAddress();
    // var response = await fetch("https://publishers.revenueuniverse.com/hotoffers_api.php?wall=499&uid=" + userid.toString() + "&numoffers=10&ip=" + ip);
    // var text = await response.text();

    // if (text.includes("jquery-ui.structure.css?5")) {
    //     const uiddata_id = text.split("GDPR_Acceptance(")[1].split(",")[0];
    //     const consent_token = text.split(uiddata_id + ", \"")[1].split("\"")[0];
    //     const age_token = text.split(consent_token + "\", \"")[1].split("\"")[0];

    //     response = await fetch("https://publishers.revenueuniverse.com/gdpr.php", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             action: "consent",
    //             uiddata_id,
    //             consent_token,
    //             age_token
    //         })
    //     });
    //     text = await response.text();
    //     console.log(text);

    //     response = await fetch("https://publishers.revenueuniverse.com/hotoffers_api.php?wall=499&uid=" + userid.toString() + "&numoffers=10&ip=" + ip);
    //     text = await response.text();
    // }

    // const revuOffers = JSON.parse(text);

    return {
        userid
    }
}