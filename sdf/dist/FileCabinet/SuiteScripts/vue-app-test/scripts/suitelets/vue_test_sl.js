/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@NModuleScope Public
 */
define(["require", "exports", "N/ui/serverWidget", "../../helpers/index", "N/log"], function (require, exports, ui, index_1, log) {
    const onRequest = (context) => {
        const response = context.response;
        const request = context.request;
        const form = ui.createForm({ title: " " });
        const bodyAreaField = form.addField({
            id: "custpage_bodyareafield",
            type: ui.FieldType.INLINEHTML,
            label: "Body Area Field"
        });
        log.debug({ title: 'Testing', details: response.write(index_1.getClient()) });
    };
    return {
        onRequest
    };
});
