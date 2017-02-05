class widgetSettings {
  settings = {
    position: 'right'
  }

  setValue = (settings) => {
    this.settings = Object.assign(this.settings, settings);
  }

  getValue = () => {
    return this.settings
  }
}

export default new widgetSettings;