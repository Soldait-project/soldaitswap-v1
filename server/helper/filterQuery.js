import isEmpty from 'is-empty';
 const filterSearchQuery = (query = {}, fields = []) => {
    let filterQuery = {}
    console.log(query.search,'req.query.searchreq.query.search')
    if (!isEmpty(query) && !isEmpty(query.search)) {
        let filterArray = []
        for (const key of fields) {
            let filter = {};
            filter[key] = new RegExp(query.search, 'i');
            filterArray.push(filter)
        }
        filterQuery = { "$or": filterArray };
    }
    console.log(filterQuery,'filterQuery')
    return filterQuery
}
module.exports = filterSearchQuery;