![image](https://raw.githubusercontent.com/grenzbotin/eco2rd/b254ac6c6f105b9d115df6bd105c07314353b012/src/assets/logo_word_mark.svg?raw=true)

## eco₂rd
##### CO₂eq footprint for browser traffic based data consumption

----
----

### 🛠 How to run

#### Locally
After cloning the repo, you can simply to a `yarn start`. This will run the pop up with mocked data.

#### Development build
In order to use the extension for testing purposes, you can create an unpacked dev build via `yarn build-dev`.
This will create a folder `build_dev` that can be load as unpacked extension into the browser extension manager.

Example Chrome:
1. Open `chrome://extensions/`
2. Enable developer mode
3. Click on "load unpacked" 

-------

### ✨ Representation
The project landingpage can be found here: https://github.com/grenzbotin/eco2rd-web

-------

### 📔 Sources & Information
#### Region based GHG/kWh

##### Countries
| Flag  | Country  | Year | Source |
| ------| ---------| ---- | ------ |
| 🇦🇷 | Argentina |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Argentina.pdf)|
| 🇦🇺 | Australia |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Australia.pdf)|
| 🇧🇷 | Brazil |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Brazil.pdf)|
| 🇨🇦 | Canada |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Canada.pdf)|
| 🇨🇳 | China |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_China.pdf)|
| 🇬🇧 | UK |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_UK.pdf)|
| 🇮🇳 | India |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_India.pdf)|
| 🇮🇩 | Indonesia |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Indonesia.pdf)|
| 🇯🇵 | Japan |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Japan.pdf)|
| 🇲🇽 | Mexico |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Mexico.pdf)|
| 🇷🇺 | Russia |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Russia.pdf)|
| 🇸🇦 | Saudi Arabia |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_SaudiArabia.pdf)|
| 🇿🇦 | South Africa |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_South_Africa.pdf)|
| 🇰🇷 | South Korea |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_South_Korea.pdf)|
| 🇹🇷 | Turkey |  2018 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_Turkey.pdf)|


##### Regions
| Flag  | Region  | Year | Source |
| ------| ---------| ---- | ------ |
| 🇪🇺 | Europe |  2020 | [Link](https://www.eea.europa.eu/data-and-maps/daviz/co2-emission-intensity-9#tab-googlechartid_googlechartid_googlechartid_chart_1111)|
| 🇺🇸 | USA |  2020 | [Link](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_USA.pdf)|
| 🌎 | World |  2018 | [Link](https://www.iea.org/reports/global-energy-co2-status-report-2019/emissions)|


#### Renewable Energy
gCO₂eq/kWh for renewable energy sources
- https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php


#### In depth: Page Visits
A page visit is defined with the tab load status "completed".
This currently has some pitfalls and need to be improved