import reporter from "cucumber-html-reporter";

const options = {
  theme: "bootstrap" as const,
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chromium",
    "Platform": "Windows 11",
    "Parallel": "Scenarios",
    "Executed": "Local"
  }
};

reporter.generate(options);