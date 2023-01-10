import DB from "../../commonQuery/commonQuery"
import isEmpty from "is-empty"

export const gettemplate = (async (req, res) => {

    try {
        console.log(req.query.identifier,"params")
        let cond ={"identifier" : req.query.identifier}
        var template = await DB.AsyncfindOne('template', cond, {});

        return res.status(200).json({ message: 'fetch Template successfully',result:template })

    } catch (err) {
        res.status(400).json({ message: 'error on server' })
    }
});