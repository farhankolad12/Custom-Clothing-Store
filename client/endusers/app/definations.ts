export type ProductType = {
  _id: string;
  name: string;
  shortDescription: string;
  variants: [
    {
      _id: string;
      name: string;
      options: [
        {
          id: string;
          name: string;
          quantity: number;
          price: number;
          discountedPrice: number;
        }
      ];
    }
  ];
  discountedPrice: number;
  price: number;
  images: [
    {
      id: string;
      link: string;
    }
  ];
  fullDescription: string;
  tags: string[];
  isFeatured: boolean;
  category: string;
  subcategory: string;
  gender: string;
  inWishlist: boolean;
  createdAt: number;
};

export type CurrentUser = {
  _id: string;
  fname: string;
  lname: string;
  phone: string;
  birthDate: number;
  gender: string;
  email: string;
  created: number;
};

export type AuthValue = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Function;
  data:
    | {
        featuredProducts: ProductType[];
        newCollections: ProductType[];
        categories: any;
      }
    | undefined;
  setData: Function;
  cartItems: any;
  setCartItems: Function;
};
