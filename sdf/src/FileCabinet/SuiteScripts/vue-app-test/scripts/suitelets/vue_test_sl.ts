/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@NModuleScope Public
 */

import { EntryPoints } from "N/types";
import * as runtime from "N/runtime";
import * as ui from "N/ui/serverWidget";
import * as url from "N/url";
import { getClient } from "../../helpers/index";
import log = require('N/log');

const onRequest: EntryPoints.Suitelet.onRequest = (
    context: EntryPoints.Suitelet.onRequestContext
) => {
    const response = context.response;
    const request = context.request;

    const form = ui.createForm({ title: " " });
    const bodyAreaField = form.addField({
        id: "custpage_bodyareafield",
        type: ui.FieldType.INLINEHTML,
        label: "Body Area Field"
    });

    log.debug({title: 'Testing', details: response.write(getClient())});
};

export = {
    onRequest
};
