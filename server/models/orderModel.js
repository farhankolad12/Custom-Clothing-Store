const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  products: [
    {
      name: {
        type: String,
      },
      shortDescription: {
        type: String,
      },
      fullDescription: {
        type: String,
      },
      price: {
        type: Number,
      },
      isFeatured: {
        type: Boolean,
      },
      category: {
        type: String,
      },
      tags: [
        {
          id: { type: String },
          tag: { type: String },
        },
      ],
      variants: [
        {
          displayName: { type: String },
          title: { type: String },
          values: [
            {
              id: { type: String },
              variant: { type: String },
            },
          ],
        },
      ],
      combinations: [
        {
          id: { type: String },
          price: { type: Number },
          salePrice: { type: Number },
          combinations: [
            {
              id: { type: String },
              variant: { type: String },
              parentName: { type: String },
            },
          ],
        },
      ],
      images: [
        {
          id: {
            type: String,
          },
          link: {
            type: String,
          },
        },
      ],
      selectedCombination: {
        id: { type: String },
        price: { type: Number },
        salePrice: { type: Number },
        combinations: [
          {
            id: { type: String },
            variant: { type: String },
            parentName: { type: String },
          },
        ],
      },
    },
  ],
  coupon: {},
  status: [
    {
      name: {
        type: String,
      },
      message: {
        type: String,
      },
      changedAt: {
        type: Date,
      },
    },
  ],
  shippingPrice: {
    type: Number,
  },
  subtotal: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  deliveredAt: {
    type: Date,
  },
  address: {
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    line1: {
      type: String,
    },
    line2: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  paidAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Orders", orderSchema);
