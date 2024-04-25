/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

import '@contentstack/venus-components/build/main.css';
import "../index.css";
import "./CustomField.css";

import { useAppConfig } from '../../common/hooks/useAppConfig';
import { useCustomField } from '../../common/hooks/useCustomField';

import { Field, FieldLabel, TextInput, ValidationMessage } from '@contentstack/venus-components';

const CustomFieldExtension = () => {
  const { customField, setFieldData }: any = useCustomField();

  const [units, setUnits] = useState();
  const [sku, setSku] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [markdownPrice, setMarkdownPrice] = useState('');
  const [invalidSKU, setInvalidSKU] = useState(false);

  const SKU_LEN = 4;

  useEffect(() => {
    if (customField) {
      setSku(customField.sku);
      setOriginalPrice(customField.originalPrice);
      setMarkdownPrice(customField.markdownPrice);
    }
  }, [customField]);

  useEffect(() => {
    fetch('./prices.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setUnits(data);
    })
    .catch((error) => {
        console.log(error);
    });

    if (units && sku && sku.length === SKU_LEN && units[sku]) {
      setFieldData(units[sku]);

      setOriginalPrice(customField.originalPrice);
      setMarkdownPrice(customField.markdownPrice);

      setInvalidSKU(false);
    }
    else if (sku && sku.length === SKU_LEN) {
      setInvalidSKU(false);
    }
    else {
      setInvalidSKU(true);
    }

  }, [sku]);

  return (
    <div className="layout-container">
      <Field
      id="sku"
      name="SKU"
      >
        <FieldLabel htmlFor="sku">
          SKU
        </FieldLabel>
        <TextInput
          name="SKU"
          placeholder="XXXX"
          value={sku}
          error={invalidSKU}
          onChange={(e: any) => { setSku(e.target.value) }}
          maxLength={SKU_LEN}
        />
        { invalidSKU &&
          <ValidationMessage>Invalid SKU</ValidationMessage>
        }
      </Field>
      <Field
      id="originalPrice"
      name="originalPrice"
      >
        <FieldLabel htmlFor="originalPrice">
          Original Price
        </FieldLabel>
        <TextInput
          name="originalPrice"
          placeholder="$X.XX"
          value={originalPrice}
          disabled
        />
      </Field>
      <Field
      id="markdownPrice"
      name="markdownPrice"
      >
        <FieldLabel htmlFor="markdownPrice">
          Markdown Price
        </FieldLabel>
        <TextInput
          name="markdownPrice"
          placeholder="$X.XX"
          value={markdownPrice}
          disabled
        />
      </Field>
    </div>
  );
}
export default CustomFieldExtension;


// import React, { useCallback, useState } from "react";
// import localeTexts from "../../common/locales/en-us/index";
// import parse from "html-react-parser";
// import { useAppConfig } from "../../common/hooks/useAppConfig";
// import "../index.css";
// import "./CustomField.css";
// import Icon from "../../assets/Custom-Field-Logo.svg";
// import ReadOnly from "../../assets/lock.svg";
// import JsonView from "../../assets/JsonView.svg";
// import ConfigModal from "../../components/ConfigModal/ConfigModal";

// const CustomFieldExtension = () => {
//   const appConfig = useAppConfig();

//   const [isRawConfigModalOpen, setRawConfigModalOpen] = useState<boolean>(false);

//   const handleViewRawConfig = useCallback(() => {
//     setRawConfigModalOpen(true);
//   }, []);

//   const handleCloseModal = useCallback(() => {
//     setRawConfigModalOpen(false);
//   }, []);

//   const sampleAppConfig = appConfig?.["sample_app_configuration"] || "";
//   const trimmedSampleAppConfig =
//     sampleAppConfig.length > 17 ? `${sampleAppConfig.substring(0, 17)}...` : sampleAppConfig;

//   return (
//     <div className="layout-container">
//       <div className="ui-location-wrapper">
//         <div className="ui-location">
//           <div className="ui-container">
//             <div className="logo-container">
//               <img src={Icon} alt="Logo" />
//               <p>{localeTexts.CustomField.title}</p>
//             </div>
//             <div className="config-container">
//               <div className="label-container">
//                 <p className="label">Sample App Configuration</p>
//                 <p className="info">(read only)</p>
//               </div>
//               <div className="input-wrapper">
//                 <div className="input-container">
//                   <p className="config-value">{trimmedSampleAppConfig}</p>
//                   <img src={ReadOnly} alt="ReadOnlyLogo" />
//                 </div>

//                 <img src={JsonView} alt="Show-Json-CTA" className="show-json-cta" onClick={handleViewRawConfig} />
//                 {isRawConfigModalOpen && appConfig && <ConfigModal config={appConfig} onClose={handleCloseModal} />}
//               </div>
//             </div>
//             <div className="location-description">
//               <p className="location-description-text">{parse(localeTexts.CustomField.body)}</p>
//               <a target="_blank" rel="noreferrer" href={localeTexts.CustomField.button.url}>
//                 <span className="location-description-link">{localeTexts.CustomField.button.text}</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomFieldExtension;
