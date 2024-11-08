
export const load = async (req) => {
    const url = new URL(req.url);
    const provider = url.searchParams.get('provider');
    const clickID = url.searchParams.get('clickID');
    const source = url.searchParams.get('source');
    const offerID = url.searchParams.get('offerID');
    return {
        provider: provider,
        clickID: clickID,
        source: source,
        offerID: offerID,
    }
  };