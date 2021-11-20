# eco₂rd
CO₂ footprint for browser traffic based data consumption

-------

### 🛠 How to run

#### Locally
After cloning the repo, you can simply to a `yarn start`. This will run the pop up with mocked data.

#### Development build
In order to use the extension for testing purposes, you can create an unpacked dev build via `yarn build-dev`.
This will create a folder `build_dev` that can be load as unpacked extension the browser.

-------

### ✨ Representation
The project landingpage can be found here: https://github.com/grenzbotin/eco2rd-web

-------

### 📔 Sources & Information
#### gCO₂eq/kWh  
- Europe, 2016: https://www.eea.europa.eu/data-and-maps/daviz/co2-emission-intensity-5#tab-googlechartid_chart_11_filters=%7B%22rowFilters%22%3A%7B%7D%3B%22columnFilters%22%3A%7B%22pre_config_ugeo%22%3A%5B%22European%20Union%20(current%20composition)%22%5D%7D%7D

- US, 2019: https://www.eia.gov/tools/faqs/faq.php?id=74&t=11

- China, 2015: https://ueaeprints.uea.ac.uk/id/eprint/67331/1/Accepted_manuscript.pdf

- World, 2019: https://www.iea.org/reports/global-energy-co2-status-report-2019/emissions


#### Renewable Energy
gCO₂eq/kWh for renewable energy sources
- https://www.parliament.uk/globalassets/documents/post/postpn_383-carbon-footprint-electricity-generation.pdfs


#### In depth: Page Visits
A page visit is defined with the tab load status "completed".
This currently has some pitfalls and need to be improved