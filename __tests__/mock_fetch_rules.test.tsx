const fs = require('fs');
import { render, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import 'whatwg-fetch';

const errorMessage: string = 'The server cannot handle this request for some mysterious reason.'
const failure: string = '{\n  "message":"' + errorMessage + '"\n}';
const success: string = `\
{
  "rulesOfThumb":[
    {"name":"fabricatesMetal","type":"filtering","description":"machine fabricates metal"},
    {"name":"handleTallFeatures","type":"filtering","description":"machine handles tall features"},
    {"name":"machineIsAdditive","type":"filtering","description":"machine is additive"},
    {"name":"materialOnlyIntersectsVoids","type":"action","description":"material only intersects voids"},
    {"name":"materialMatchMachine","type":"action","description":"material matches machine"},
    {"name":"nonemptyBlocks","type":"filtering","description":"non-empty blocks"},
    {"name":"stayInWe","type":"action","description":"tool stays in w.e."},
    {"name":"toolMatchesRegion","type":"action","description":"tool matches region"},
    {"name":"ventilateLiquidBeforeNextLayer","type":"action","description":"dry liquid before next layer"},
    {"name":"weLargerThan","isDependent":true,"type":"filtering","description":"w.e. larger than"}
  ]
}\
`;
const names: string = `\
fabricatesMetal
handleTallFeatures
machineIsAdditive
materialOnlyIntersectsVoids
materialMatchMachine
nonemptyBlocks
stayInWe
toolMatchesRegion
ventilateLiquidBeforeNextLayer
weLargerThan\
`;

describe.only("mocks fetch to test display of rule names and error messages", (): void => {

  it("status 200: rules", async (): Promise<void> => {
    global.fetch = jest.fn(() => Promise.resolve(new Response(success, { status: 200 }))) as jest.Mock;
    const { container } = render(<Home />);
    await waitFor(() =>
      // @ts-ignore
      expect(container.querySelector("#rule-of-thumb-names").textContent).toBe(names)
    );
    // @ts-ignore
    expect(container.querySelector("#console-where-error-messages-go").textContent).toBe("* NO MESSAGES *");
    // @ts-ignore
    console.log("* RULES *\n" + container.querySelector("#rule-of-thumb-names").textContent);
  });

  it("status 500: message log", async (): Promise<void> => {
    global.fetch = jest.fn(() => Promise.resolve(new Response(failure, { status: 500 }))) as jest.Mock;
    const { container } = render(<Home />);
    await waitFor(() =>
      // @ts-ignore
      expect(container.querySelector("#console-where-error-messages-go").textContent).toBe(errorMessage)
    );
    // @ts-ignore
    expect(container.querySelector("#rule-of-thumb-names").textContent).toBe("* NO RESULTS *");
    // @ts-ignore
    console.log("* MESSAGE *\n" + container.querySelector("#console-where-error-messages-go").textContent);
  });
});

// Not an actual test; was used to generate success.json and names.txt
// Would not be triggered by `jest`
describe("load rules", (): void => {
  let rules: string[] = [];
  let nameList: string[] = [];

  async function loadRules(): Promise<void> {
    fs.readdirSync(__dirname + '/__utils__/rules_of_thumb').forEach((fileName: string): void => {
      import('./__utils__/rules_of_thumb/' + fileName, { assert: { type: "json" } }).then(prototype => {
        const rule = prototype.default;
        rules.push(JSON.stringify(rule));
        if ('name' in rule) {
          nameList.push(rule.name);
          console.log(rule.name + " should be logged");
        } else {
          nameList.push("* NAME NOT FOUND FOR THE RULE *");
          console.log("name not found for the rule");
        }
      });
    });
  }

  const retrieve = async (): Promise<void> => { return await loadRules(); }

  it("retrieve", (): void => {
    retrieve().then((): void => {
      console.log(rules);
      console.log(nameList);
      const success: string = '{\n  "rulesOfThumb":[\n    ' + rules.join(",\n    ") + '\n  ]\n}';
      const names: string = nameList.join("\n");
      fs.writeFile(__dirname + "/__utils__/success.json", success, (): void => {});
      fs.writeFile(__dirname + "/__utils__/names.txt", names, (): void => {});
    });
  });
});
