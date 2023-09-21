// Applicant: Jay Yu
// Problem 1: Filtering Machine Plans

// Takes an array of machine plans and returns an array of machine plans
// containing only machine plans in the input array which contain at least
// one block whose block type is "deltaBot". Machine plans are JSON objects
// whose structure is described in the BNF grammar on Taxon's project page.
//
// Param - plans: an array of JSON object literals representing machine plans
// Return - an array of JSON object literals representing filtered machine plans
export default function filterMachinePlans(plans: string[]): string[] {
  let filteredPlans: string[] = [];

  // Iterates over all JSON objects in plans
  plans.forEach((plan: string): void => {
    // Parses JSON from string to javascript object
    let parsedPlan: object = JSON.parse(plan);

    // Checks if the plan has appropriate Array formatting for blocks
    if ('blocks' in parsedPlan && Array.isArray(parsedPlan.blocks)) {
      // Iterates over all blocks in the plan
      // Stops checking the plan if found one block of "deltaBot" type
      parsedPlan.blocks.some((block: object): boolean => {
        if ('blockType' in block && block.blockType === 'deltaBot') {
          // Retains the plan if it has "deltaBot" block(s)
          filteredPlans.push(plan);
          return true;  // Stops looking at other blocks
        } else {
          return false;  // Continues
        }
      });
    }
  });

  return filteredPlans;
}
