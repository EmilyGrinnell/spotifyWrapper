module.exports = function(q, types, market, limit, offset, include_external) {
    return new Promise(async (resolve, reject) => {
        let results = {};
        let fetched = 0;

        do {
            body = await this.makeRequest(`search${this.formQueryString({
                q,
                type : types.join(","),
                market,
                limit : Math.min(limit, 50) || 50,
                offset : (offset || 0) + fetched,
                include_external,
            })}`).catch(reject);
            //Fetch each page of results

            for (let x = 0; x < Object.keys(body).length; x ++) {
                let key = Object.keys(body)[x];
                results[key] = results[key] || [];
                results[key].push(...body[key].items.slice(0, limit - fetched));
                //Add results to object to be returned
            }

            fetched += Math.max(...Object.values(body).map(type => type.items.length));
            //Add the number of items from the type with most results to the total number of fetched results in case different types have different numbers of results
        } while (Object.values(body).find(type => type.next) && fetched < limit);

        resolve(results);
    });
};