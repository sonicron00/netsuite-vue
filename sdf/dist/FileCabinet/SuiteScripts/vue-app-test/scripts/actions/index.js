define(["require", "exports", "N/search"], function (require, exports, search) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmployees = void 0;
    /**
     * An example 'action' that can be used within a SPA
     * @returns any[]
     */
    exports.getEmployees = () => {
        const results = [];
        search
            .create({
            type: search.Type.EMPLOYEE,
            filters: [
                search.createFilter({
                    name: "isinactive",
                    operator: search.Operator.IS,
                    values: true,
                }),
            ],
            columns: [
                search.createColumn({
                    name: "internalid",
                    label: "Employee Internal ID",
                }),
            ],
        })
            .run()
            .each((result) => {
            const internalID = result.getValue({
                name: "internalid",
            });
            results.push(internalID);
            return true;
        });
        return results;
    };
});
