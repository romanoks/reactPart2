import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import ruMessages from './translations/ru.json';
import enMessages from './translations/en.json';
import locales from 'constants/settings';

addLocaleData([...en, ...ru]);

export let formatMessage = obj => obj;

export const FormatMessageInjector = injectIntl((props) => {
  formatMessage = props.intl.formatMessage;
  return false;
});

class IntlProviderWrapper extends Component {
  render() {
    return (
      <IntlProvider {...this.props}>
        <div>
          <FormatMessageInjector />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

export default connect(state => {
  return {
    locale: state.settings.locale,
    messages: state.settings.locale === locales.ru ? ruMessages : enMessages,
  };
})(IntlProviderWrapper);