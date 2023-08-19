module.exports = function(type, limit, offset = 0, time_range) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`me/top/${type}${this.formQueryString({
                limit : Math.min(limit, 50) || 50,
                offset : offset + ret.length,
                time_range,
            })}`).catch(reject);

            ret.push(...body.items.slice(0, limit - ret.length));
            //Fetch each page of results
        } while(body.next && ret.length < limit);

        resolve(ret);
        //Get user's top artists and tracks
    });
};