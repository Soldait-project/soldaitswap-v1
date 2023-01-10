export async function getFormatMulticall(results, name, pos) {

    try {
        var returnVal = (results && results.results && results.results[name]
            && results.results[name].callsReturnContext &&
            results.results[name].callsReturnContext &&
            results.results[name].callsReturnContext[pos] &&
            results.results[name].callsReturnContext[pos].returnValues &&
            results.results[name].callsReturnContext[pos].returnValues[0]) ?
            results.results[name].callsReturnContext[pos].returnValues[0].hex?parseInt(results.results[name].callsReturnContext[pos].returnValues[0].hex):results.results[name].callsReturnContext[pos].returnValues[0] : "";
        return returnVal;
    } catch (err) {
        return "";
    }
}