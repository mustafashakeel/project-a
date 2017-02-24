import React from 'react';
import { translate } from 'react-i18next';

import Toolbar from 'react-md/lib/Toolbars';
import './HeaderWidget.scss';


class HeaderWidget extends React.Component {

  render() {
    const { t } = this.props;
    return (
      <Toolbar
        colored
        className="headerWidget"        
        title={t('application.header_title')}            
      >
      </Toolbar>
    );
  }
}

export default translate()(HeaderWidget);
