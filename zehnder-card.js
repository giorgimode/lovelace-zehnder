import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";


class ZehnderCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  render() {
    return html`
    <ha-card>
    <div class="container">
      <div class="bg">
          <div class="flex-container">
              <div class="flex-col-out">
                  <div>${this.hass.states[`sensor.${this.device_name}_outside_air_temperature`].state}°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:speedometer"></ha-icon></ha-icon> ${Math.trunc(this.hass.states[`sensor.${this.device_name}_intake_fan_speed_rpm`].state)} rpm</div>
                  <div>${this.hass.states[`sensor.${this.device_name}_exhaust_air_temperature`].state}°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:speedometer"></ha-icon> ${Math.trunc(this.hass.states[`sensor.${this.device_name}_exhaust_fan_speed_rpm`].state)} rpm</div>
              </div>
              <div class="flex-col-main">
                  <div>${this.hass.states[this.config.entity].attributes.temperature}°C</div>
                  <br><br><br><br><br>
                  <div><ha-icon class="spin" icon="mdi:${({'auto': 'fan', 'off': 'fan-off', low: 'fan-speed-1', medium: 'fan-speed-2', high: 'fan-speed-3'}[this.hass.states[this.config.entity].attributes.fan_mode])}"></ha-icon></div>
                  <div title="Filter age" style="font-size: small; padding: 40px"><ha-icon icon="mdi:clock-time-eight"/>${(this.hass.states[`sensor.${this.device_name}_filter_hours`].state / 720).toFixed(1)}months</div>
              </div>
              <div class="flex-col-in">
                  <div>${this.hass.states[`sensor.${this.device_name}_return_air_temperature`].state}°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon> ${Math.trunc(this.hass.states[`sensor.${this.device_name}_return_air_level`].state)}%</div>
                  <div>${this.hass.states[`sensor.${this.device_name}_supply_air_temperature`].state}°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon> ${Math.trunc(this.hass.states[`sensor.${this.device_name}_supply_air_level`].state)}%</div>
              </div>
          </div>
      </div>
      </div>
      <div class="info-row">
      ${this.getFanTmpl()}
      ${this.getAirFilterTmpl()}
      ${this.getSummerModeTmpl()}
      </div>
    </ha-card>
    `;
  }

  getFanTmpl(){
    if(this.hass.states[`binary_sensor.${this.device_name}_supply_fan_active`].state == 'on'){
      return html`<ha-icon icon="mdi:fan" title="Fan on"></ha-icon>`;
    }else{
      return html`<ha-icon class="inactive" icon="mdi:fan" title="Fan off"></ha-icon>`;
    }
  }

  getAirFilterTmpl(){
    if(this.hass.states[`sensor.${this.device_name}_filter_status`].state == 'Full'){
      return html`<ha-icon class="warning" icon="mdi:air-filter" title="Air Filters Needs To Be Changed"></ha-icon>`;
    }else{
      return html`<ha-icon class="inactive" icon="mdi:air-filter" title="Air Filter Has No Warnings"></ha-icon>`;
    }
  }

  getSummerModeTmpl(){
    if(this.hass.states[`binary_sensor.${this.device_name}_summer_mode`].state == 'off'){
      return html`<ha-icon icon="mdi:snowflake" title="Summer Mode off"></ha-icon>`;
    }else{
      return html`<ha-icon class="inactive" icon="mdi:weather-sunny" title="Summer Mode On"></ha-icon>`;
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define entity");
    }
    this.config = config;
    this.device_name = this.config.entity.replace(/^climate\./, '');
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 7;
  }

  static get styles() {
    return css`
    .container {
      padding: 10px;
    }
    .bg {
      background-image: url(https://raw.githubusercontent.com/giorgimode/lovelace-zehnder/master/zehnder_heat.png);
      height: 200px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position-y: center
    }
    .not-found {
    background-color: yellow;
    font-family: sans-serif;
    font-size: 14px;
    padding: 8px;
    }
    .flex-container {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }
    .flex-col-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px 0px;
      font-size: x-large;
      text-align: center;
      font-weight:bold;
    }
    .flex-col-out {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .flex-col-in {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .fan-state {
      padding-top: 15px;
    }
    .spin {
      animation-name: spin;
      animation-duration: 2000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    .info-row {
      background: rgba(0,0,0,0.2);
      margin-top: 10px;
      padding: 5px;
      border-top: rgba(0,0,0,0.4);
      -webkit-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
      -moz-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
      box-shadow: 0px -2.5px 3px rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: space-around;
    }

    .inactive {
      opacity: 0.7;
    }

    .warning {
      color: color: #d80707db;
    }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
    }
    `;
  }
}
customElements.define("zehnder-card", ZehnderCard);