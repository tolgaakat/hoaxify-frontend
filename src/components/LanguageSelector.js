
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {

    const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language); //axios  accept-language header prm. set eder
    }


    return (
        <div className='container'>
            <img src="https://cdn.countryflags.com/thumbs/turkey/flag-square-250.png" width="24" height="24" alt="Turkish Flag" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }} className="img-thumbnail"></img>
            <img src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png" width="24" height="24" alt="USA Flag" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }} className="img-thumbnail"></img>
        </div>
    );
};

export default withTranslation()(LanguageSelector);