// Applicant: Jay Yu
// Problem 2: HTTP Requests and DOM Manipulation

import React, { Component } from 'react';

interface AppState {
  names: string[];
  message: string;
}

class App extends Component<{}, AppState> {

  // Sets up names and message
  constructor(props: any) {
    super(props);
    this.state = { names: ["* NO RESULTS *"], message: "* NO MESSAGES *" };
    this.requestRules().then();  // Calls asynchronous function for updates
  }

  // Updates the HTML element on the page (whose id is #rule-of-thumb-names)
  // with the names of all rules of thumb as obtained via an HTTP request to the server.
  // Handles any asynchronous function calls including errors in the HTTP responses.
  async requestRules(): Promise<void> {
    try {
      // Fetches data from endpoint
      let resp: Response = await fetch("/rules-of-thumb");
      if (!resp.ok) {
        // Puts up message if response is not ok (status beyond the range of 200-299)
        this.setState({ message: (await resp.json()).message });
      } else {
        // Puts up rule names if response is ok (status in the range of 200-299)
        const rules: object[] = (await resp.json()).rulesOfThumb;  // Gets the array of rules
        // Extracts rule names into a new array
        const names: string[] = rules.map((rule: object): string => {
          return 'name' in rule ? String(rule.name) : "* NAME NOT FOUND FOR THE RULE *";
        });
        this.setState({ names: names });
      }
    } catch (e) {
      // Reports server error
      console.log("There was an error contacting the server.");
    }
  }

  // Loads html elements
  render(): any {
    return (
      <div>
        <h2>Rules of Thumb</h2>

        <h3>Requested Names</h3>
        <div id="rule-of-thumb-names">{this.state.names.join('\n')}</div>

        <h3>Server Messages</h3>
        <div id="console-where-error-messages-go">{this.state.message}</div>

        <div id="other-stuff"></div>
      </div>
    );
  }
}

export default App;
