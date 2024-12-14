# Homeassistant Lovelace Zehnder card

Use https://github.com/wichers/esphome-comfoair to connect your Zehnder device to Homeassistant and then use this lovelace card to visualize your data!

![Image](https://raw.githubusercontent.com/giorgimode/lovelace-zehnder/master/result.png)

# Installation

* Clone this repo into your `www/community` folder inside your configuration. So it will be: `config_folder/www/community/lovelace-zehnder`. 
* Edit your lovelace-ui.yaml or use the flat configuration mode in lovelace and add to the top:
```
resources:
  - type: module
    url: /local/lovelace-zehnder/zehnder-card.js
```

Alternatively, go to HACS and add this repository as a custom repository. 
Then add a custom card in your dashboard:
```yaml
type: custom:zehnder-card
entity: <your_entity_id>
```
Entity id tends to look like this `climate.name_in_esphome`


