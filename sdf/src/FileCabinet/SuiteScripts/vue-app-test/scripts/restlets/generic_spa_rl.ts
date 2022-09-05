/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 *@NModuleScope Public
 */

import * as log from "N/log";
import { EntryPoints } from "N/types";
import * as R from "../../libs/ramda.js";
import * as allActions from "../actions/index";
import { errorResponse, successfulResponse } from "../../helpers/index";

const onRequest = (context) => {
  try {
    const action = getAction(context.action);
    return successfulResponse(action(context));
  } catch (e) {
    log.error(`ACTION: ${context.action}`, JSON.stringify(e));

    const error = R.pathOr("", ["error"], e);
    const message = R.pathOr("", ["message"], e);

    return errorResponse(`ACTION: ${context.action}: ${error}`, message || e);
  }
};

/**
 * Actions are what we use to define logic since we can't use client scripts
 * @param action 
 * @returns 
 */
const getAction = (action = "") => {
  const toLowerKey = (num, key) => R.assoc(key.toLowerCase(), num, {});

  const actions = R.compose(
    R.mergeAll,
    R.values,
    R.mapObjIndexed(toLowerKey)
  )(allActions);
  const actionMatch = actions[action.toLowerCase()];

  if (!actionMatch || !action) return noActionFound(action);

  return actionMatch;
};

const noActionFound = (action) =>
  errorResponse(`Cannot find action ${action && ":" + action}`);

export let post: EntryPoints.RESTlet.post = onRequest;
export let get: EntryPoints.RESTlet.get = onRequest;
