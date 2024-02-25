let totalRequests = 0;
function countRequests(req, res, next) {
    totalRequests++;
   // console.log(totalRequests);
    next();
}

module.exports = {
    countRequests,
    totalRequests
}