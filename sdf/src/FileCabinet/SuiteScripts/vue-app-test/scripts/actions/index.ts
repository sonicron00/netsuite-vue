/**
 *@NApiVersion 2.1
 *@NModuleScope Public
 */
import { EntryPoints } from "N/types";

import * as search from "N/search";

/**
 * An example 'action' that can be used within a SPA
 * @returns any[]
 */
export const getEmployees = () => {
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
