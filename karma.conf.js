var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'webpack.karma.context.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'webpack.karma.context.js': ['webpack']
    },
    webpack: {
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: /app/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ],
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../app'),
            exclude: /(node_modules|test)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};

Goal: Building UI library following standards for component building. 

Contributions: Building for services like overlay using CDK to make modals more dynamic.

 Building architecture for UI library, building classes for making form controls, code quality checks, refactoring web-deer modules, styles

Results: Code is more organised, optimised, faster


OTHER Contributions: created httpClient service which will single entry point for all http calls. Its easy to extent and maintain.

OVERALL: 
Reliable, Sincere and owns every story/responsibility assigned to him.

Thinks out of the box.


***********************
  
  UI LiB:

1.
Goal: Deliver V2 Components
Contribution: Created around 8 Components - Pie Chart with new library, Spike charts, Badges, Timeline, etc

Result: Reusable components for WebDeer App

2.
Goal: PnB V2 Grid Development
Contribution: Different Renderers to generate view Minitrend, cell, hamburger, etc

Result: PnB V2 GRID is way faster compared to old version

3.
Goal: To generate Trade Details Grid  for Trades tab

Contribution: Build the grid instance with all the required functionalities like server side pagination, bulk interaction, highlighighting, desktop resizing, etc

Result: Component is ready for web app consumption.

Web Deer:
4.
Goal: Complete PnB V2 Dashboard development

Contribution: Worked on integrating various renderers like minitrend and cells for PBV2 grid, create query functionality, delegate view, tooltips and rags in summary view and details popup functionality.
Result: Completed PnB V2 in time

5.
Goal: Migrate the DEER to Angular 12 and Aggrid v25

Contribution: Worked on making the 8 UI Library component compatible with new version and ensures it works on Upgraded Angular version if Web App.
Upgrade Basic Grid V2 for Details Popup instances on both library and web app.
Result: Tech Debt of angular and aggrid upgrade is completed on time.

6.
Goal: Build the Trade Details Section of Trades Tab and cover other functionalities in Trades Tab
Contribution: Worked on the Trade Details section with different functionalities of displaying the trade details report with highlighting, autosizing desktop version etc.
Built the other amends popup and functionalities around it.
Lead the design process for Filter Service for filtering of dashboard.

Delgate view for trades tab and all outstanding filter journey for Trades Tab.

Built the single and bulk attestation user journey with complex validations for generating the attestation journey from trade details section.

COO version of trade details section with dark theme.

Result: Great effort to help to timely delivery of TLC stories


UI Automation:
7.
Contribution: Covered around 40-50% scenarios, Minitrend, Details Popup, Create Query from PBV2 grid, Delegate view, legend and tooltip of summary.

Result: Increase coverage of PnB dashboard

         ******

Overall Summary Ujwal is very hard working, makes effort to understand stories best from business perspective, owns and delivers stories

Very Sincere and Hardworking. 

Always ready to go out of the way to support team
