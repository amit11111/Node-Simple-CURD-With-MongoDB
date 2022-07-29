/**
* @sync
* this is pagination request middleware
* For setting pagination
*/
const PAGE = 'page';
const SORT = 'sort';
const SEARCH = 'general_search';
module.exports = (req, res, next) => {
  if (req.method === 'GET') {
    const query = req.query; // eslint-disable-line
    const keys = Object.keys(query);
    req._pagination = null;
    req._sort = null;

    if (keys.includes(PAGE)) {
      if (query.page > 0) {
        req._pagination = {
          page: parseInt(query.page || 1, 10),
          limit: parseInt(query.limit || 10, 10),
        };
        req._pagination.skip = parseInt((req._pagination.page - 1) * req._pagination.limit, 10);
      }
    }

    if (keys.includes(SORT)) {
      req._sort = {};
      const sort = query[SORT];

      let sort_value = -1;

      if ((sort.sort).toLowerCase() === 'asc') {
        sort_value = 1;
      }

      if ((sort.sort).toLowerCase() === 'desc') {
        sort_value = -1;
      }

      req._sort = { filed: sort.field, sort: sort_value };
    }

    if (keys.includes(SEARCH)) {
      req._search = query.general_search;
    }
  }

  next();
};
