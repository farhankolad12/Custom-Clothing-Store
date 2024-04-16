const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  coupon: {
    id: { type: String },
    name: { type: String },
  },
  products: [
    {
      productId: { type: String },
      selectedVariationIds: [
        {
          id: { type: String },
          title: {
            type: String,
          },
          values: [
            {
              id: { type: String },
              variant: { type: String },
            },
          ],
        },
      ],
      quantity: { type: Number },
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cart", cartSchema);
