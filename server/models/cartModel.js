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
          values: {
            id: { type: String },
            variant: { type: String },
          },
        },
      ],
      selectedCombination: {
        type: Object,
      },
      quantity: { type: Number },
    },
  ],
  subTotalPrice: {
    default: 0,
    type: Number,
  },
  discountedPrice: {
    default: 0,
    type: Number,
  },
  totalPrice: {
    default: 0,
    type: Number,
  },
  shippingPrice: {
    type: Number,
    default: 200,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cart", cartSchema);
