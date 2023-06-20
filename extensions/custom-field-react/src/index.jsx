import React, { useState } from "react";
import {
  render,
  TextField,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
} from "@shopify/checkout-ui-extensions-react";

// [START custom-field.ext-index]
render("Checkout::ShippingMethods::RenderAfter", () => <App />);
// [END custom-field.ext-index]

function App() {
  // [START custom-field.instruction-ui]
  const [checked, setChecked] = useState(false);
  // [END custom-field.instruction-ui]

  // [START custom-field.define-metafield]
  const metafieldNamespace = "yourAppNamespace";
  const metafieldKey = "deliveryInstructions";
  // [END custom-field.define-metafield]

  // [START custom-field.use-metafield]
  const deliveryInstructions = useMetafield({
    namespace: metafieldNamespace,
    key: metafieldKey,
  });
  // [END custom-field.use-metafield]

  // [START custom-field.update-metafield]
  const applyMetafieldsChange = useApplyMetafieldsChange();
  // [END custom-field.update-metafield]

  const handleChange = () => {
    setChecked(!checked);
  };

  // [START custom-field.instruction-ui]
  return (
    <BlockStack>
      <Checkbox checked={checked} onChange={handleChange}>
        Provide delivery instructions
      </Checkbox>
      {checked && (
        <TextField
          label="Delivery instructions"
          multiline={3}
          // [START custom-field.store-value]
          onChange={(value) => {
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value,
            });
          }}
          // [END custom-field.store-value]
          value={deliveryInstructions?.value}
        />
      )}
    </BlockStack>
  );
  // [END custom-field.instruction-ui]
}