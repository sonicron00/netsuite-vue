/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 *@NModuleScope Public
 */
define(["require", "exports", "N/log", "../../libs/ramda.js", "../actions/index", "../../helpers/index"], function (require, exports, log, R, allActions, index_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = exports.post = void 0;
    const onRequest = (context) => {
        try {
            const action = getAction(context.action);
            return index_1.successfulResponse(action(context));
        }
        catch (e) {
            log.error(`ACTION: ${context.action}`, JSON.stringify(e));
            const error = R.pathOr("", ["error"], e);
            const message = R.pathOr("", ["message"], e);
            return index_1.errorResponse(`ACTION: ${context.action}: ${error}`, message || e);
        }
    };
    /**
     * Actions are what we use to define logic since we can't use client scripts
     * @param action
     * @returns
     */
    const getAction = (action = "") => {
        const toLowerKey = (num, key) => R.assoc(key.toLowerCase(), num, {});
        const actions = R.compose(R.mergeAll, R.values, R.mapObjIndexed(toLowerKey))(allActions);
        const actionMatch = actions[action.toLowerCase()];
        if (!actionMatch || !action)
            return noActionFound(action);
        return actionMatch;
    };
    const noActionFound = (action) => index_1.errorResponse(`Cannot find action ${action && ":" + action}`);
    exports.post = onRequest;
    exports.get = onRequest;
});
