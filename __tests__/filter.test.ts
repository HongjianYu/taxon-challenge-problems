const fs = require('fs');
import filterMachinePlans from "../lib/filter";

describe("filters machine plans", (): void => {
  let plans: string[] = [];
  let filteredExpected: string[] = [];

  async function loadPlans(): Promise<void> {
    fs.readdirSync(__dirname + '/__utils__/machine_plans').forEach((fileName: string): void => {
      import('./__utils__/machine_plans/' + fileName, { assert: { type: "json" } }).then(prototype => {
        const planLiteral: string = JSON.stringify(prototype.default);
        plans.push(planLiteral);
        if (planLiteral.includes('deltaBot')) {
          filteredExpected.push(planLiteral);
        }
      });
    });
  }

  const retrieve = async (): Promise<void> => { return await loadPlans(); }

  it("correct filtering", async (): Promise<void> => {
    retrieve().then((): void => {
      let filteredActual: string[] = filterMachinePlans(plans);
      expect(filteredActual.length).toBe(filteredExpected.length);
      filteredActual.forEach((planActual: string, index: number): void => {
        console.log(JSON.parse(planActual).name + " has been retained");
        expect(planActual).toBe(filteredExpected[index]);
      });
    });
  });
});
